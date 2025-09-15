/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */
package com.scandit.capacitor.datacapture.barcode

import android.Manifest
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginHandle
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import com.scandit.capacitor.datacapture.barcode.count.BarcodeCountViewHandler
import com.scandit.capacitor.datacapture.barcode.factories.BarcodeCaptureActionFactory
import com.scandit.capacitor.datacapture.barcode.find.BarcodeFindViewHandler
import com.scandit.capacitor.datacapture.barcode.pick.BarcodePickViewHandler
import com.scandit.capacitor.datacapture.barcode.utils.SerializableAdvancedOverlayViewData
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo
import com.scandit.capacitor.datacapture.core.data.SerializableCallbackAction
import com.scandit.capacitor.datacapture.core.data.SerializableFinishModeCallbackData
import com.scandit.capacitor.datacapture.core.errors.JsonParseError
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult
import com.scandit.datacapture.core.ui.style.BrushDeserializer
import com.scandit.datacapture.frameworks.barcode.BarcodeModule
import com.scandit.datacapture.frameworks.barcode.batch.BarcodeBatchModule
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.capture.listeners.FrameworksBarcodeCaptureListener
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule
import com.scandit.datacapture.frameworks.barcode.find.BarcodeFindModule
import com.scandit.datacapture.frameworks.barcode.generator.BarcodeGeneratorModule
import com.scandit.datacapture.frameworks.barcode.pick.BarcodePickModule
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionAimedBrushProvider
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionListener
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionTrackedBrushProvider
import com.scandit.datacapture.frameworks.barcode.spark.SparkScanModule
import com.scandit.datacapture.frameworks.core.events.Emitter
import com.scandit.datacapture.frameworks.core.utils.DefaultFrameworksLog
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.DefaultWorkerThread
import com.scandit.datacapture.frameworks.core.utils.FrameworksLog
import com.scandit.datacapture.frameworks.core.utils.MainThread
import com.scandit.datacapture.frameworks.core.utils.WorkerThread
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(
    name = "ScanditBarcodeNative",
    permissions = [
        Permission(strings = [Manifest.permission.CAMERA], alias = "camera")
    ]
)
class ScanditBarcodeNative :
    Plugin(),
    Emitter {

    companion object {
        private const val FIELD_RESULT = "result"
        private const val CORE_PLUGIN_NAME = "ScanditCaptureCoreNative"
        private const val WRONG_INPUT = "Wrong input parameter"
        private const val WEB_VIEW_NOT_ATTACHED = "WebView not attached yet"
    }

    private var corePlugin: PluginHandle? = null
    private val barcodeModule = BarcodeModule()
    private val barcodeCaptureModule = BarcodeCaptureModule.create(this)
    private val barcodeBatchModule = BarcodeBatchModule.create(this)
    private val barcodeSelectionModule = BarcodeSelectionModule(
        FrameworksBarcodeSelectionListener(this),
        FrameworksBarcodeSelectionAimedBrushProvider(this),
        FrameworksBarcodeSelectionTrackedBrushProvider(this)
    )
    private val barcodeCountModule = BarcodeCountModule.create(this)

    private val barcodeFindModule = BarcodeFindModule.create(this)
    private val barcodePickModule = BarcodePickModule(
        this
    )
    private val sparkScanModule = SparkScanModule.create(this)

    private val barcodeGeneratorModule = BarcodeGeneratorModule()

    private val barcodeCountViewHandler: BarcodeCountViewHandler = BarcodeCountViewHandler()
    private val barcodeFindViewHandler: BarcodeFindViewHandler = BarcodeFindViewHandler()
    private val barcodePickViewHandler: BarcodePickViewHandler = BarcodePickViewHandler()
    private val logger: FrameworksLog = DefaultFrameworksLog.getInstance()
    private val workerThread: WorkerThread = DefaultWorkerThread.getInstance()
    private val mainThread: MainThread = DefaultMainThread.getInstance()

    override fun load() {
        super.load()

        // We need to register the plugin with its Core dependency for serializers to load.
        corePlugin = bridge.getPlugin(CORE_PLUGIN_NAME)
        if (corePlugin != null) {
            (corePlugin!!.instance as ScanditCaptureCoreNative).registerPluginInstance(
                pluginHandle.instance
            )
        } else {
            logger.error("Core not found")
        }
        mainThread.runOnMainThread {
            barcodeCountViewHandler.attachWebView(bridge.webView, bridge.activity)
            barcodeFindViewHandler.attachWebView(bridge.webView)
            barcodePickViewHandler.attachWebView(bridge.webView, bridge.activity)
        }
        barcodeModule.onCreate(context)
        barcodeCaptureModule.onCreate(context)
        barcodeBatchModule.onCreate(context)
        barcodeSelectionModule.onCreate(context)
        barcodeCountModule.onCreate(context)
        barcodeFindModule.onCreate(context)
        barcodePickModule.onCreate(context)
        sparkScanModule.onCreate(context)
        barcodeGeneratorModule.onCreate(context)
    }

    override fun handleOnDestroy() {
        barcodeModule.onDestroy()
        barcodeCaptureModule.onDestroy()
        barcodeBatchModule.onDestroy()
        barcodeSelectionModule.onDestroy()
        barcodeCountModule.onDestroy()
        barcodeFindModule.onDestroy()
        barcodePickModule.onDestroy()
        sparkScanModule.onDestroy()
        barcodeGeneratorModule.onDestroy()
    }

    private fun checkCameraPermission(): Boolean =
        getPermissionState("camera") == PermissionState.GRANTED

    private fun checkOrRequestCameraPermissions(call: PluginCall) {
        if (!checkCameraPermission()) {
            requestPermissionForAlias("camera", call, "onCameraPermissionResult")
        } else {
            onCameraPermissionResult(call)
        }
    }

    @Suppress("unused")
    @PermissionCallback
    private fun onCameraPermissionResult(call: PluginCall) {
        if (checkCameraPermission()) {
            call.resolve()
            return
        }

        call.reject("Camera permissions not granted.")
    }

    @PluginMethod
    fun finishCallback(call: PluginCall) {
        try {
            val data = call.data
            // We need the "result" field to exist ( null is also allowed )

            if (!data.has(FIELD_RESULT)) {
                throw JSONException("Missing $FIELD_RESULT field in response json")
            }

            val result: JSONObject = data.optJSONObject(FIELD_RESULT) ?: JSONObject()
            when {
                isFinishBarcodeSelectionDidUpdateSession(result) ->
                    onFinishBarcodeSelectionDidUpdateSession(
                        SerializableFinishModeCallbackData.fromJson(result)
                    )

                isFinishBarcodeSelectionDidSelect(result) ->
                    onFinishBarcodeSelectionDidSelect(
                        SerializableFinishModeCallbackData.fromJson(result)
                    )

                else -> throw JSONException(
                    "Cannot recognise finish callback action with result $result"
                )
            }
        } catch (e: JSONException) {
            onJsonParseError(e, call)
        } catch (e: RuntimeException) {
            onJsonParseError(e, call)
        }
    }

    @PluginMethod
    fun getDefaults(call: PluginCall) {
        val defaults = JSObject.fromJSONObject(
            JSONObject(

                barcodeModule.getDefaults() +
                        mapOf("BarcodeCapture" to barcodeCaptureModule.getDefaults()) +
                        mapOf("BarcodeBatch" to barcodeBatchModule.getDefaults()) +
                        mapOf("BarcodeSelection" to barcodeSelectionModule.getDefaults()) +
                        mapOf("BarcodeCount" to barcodeCountModule.getDefaults()) +
                        mapOf("BarcodeFind" to barcodeFindModule.getDefaults()) +
                        mapOf("BarcodePick" to barcodePickModule.getDefaults()) +
                        mapOf("SparkScan" to sparkScanModule.getDefaults())

            )
        )

        call.resolve(defaults)
    }

    //region Barcode Capture Methods

    @PluginMethod
    fun registerBarcodeCaptureListenerForEvents(call: PluginCall) {
        barcodeCaptureModule.addListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCaptureListenerForEvents(call: PluginCall) {
        barcodeCaptureModule.removeListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeCaptureModeEnabledState(call: PluginCall) {
        barcodeCaptureModule.setModeEnabled(getModeId(call), call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidUpdateSession(call: PluginCall) {
        barcodeCaptureModule.finishDidUpdateSession(getModeId(call), call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidScan(call: PluginCall) {
        barcodeCaptureModule.finishDidScan(getModeId(call), call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeCaptureSession(call: PluginCall) {
        barcodeCaptureModule.resetSession(call.data.getLong("frameSequenceId"))
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCaptureOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.updateOverlay(
            getViewId(call),
            overlayJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun updateBarcodeCaptureMode(call: PluginCall) {
        val modeJson = call.data.getString("modeJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.updateModeFromJson(modeJson, CapacitorResult(call))
    }

    @PluginMethod
    fun applyBarcodeCaptureModeSettings(call: PluginCall) {
        val modeId = getModeId(call)
        val modeSettingsJson = call.data.getString("modeSettingsJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.applyModeSettings(modeId, modeSettingsJson, CapacitorResult(call))
    }

    //endregion

    @PluginMethod
    fun registerBarcodeBatchListenerForEvents(call: PluginCall) {
        barcodeBatchModule.addBarcodeBatchListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeBatchListenerForEvents(call: PluginCall) {
        barcodeBatchModule.removeBarcodeBatchListener(getModeId(call))
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeBatchDidUpdateSessionCallback(call: PluginCall) {
        barcodeBatchModule.finishDidUpdateSession(
            getModeId(call),
            call.data.getBoolean("enabled")
        )
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeBatchModeEnabledState(call: PluginCall) {
        barcodeBatchModule.setModeEnabled(getModeId(call), call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun registerListenerForBasicOverlayEvents(call: PluginCall) {
        barcodeBatchModule.addBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForBasicOverlayEvents(call: PluginCall) {
        barcodeBatchModule.removeBasicOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeSelectionListenerForEvents(call: PluginCall) {
        barcodeSelectionModule.addListener()
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeSelectionListenerForEvents(call: PluginCall) {
        barcodeSelectionModule.removeListener()
        call.resolve()
    }

    @PluginMethod
    fun setTextForAimToSelectAutoHint(call: PluginCall) {
        barcodeSelectionModule.setTextForAimToSelectAutoHint(
            call.data.getString("text").orEmpty(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun removeAimedBarcodeBrushProvider(call: PluginCall) {
        barcodeSelectionModule.removeAimedBarcodeBrushProvider()
        call.resolve()
    }

    @PluginMethod
    fun setAimedBarcodeBrushProvider(call: PluginCall) {
        barcodeSelectionModule.setAimedBarcodeBrushProvider(CapacitorResult(call))
    }

    @PluginMethod
    fun finishBrushForAimedBarcodeCallback(call: PluginCall) {
        val brushJson = call.data.getString("brush")
        val selectionIdentifier = call.data.getString("selectionIdentifier")
        if (selectionIdentifier == null) {
            call.reject("selectionIdentifier is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.finishBrushForAimedBarcode(brushJson, selectionIdentifier)
        call.resolve()
    }

    @PluginMethod
    fun finishBrushForTrackedBarcodeCallback(call: PluginCall) {
        val brushJson = call.data.getString("brush")
        val selectionIdentifier = call.data.getString("selectionIdentifier")
        if (selectionIdentifier == null) {
            call.reject("selectionIdentifier is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.finishBrushForTrackedBarcode(brushJson, selectionIdentifier)
        call.resolve()
    }

    @PluginMethod
    fun removeTrackedBarcodeBrushProvider(call: PluginCall) {
        barcodeSelectionModule.removeTrackedBarcodeBrushProvider()
        call.resolve()
    }

    @PluginMethod
    fun setTrackedBarcodeBrushProvider(call: PluginCall) {
        barcodeSelectionModule.setTrackedBarcodeBrushProvider(CapacitorResult(call))
    }

    @PluginMethod
    fun finishBrushForTrackedBarcode(call: PluginCall) {
        val brushJson = call.data.getString("brush")
        val selectionIdentifier = call.data.getString("selectionIdentifier")
        if (selectionIdentifier == null) {
            call.reject("selectionIdentifier is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.finishBrushForTrackedBarcode(brushJson, selectionIdentifier)
        call.resolve()
    }

    @PluginMethod
    fun selectAimedBarcode(call: PluginCall) {
        barcodeSelectionModule.selectAimedBarcode()
        call.resolve()
    }

    @PluginMethod
    fun unselectBarcodes(call: PluginCall) {
        val barcodesStr = call.data.getString("barcodesStr")
        if (barcodesStr == null) {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.unselectBarcodes(barcodesStr, CapacitorResult(call))
    }

    @PluginMethod
    fun setSelectBarcodeEnabled(call: PluginCall) {
        val barcodesStr = call.data.getString("barcodesStr")
        if (barcodesStr == null) {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        if (!call.data.has("enabled")) {
            call.reject("enabled is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.setSelectBarcodeEnabled(
            barcodesStr,
            call.data.getBoolean("enabled"),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun increaseCountForBarcodes(call: PluginCall) {
        val barcodesStr = call.data.getString("barcodesStr")
        if (barcodesStr == null) {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.increaseCountForBarcodes(barcodesStr, CapacitorResult(call))
    }

    @PluginMethod
    fun clearTrackedBarcodeBrushes(call: PluginCall) {
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun setBrushForTrackedBarcode(call: PluginCall) {
        try {
            val brushJson = call.data.getString("brushJson")
            val trackedBarcodeId = call.data.getInteger("trackedBarcodeIdentifier")
            val sessionFrameSequenceId = call.data.optLong("sessionFrameSequenceID")

            if (brushJson == null || trackedBarcodeId == null) {
                call.reject("Invalid brushJson or trackedBarcodeIdentifier received in setBrushForTrackedBarcode.")
                return
            }
            barcodeBatchModule.setBasicOverlayBrushForTrackedBarcode(
                getDataCaptureViewId(call),
                brushJson,
                trackedBarcodeId,
                sessionFrameSequenceId
            )
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun registerListenerForAdvancedOverlayEvents(call: PluginCall) {
        barcodeBatchModule.addAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterListenerForAdvancedOverlayEvents(call: PluginCall) {
        barcodeBatchModule.removeAdvancedOverlayListener(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun clearTrackedBarcodeViews(call: PluginCall) {
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews(getDataCaptureViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeBatchSession(call: PluginCall) {
        barcodeBatchModule.resetSession(null)
        call.resolve()
    }

    @PluginMethod
    fun setViewForTrackedBarcode(call: PluginCall) {
        try {
            workerThread.runOnBackgroundThread {
                val serializationData = SerializableAdvancedOverlayViewData(call.data)

                val image = getBitmapFromBase64EncodedViewData(serializationData.view?.data)

                mainThread.runOnMainThread {
                    val view = barcodeBatchModule.getTrackedBarcodeViewFromBitmap(
                        serializationData.trackedBarcodeId,
                        image
                    ) ?: return@runOnMainThread

                    view.layoutParams = ViewGroup.MarginLayoutParams(
                        serializationData.view?.options?.width ?: WRAP_CONTENT,
                        serializationData.view?.options?.height ?: WRAP_CONTENT
                    )

                    barcodeBatchModule.setViewForTrackedBarcode(
                        serializationData.dataCaptureViewId,
                        view,
                        serializationData.trackedBarcodeId,
                        serializationData.sessionFrameSequenceId
                    )
                }
            }
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }

        call.resolve()
    }

    @PluginMethod
    fun updateSizeOfTrackedBarcodeView(@Suppress("UNUSED_PARAMETER") call: PluginCall) {
        // https://scandit.atlassian.net/browse/SDC-26621
    }

    @PluginMethod
    fun setOffsetForTrackedBarcode(call: PluginCall) {
        try {
            val offsetJson = call.data.getString("offsetJson")
            val trackedBarcodeId = call.data.getInteger("trackedBarcodeIdentifier")
            val sessionFrameSequenceId = call.data.optLong("sessionFrameSequenceID")

            if (offsetJson == null || trackedBarcodeId == null) {
                call.reject("Invalid offsetJson or trackedBarcodeIdentifier received in setOffsetForTrackedBarcode.")
                return
            }

            barcodeBatchModule.setOffsetForTrackedBarcode(
                offsetJson,
                trackedBarcodeId,
                sessionFrameSequenceId,
                getDataCaptureViewId(call)

            )
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun setAnchorForTrackedBarcode(call: PluginCall) {
        try {
            val anchorJson = call.data.getString("anchor")
            val trackedBarcodeId = call.data.getInteger("trackedBarcodeIdentifier")
            val sessionFrameSequenceId = call.data.optLong("sessionFrameSequenceID")

            if (anchorJson == null || trackedBarcodeId == null) {
                call.reject("Invalid anchorJson or trackedBarcodeIdentifier received in setAnchorForTrackedBarcode.")
                return
            }

            barcodeBatchModule.setAnchorForTrackedBarcode(
                anchorJson,
                trackedBarcodeId,
                sessionFrameSequenceId,
                getDataCaptureViewId(call)
            )
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun getCountForBarcodeInBarcodeSelectionSession(call: PluginCall) {
        barcodeSelectionModule.submitBarcodeCountForIdentifier(
            call.data.getString("selectionIdentifier").orEmpty(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun resetBarcodeSelectionSession(call: PluginCall) {
        barcodeSelectionModule.resetLatestSession(null)
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeSelection(call: PluginCall) {
        barcodeSelectionModule.resetSelection()
        call.resolve()
    }

    @PluginMethod
    fun unfreezeCameraInBarcodeSelection(call: PluginCall) {
        barcodeSelectionModule.unfreezeCamera()
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidSelect(call: PluginCall) {
        barcodeSelectionModule.finishDidSelect(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidUpdateSession(call: PluginCall) {
        barcodeSelectionModule.finishDidUpdateSession(call.data.getBoolean("enabled"))
        call.resolve()
    }

    private fun onFinishBarcodeSelectionDidUpdateSession(
        finishData: SerializableFinishModeCallbackData?
    ) {
        barcodeSelectionModule.finishDidUpdateSession(finishData?.enabled ?: true)
    }

    private fun onFinishBarcodeSelectionDidSelect(
        finishData: SerializableFinishModeCallbackData?
    ) {
        barcodeSelectionModule.finishDidSelect(finishData?.enabled ?: true)
    }

    private fun onJsonParseError(error: Throwable, call: PluginCall) {
        error.printStackTrace()
        call.reject(JsonParseError(error.message).toString())
    }

    //region BarcodeCount

    @PluginMethod
    fun createBarcodeCountView(call: PluginCall) {
        val viewJson = call.data.getString("viewJson")
        if (viewJson == null) {
            call.reject(WRONG_INPUT, "Missing or invalid viewJson")
            return
        }

        val barcodeCountView = barcodeCountModule.getViewFromJson(viewJson)
        if (barcodeCountView == null) {
            call.reject("Unable to create the BarcodeCountView from the given json=$viewJson")
            return
        }

        mainThread.runOnMainThread {
            barcodeCountViewHandler.attachBarcodeCountView(
                barcodeCountView,
                bridge.activity
            )
            barcodeCountViewHandler.render()
            call.resolve()
        }
    }

    @PluginMethod
    fun removeBarcodeCountView(call: PluginCall) {
        barcodeCountModule.viewDisposed(getViewId(call))
        barcodeCountViewHandler.disposeCurrentView()
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountView(call: PluginCall) {
        val currentView = barcodeCountViewHandler.currentBarcodeCountView
        if (currentView == null) {
            call.reject("The barcode count view has not been initialized yet.")
            return
        }

        val viewJson = call.data.getString("viewJson")
        if (viewJson.isNullOrEmpty()) {
            call.reject("viewJson is required", WRONG_INPUT)
            return
        }

        barcodeCountModule.updateBarcodeCountView(getViewId(call), viewJson)
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountMode(call: PluginCall) {
        val barcodeCountJson = call.data.getString("barcodeCountJson")
        if (barcodeCountJson == null) {
            call.reject(WRONG_INPUT, "barcodeCountJson is required")
            return
        }

        barcodeCountModule.updateBarcodeCount(getViewId(call), barcodeCountJson)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountOnScan(call: PluginCall) {
        barcodeCountModule.finishOnScan(getViewId(call), true)
        call.resolve(null)
    }

    @PluginMethod
    fun registerBarcodeCountListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeCountViewListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountViewListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountViewListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeCountViewUiListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountViewUiListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewUiListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountViewUiListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeCountSession(call: PluginCall) {
        barcodeCountModule.resetBarcodeCountSession(getViewId(call), null)
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeCount(call: PluginCall) {
        barcodeCountModule.resetBarcodeCount(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun startBarcodeCountScanningPhase(call: PluginCall) {
        barcodeCountModule.startScanningPhase(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun endBarcodeCountScanningPhase(call: PluginCall) {
        barcodeCountModule.endScanningPhase(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun clearBarcodeCountViewHighlights(call: PluginCall) {
        barcodeCountModule.clearHighlights(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeCountCaptureList(call: PluginCall) {
        if (!call.data.has("TargetBarcodes") || call.data.getJSONArray("TargetBarcodes")
                .length() == 0
        ) {
            call.reject("No data provided")
            return
        }

        val barcodes = call.data.getJSONArray("TargetBarcodes")
        barcodeCountModule.setBarcodeCountCaptureList(getViewId(call), barcodes)
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeCountViewPositionAndSize(call: PluginCall) {
        try {
            val top = call.getDouble("top") ?: return call.reject("Missing top position")
            val left = call.getDouble("left") ?: return call.reject("Missing left position")
            val width = call.getDouble("width") ?: return call.reject("Missing width")
            val height = call.getDouble("height") ?: return call.reject("Missing height")
            val shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView", false)

            val info = JSONObject().apply {
                put("top", top)
                put("left", left)
                put("width", width)
                put("height", height)
                put("shouldBeUnderWebView", shouldBeUnderWebView)
            }

            barcodeCountViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(info))
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun showBarcodeCountView(call: PluginCall) {
        barcodeCountModule.showView(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun hideBarcodeCountView(call: PluginCall) {
        barcodeCountModule.hideView(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun getBarcodeCountSpatialMap(call: PluginCall) {
        barcodeCountModule.submitSpatialMap(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun getBarcodeCountSpatialMapWithHints(call: PluginCall) {
        val expectedNumberOfRows = call.data.getInteger("expectedNumberOfRows")!!
        val expectedNumberOfColumns = call.data.getInteger("expectedNumberOfColumns")!!
        barcodeCountModule.submitSpatialMap(
            getViewId(call),
            expectedNumberOfRows,
            expectedNumberOfColumns,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setBarcodeCountModeEnabledState(call: PluginCall) {
        val isEnabled = call.data.getBoolean("isEnabled")
        barcodeCountModule.setModeEnabled(getViewId(call), isEnabled)
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountFeedback(call: PluginCall) {
        val feedbackJson = call.data.getString("feedbackJson")
        if (feedbackJson.isNullOrBlank()) {
            call.reject("No feedbackJson was provided for the function.")
            return
        }
        barcodeCountModule.updateFeedback(getViewId(call), feedbackJson, CapacitorResult(call))
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(
            getViewId(call),
            brush,
            trackedBarcodeId
        )
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcodeNotInList(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(
            getViewId(call),
            brush,
            trackedBarcodeId
        )
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountOnBrushForAcceptedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForAcceptedBarcodeEvent(
            getViewId(call),
            brush,
            trackedBarcodeId
        )
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountOnBrushForRejectedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRejectedBarcodeEvent(
            getViewId(call),
            brush,
            trackedBarcodeId
        )
        call.resolve()
    }

    @PluginMethod
    fun barcodeCountViewEnableHardwareTrigger(call: PluginCall) {
        val hardwareTriggerKeyCode = if (call.data.has("hardwareTriggerKeyCode")) {
            call.data.getInteger("hardwareTriggerKeyCode")
        } else null
        barcodeCountModule.enableHardwareTrigger(
            getViewId(call),
            hardwareTriggerKeyCode,
            CapacitorResult(call)
        )
    }

    //endregion

    private fun getBitmapFromBase64EncodedViewData(baseEncodedViewData: String?): Bitmap? {
        baseEncodedViewData ?: return null

        val index = baseEncodedViewData.indexOf(",")
        return try {
            val trimmedString = baseEncodedViewData.removeRange(0, index)
            val bytes = Base64.decode(trimmedString, Base64.DEFAULT)
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
        } catch (ex: Exception) {
            println(ex)
            null
        }
    }

    override fun emit(eventName: String, payload: MutableMap<String, Any?>) {
        val capacitorPayload = JSObject()
        capacitorPayload.put("name", eventName)
        capacitorPayload.put("data", JSONObject(payload).toString())

        notifyListeners(eventName, capacitorPayload)
    }

    override fun hasListenersForEvent(eventName: String): Boolean = this.hasListeners(eventName)

    override fun hasViewSpecificListenersForEvent(viewId: Int, eventName: String): Boolean {
        return this.hasListenersForEvent(eventName)
    }

    private fun isFinishBarcodeSelectionDidUpdateSession(data: JSONObject): Boolean {
        return checkFinishCallbackIdFieldForValue(
            data, BarcodeCaptureActionFactory.ACTION_SELECTION_SESSION_UPDATED
        )
    }

    private fun isFinishBarcodeSelectionDidSelect(data: JSONObject): Boolean {
        return checkFinishCallbackIdFieldForValue(
            data, BarcodeCaptureActionFactory.ACTION_SELECTION_UPDATED
        )
    }

    private fun checkFinishCallbackIdFieldForValue(data: JSONObject, value: String): Boolean {
        return data.has(SerializableCallbackAction.FIELD_FINISH_CALLBACK_ID) &&
                data[SerializableCallbackAction.FIELD_FINISH_CALLBACK_ID] == value
    }


    //region Barcode Find

    @PluginMethod
    fun createFindView(
        call: PluginCall
    ) {
        val viewJson = call.data.getString("json")
            ?: return call.reject("missing parameter for createFindView()")

        val container = barcodeFindViewHandler.prepareContainer(this.context)

        container.post {
            barcodeFindModule.addViewToContainer(container, viewJson, CapacitorResult(call))
            barcodeFindViewHandler.addBarcodeFindViewContainer(getViewId(call), container, bridge.activity)
        }
    }

    @PluginMethod
    fun updateFindView(call: PluginCall) {
        barcodeFindModule.updateBarcodeFindView(
            getViewId(call),
            call.data["barcodeFindViewJson"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun removeFindView(call: PluginCall) {
        val viewId = getViewId(call)
        barcodeFindModule.viewDisposed(viewId)
        barcodeFindViewHandler.disposeContainer(viewId)
        call.resolve()
    }

    @PluginMethod
    fun updateFindMode(call: PluginCall) {
        barcodeFindModule.updateBarcodeFindMode(
            getViewId(call),
            call.data["barcodeFindJson"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun registerBarcodeFindListener(call: PluginCall) {
        barcodeFindModule.addBarcodeFindListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodeFindListener(call: PluginCall) {
        barcodeFindModule.removeBarcodeFindListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun registerBarcodeFindViewListener(call: PluginCall) {
        barcodeFindModule.addBarcodeFindViewListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodeFindViewListener(call: PluginCall) {
        barcodeFindModule.removeBarcodeFindViewListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindSetItemList(call: PluginCall) {
        barcodeFindModule.setItemList(
            getViewId(call),
            call.data["itemsJson"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun barcodeFindViewStopSearching(call: PluginCall) {
        barcodeFindModule.viewStopSearching(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindViewStartSearching(call: PluginCall) {
        barcodeFindModule.viewStartSearching(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindViewPauseSearching(call: PluginCall) {
        barcodeFindModule.viewPauseSearching(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModeStart(call: PluginCall) {
        barcodeFindModule.modeStart(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModePause(call: PluginCall) {
        barcodeFindModule.modePause(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModeStop(call: PluginCall) {
        barcodeFindModule.modeStop(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun showFindView(call: PluginCall) {
        val viewId = getViewId(call)
        barcodeFindViewHandler.setVisible(viewId)
        barcodeFindModule.showView(viewId)
        call.resolve()
    }

    @PluginMethod
    fun hideFindView(call: PluginCall) {
        val viewId = getViewId(call)
        barcodeFindViewHandler.setInvisible(viewId)
        barcodeFindModule.hideView(viewId)
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeFindModeEnabledState(call: PluginCall) {
        barcodeFindModule.setModeEnabled(getViewId(call), call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeTransformer(call: PluginCall) {
        barcodeFindModule.setBarcodeFindTransformer(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun unsetBarcodeTransformer(call: PluginCall) {
        barcodeFindModule.unsetBarcodeFindTransformer(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun submitBarcodeFindTransformerResult(call: PluginCall) {
        val transformedBarcode = call.data.getString("transformedBarcode", null)
        barcodeFindModule.submitBarcodeFindTransformerResult(
            getViewId(call),
            transformedBarcode,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun updateBarcodeFindFeedback(call: PluginCall) {
        val feedbackJson = call.data.getString("feedbackJson")
        if (feedbackJson.isNullOrBlank()) {
            call.reject("No feedbackJson was provided for the function.")
            return
        }
        barcodeFindModule.updateFeedback(getViewId(call), feedbackJson, CapacitorResult(call))
    }

    //endregion

    //region BarcodePick

    @PluginMethod
    fun createPickView(call: PluginCall) {
        val viewJson = call.getString("json")

        viewJson?.let {
            val container = barcodePickViewHandler.prepareContainer(this.context)

            container.post {
                barcodePickModule.addViewToContainer(container, viewJson, CapacitorResult(call))

                barcodePickViewHandler.addBarcodePickViewContainer(container, bridge.activity)
                barcodePickViewHandler.render()

            }
            call.resolve()
        } ?: run {
            call.reject("missing parameter for createPickView()")
        }
    }

    @PluginMethod
    fun removePickView(call: PluginCall) {
        barcodePickModule.releasePickView(getViewId(call), CapacitorResult(call))
        barcodePickViewHandler.disposeCurrentView()
    }

    @PluginMethod
    fun updatePickView(call: PluginCall) {
        val viewJson = call.data.toString()
        barcodePickModule.updateView(getViewId(call), viewJson, CapacitorResult(call))
    }

    @PluginMethod
    fun setPickViewPositionAndSize(call: PluginCall) {
        try {
            val top = call.getDouble("top") ?: return call.reject("Missing top position")
            val left = call.getDouble("left") ?: return call.reject("Missing left position")
            val width = call.getDouble("width") ?: return call.reject("Missing width")
            val height = call.getDouble("height") ?: return call.reject("Missing height")
            val shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView", false)

            val info = JSONObject().apply {
                put("top", top)
                put("left", left)
                put("width", width)
                put("height", height)
                put("shouldBeUnderWebView", shouldBeUnderWebView)
            }
            barcodePickViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(info))
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun addPickActionListener(call: PluginCall) {
        barcodePickModule.addActionListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun removePickActionListener(call: PluginCall) {
        barcodePickModule.removeActionListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun addBarcodePickScanningListener(call: PluginCall) {
        barcodePickModule.addScanningListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun removeBarcodePickScanningListener(call: PluginCall) {
        barcodePickModule.removeScanningListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun addPickViewListener(call: PluginCall) {
        barcodePickModule.addViewListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun removePickViewListener(call: PluginCall) {
        barcodePickModule.removeViewListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun addBarcodePickListener(call: PluginCall) {
        barcodePickModule.addBarcodePickListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun removeBarcodePickListener(call: PluginCall) {
        barcodePickModule.removeBarcodePickListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun registerBarcodePickViewUiListener(call: PluginCall) {
        barcodePickModule.addViewUiListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodePickViewUiListener(call: PluginCall) {
        barcodePickModule.removeViewUiListener(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun finishOnProductIdentifierForItems(call: PluginCall) {
        val itemsJson = call.data.getString("itemsJson") ?: ""
        val response = hashMapOf<String, Any?>(
            "viewId" to getViewId(call),
            "data" to itemsJson
        )
        barcodePickModule.finishOnProductIdentifierForItems(
            response,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun registerOnProductIdentifierForItemsListener(call: PluginCall) {
        // Noop
        call.resolve()
    }

    @PluginMethod
    fun unregisterOnProductIdentifierForItemsListener(call: PluginCall) {
        // Noop
        call.resolve()
    }

    @PluginMethod
    fun pickViewStart(call: PluginCall) {
        barcodePickModule.startPickView(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun pickViewFreeze(call: PluginCall) {
        barcodePickModule.freezePickView(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun pickViewStop(call: PluginCall) {
        barcodePickModule.stopPickView(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun pickViewPause(call: PluginCall) {
        barcodePickModule.pausePickView(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun pickViewResume(call: PluginCall) {
        barcodePickModule.resumePickView(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun finishPickAction(call: PluginCall) {
        val result = call.getBoolean("result")

        if (result == null) {
            call.reject("failed to parse finishPickAction JSON.")
        } else {
            val itemData = call.data.getString("code") ?: ""
            val response = hashMapOf<String, Any?>(
                "viewId" to getViewId(call),
                "itemData" to itemData,
                "result" to result
            )
            barcodePickModule.finishPickAction(response, CapacitorResult(call))
        }
    }

    //endregion

    @PluginMethod
    fun updateBarcodeSelectionBasicOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeSelectionModule.updateBasicOverlay(overlayJson, CapacitorResult(call))
    }

    @PluginMethod
    fun updateBarcodeSelectionMode(call: PluginCall) {
        val modeJson = call.data.getString("modeJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeSelectionModule.updateModeFromJson(modeJson, CapacitorResult(call))
    }

    @PluginMethod
    fun applyBarcodeSelectionModeSettings(call: PluginCall) {
        val modeSettingsJson = call.data.getString("modeSettingsJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeSelectionModule.applyModeSettings(modeSettingsJson, CapacitorResult(call))
    }

    @PluginMethod
    fun updateBarcodeSelectionFeedback(call: PluginCall) {
        val feedbackJson = call.data.getString("feedbackJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeSelectionModule.updateFeedback(feedbackJson, CapacitorResult(call))
    }

    @PluginMethod
    fun updateBarcodeBatchBasicOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeBatchModule.updateBasicOverlay(
            getDataCaptureViewId(call),
            overlayJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun updateBarcodeBatchAdvancedOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeBatchModule.updateAdvancedOverlay(
            getDataCaptureViewId(call),
            overlayJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun updateBarcodeBatchMode(call: PluginCall) {
        val modeJson = call.data.getString("modeJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeBatchModule.updateModeFromJson(modeJson, CapacitorResult(call))
    }

    @PluginMethod
    fun applyBarcodeBatchModeSettings(call: PluginCall) {
        val modeSettingsJson = call.data.getString("modeSettingsJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeBatchModule.applyModeSettings(
            getModeId(call),
            modeSettingsJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun createSparkScanView(call: PluginCall) {
        val container = bridge.webView ?: run {
            call.reject(WEB_VIEW_NOT_ATTACHED)
            return
        }

        val viewJson = call.data.getString("viewJson").orEmpty()
        container.post {
            sparkScanModule.addViewToContainer(
                container, viewJson, CapacitorResult(call)
            )
        }

        checkOrRequestCameraPermissions(call)
    }

    @PluginMethod
    fun disposeSparkScanView(call: PluginCall) {
        mainThread.runOnMainThread {
            sparkScanModule.disposeView(getViewId(call))
        }
        call.resolve()
    }

    @PluginMethod
    fun updateSparkScanView(call: PluginCall) {
        val viewJson = call.data.getString("viewJson").orEmpty()
        sparkScanModule.updateView(
            getViewId(call),
            viewJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun updateSparkScanMode(call: PluginCall) {
        val modeJson = call.data.getString("sparkScanJson").orEmpty()
        sparkScanModule.updateMode(
            getViewId(call),
            modeJson,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun showSparkScanView(call: PluginCall) {
        mainThread.runOnMainThread {
            sparkScanModule.showView(getViewId(call), CapacitorResult(call))
        }
    }

    @PluginMethod
    fun hideSparkScanView(call: PluginCall) {
        mainThread.runOnMainThread {
            sparkScanModule.hideView(getViewId(call), CapacitorResult(call))
        }
    }

    @PluginMethod
    fun registerSparkScanListenerForEvents(call: PluginCall) {
        sparkScanModule.addSparkScanListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterSparkScanListenerForEvents(call: PluginCall) {
        sparkScanModule.removeSparkScanListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun setSparkScanModeEnabledState(call: PluginCall) {
        val enabled = call.data.getBoolean("isEnabled")
        sparkScanModule.setModeEnabled(getViewId(call), enabled)
        call.resolve()
    }

    @PluginMethod
    fun finishSparkScanDidUpdateSession(call: PluginCall) {
        val enabled = call.data.getBoolean("isEnabled")
        sparkScanModule.finishDidUpdateSessionCallback(
            getViewId(call),
            enabled
        )
        call.resolve()
    }

    @PluginMethod
    fun finishSparkScanDidScan(call: PluginCall) {
        sparkScanModule.finishDidScanCallback(getViewId(call), call.data.getBoolean("isEnabled"))
        call.resolve()
    }

    @PluginMethod
    fun registerSparkScanViewListenerEvents(call: PluginCall) {
        sparkScanModule.addSparkScanViewUiListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun unregisterSparkScanViewListenerEvents(call: PluginCall) {
        sparkScanModule.removeSparkScanViewUiListener(getViewId(call))
        call.resolve()
    }

    @PluginMethod
    fun prepareSparkScanViewScanning(call: PluginCall) {
        // Noop
        call.resolve()
    }

    @PluginMethod
    fun startSparkScanViewScanning(call: PluginCall) {
        sparkScanModule.startScanning(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun pauseSparkScanViewScanning(call: PluginCall) {
        sparkScanModule.pauseScanning(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun stopSparkScanViewScanning(call: PluginCall) {
        // Noop
        call.resolve()
    }

    @PluginMethod
    fun registerSparkScanFeedbackDelegateForEvents(call: PluginCall) {
        sparkScanModule.addFeedbackDelegate(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterSparkScanFeedbackDelegateForEvents(call: PluginCall) {
        sparkScanModule.removeFeedbackDelegate(getViewId(call), CapacitorResult(call))
    }

    @PluginMethod
    fun submitSparkScanFeedbackForBarcode(call: PluginCall) {
        sparkScanModule.submitFeedbackForBarcode(
            getViewId(call),
            call.data.getString("feedbackJson", null),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun showSparkScanViewToast(call: PluginCall) {
        val text = call.data.getString("text")
            ?: return call.reject(WRONG_INPUT)
        sparkScanModule.showToast(
            getViewId(call),
            text,
            CapacitorResult(call)
        )
    }

    private fun getViewId(call: PluginCall): Int {
        return call.data.getInt("viewId")
    }

    private fun getModeId(call: PluginCall): Int {
        return call.data.getInt("modeId")
    }

    private fun getDataCaptureViewId(call: PluginCall): Int {
        return call.data.getInt("dataCaptureViewId")
    }

    @PluginMethod
    fun createBarcodeGenerator(call: PluginCall) {
        val barcodeGeneratorJson = call.data.getString("barcodeGeneratorJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeGeneratorModule.createGenerator(barcodeGeneratorJson, CapacitorResult(call))
    }

    @PluginMethod
    fun generateFromBase64EncodedData(call: PluginCall) {
        val generatorId = call.data.getString("generatorId")
            ?: return call.reject(WRONG_INPUT)
        val data = call.data.getString("data")
            ?: return call.reject(WRONG_INPUT)
        val imageWidth = call.data.getInteger("imageWidth")
            ?: return call.reject(WRONG_INPUT)

        barcodeGeneratorModule.generateFromBase64EncodedData(
            generatorId,
            data,
            imageWidth,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun generateFromString(call: PluginCall) {
        val generatorId = call.data.getString("generatorId")
            ?: return call.reject(WRONG_INPUT)
        val text = call.data.getString("text")
            ?: return call.reject(WRONG_INPUT)
        val imageWidth = call.data.getInteger("imageWidth")
            ?: return call.reject(WRONG_INPUT)

        barcodeGeneratorModule.generate(
            generatorId,
            text,
            imageWidth,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun disposeBarcodeGenerator(call: PluginCall) {
        val generatorId = call.data.getString("generatorId")
            ?: return call.reject(WRONG_INPUT)

        barcodeGeneratorModule.disposeGenerator(generatorId, CapacitorResult(call))
    }
}
