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
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchAdvancedOverlayListener
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchBasicOverlayListener
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchListener
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.capture.listeners.FrameworksBarcodeCaptureListener
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountCaptureListListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountStatusProvider
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewUiListener
import com.scandit.datacapture.frameworks.barcode.find.BarcodeFindModule
import com.scandit.datacapture.frameworks.barcode.find.listeners.FrameworksBarcodeFindListener
import com.scandit.datacapture.frameworks.barcode.find.listeners.FrameworksBarcodeFindViewUiListener
import com.scandit.datacapture.frameworks.barcode.find.transformer.FrameworksBarcodeFindTransformer
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
    private val barcodeCaptureModule = BarcodeCaptureModule(FrameworksBarcodeCaptureListener(this))
    private val barcodeBatchModule = BarcodeBatchModule(
        FrameworksBarcodeBatchListener(this),
        FrameworksBarcodeBatchBasicOverlayListener(this),
        FrameworksBarcodeBatchAdvancedOverlayListener(this)
    )
    private val barcodeSelectionModule = BarcodeSelectionModule(
        FrameworksBarcodeSelectionListener(this),
        FrameworksBarcodeSelectionAimedBrushProvider(this),
        FrameworksBarcodeSelectionTrackedBrushProvider(this)
    )
    private val barcodeCountModule = BarcodeCountModule(
        FrameworksBarcodeCountListener(this),
        FrameworksBarcodeCountCaptureListListener(this),
        FrameworksBarcodeCountViewListener(this),
        FrameworksBarcodeCountViewUiListener(this),
        FrameworksBarcodeCountStatusProvider(this)
    )
    private val barcodeFindModule = BarcodeFindModule(
        FrameworksBarcodeFindListener(this),
        FrameworksBarcodeFindViewUiListener(this),
        FrameworksBarcodeFindTransformer(this)
    )
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

    @PluginMethod
    fun registerBarcodeCaptureListenerForEvents(call: PluginCall) {
        barcodeCaptureModule.addListener()
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCaptureListenerForEvents(call: PluginCall) {
        barcodeCaptureModule.removeListener()
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeCaptureModeEnabledState(call: PluginCall) {
        barcodeCaptureModule.setModeEnabled(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun subscribeBarcodeBatchListener(call: PluginCall) {
        barcodeBatchModule.addBarcodeBatchListener()
        call.resolve()
    }

    @PluginMethod
    fun unsubscribeBarcodeBatchListener(call: PluginCall) {
        barcodeBatchModule.removeBarcodeBatchListener()
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeBatchDidUpdateSession(call: PluginCall) {
        barcodeBatchModule.finishDidUpdateSession(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeBatchModeEnabledState(call: PluginCall) {
        barcodeBatchModule.setModeEnabled(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun subscribeBarcodeBatchBasicOverlayListener(call: PluginCall) {
        barcodeBatchModule.addBasicOverlayListener()
        call.resolve()
    }

    @PluginMethod
    fun unsubscribeBarcodeBatchBasicOverlayListener(call: PluginCall) {
        barcodeBatchModule.removeBasicOverlayListener()
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
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes()
        call.resolve()
    }

    @PluginMethod
    fun setBrushForTrackedBarcode(call: PluginCall) {
        try {
            barcodeBatchModule.setBasicOverlayBrushForTrackedBarcode(call.data.toString())
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun subscribeBarcodeBatchAdvancedOverlayListener(call: PluginCall) {
        barcodeBatchModule.addAdvancedOverlayListener()
        call.resolve()
    }

    @PluginMethod
    fun unsubscribeBarcodeBatchAdvancedOverlayListener(call: PluginCall) {
        barcodeBatchModule.removeAdvancedOverlayListener()
        call.resolve()
    }

    @PluginMethod
    fun clearTrackedBarcodeViews(call: PluginCall) {
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews()
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
    fun setOffsetForTrackedBarcode(call: PluginCall) {
        try {
            barcodeBatchModule.setOffsetForTrackedBarcode(
                hashMapOf(
                    "offset" to call.data.getString("offset"),
                    "identifier" to call.data.getInt("trackedBarcodeID")
                )
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
            barcodeBatchModule.setAnchorForTrackedBarcode(
                hashMapOf(
                    "anchor" to call.data.getString("anchor"),
                    "identifier" to call.data.getInt("trackedBarcodeID")
                )
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
    fun resetBarcodeCaptureSession(call: PluginCall) {
        barcodeCaptureModule.resetSession(null)
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeBatchSession(call: PluginCall) {
        barcodeBatchModule.resetSession(null)
        call.resolve()
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

    @PluginMethod
    fun finishBarcodeCaptureDidScan(call: PluginCall) {
        barcodeCaptureModule.finishDidScan(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidUpdateSession(call: PluginCall) {
        barcodeCaptureModule.finishDidUpdateSession(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeSelectionModeEnabledState(call: PluginCall) {
        barcodeSelectionModule.setModeEnabled(call.data.getBoolean("enabled"))
        call.resolve()
    }

    //region BarcodeCount

    //region Barcode Count Listener
    @PluginMethod
    fun finishBarcodeCountOnScan(call: PluginCall) {
        barcodeCountModule.finishOnScan(true)
        call.resolve(null)
    }

    //endregion

    @PluginMethod
    fun createBarcodeCountView(call: PluginCall) {
        val viewJson = call.data.getString("viewJson")!!
        val barcodeCountView = barcodeCountModule.getViewFromJson(viewJson)
        if (barcodeCountView == null) {
            call.reject("Unable to create the BarcodeCountView from the given json=$viewJson")
            return
        }

        barcodeCountViewHandler.attachBarcodeCountView(
            barcodeCountView,
            bridge.activity
        )
        barcodeCountViewHandler.render()
        call.resolve()
    }

    @PluginMethod
    fun removeBarcodeCountView(call: PluginCall) {
        barcodeCountModule.viewDisposed()
        barcodeCountViewHandler.disposeCurrentView()
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountView(call: PluginCall) {
        val view = barcodeCountViewHandler.barcodeCountView
        if (view == null) {
            call.reject("The barcode count view has not been initialized yet.")
            return
        }

        val viewJson = call.data.getString("viewJson")!!
        barcodeCountModule.updateBarcodeCountView(viewJson)
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountMode(call: PluginCall) {
        val barcodeCountJson = call.data.getString("barcodeCountJson")!!
        barcodeCountModule.updateBarcodeCount(barcodeCountJson)
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeCountListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountListener()
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountListener()
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeCountViewListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountViewListener()
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountViewListener()
        call.resolve()
    }

    @PluginMethod
    fun registerBarcodeCountViewUiListener(call: PluginCall) {
        barcodeCountModule.addBarcodeCountViewUiListener()
        call.resolve()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewUiListener(call: PluginCall) {
        barcodeCountModule.removeBarcodeCountViewUiListener()
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeCountSession(call: PluginCall) {
        barcodeCountModule.resetBarcodeCountSession(null)
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeCount(call: PluginCall) {
        barcodeCountModule.resetBarcodeCount()
        call.resolve()
    }

    @PluginMethod
    fun startBarcodeCountScanningPhase(call: PluginCall) {
        barcodeCountModule.startScanningPhase()
        call.resolve()
    }

    @PluginMethod
    fun endBarcodeCountScanningPhase(call: PluginCall) {
        barcodeCountModule.endScanningPhase()
        call.resolve()
    }

    @PluginMethod
    fun clearBarcodeCountViewHighlights(call: PluginCall) {
        barcodeCountModule.clearHighlights()
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
        barcodeCountModule.setBarcodeCountCaptureList(barcodes)
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
        barcodeCountViewHandler.setVisible()
        call.resolve()
    }

    @PluginMethod
    fun hideBarcodeCountView(call: PluginCall) {
        barcodeCountViewHandler.setInvisible()
        call.resolve()
    }

    @PluginMethod
    fun getBarcodeCountSpatialMap(call: PluginCall) {
        barcodeCountModule.submitSpatialMap(CapacitorResult(call))
    }

    @PluginMethod
    fun getBarcodeCountSpatialMapWithHints(call: PluginCall) {
        val expectedNumberOfRows = call.data.getInteger("expectedNumberOfRows")!!
        val expectedNumberOfColumns = call.data.getInteger("expectedNumberOfColumns")!!
        barcodeCountModule.submitSpatialMap(
            expectedNumberOfRows,
            expectedNumberOfColumns,
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun setBarcodeCountModeEnabledState(call: PluginCall) {
        val isEnabled = call.data.getBoolean("isEnabled")
        barcodeCountModule.setModeEnabled(isEnabled)
        call.resolve()
    }

    @PluginMethod
    fun updateBarcodeCountFeedback(call: PluginCall) {
        val feedbackJson = call.data.getString("feedbackJson")
        if (feedbackJson.isNullOrBlank()) {
            call.reject("No feedbackJson was provided for the function.")
            return
        }
        barcodeCountModule.updateFeedback(feedbackJson, CapacitorResult(call))
    }

    //endregion

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcodeNotInList(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountOnBrushForAcceptedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForAcceptedBarcodeEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountOnBrushForRejectedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brushJson", "")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeId")
        barcodeCountModule.finishBrushForRejectedBarcodeEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun barcodeCountViewEnableHardwareTrigger(call: PluginCall) {
        val hardwareTriggerKeyCode = if (call.data.has("hardwareTriggerKeyCode")) {
            call.data.getInteger("hardwareTriggerKeyCode")
        } else null
        barcodeCountModule.enableHardwareTrigger(
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
        val viewJson = call.data

        if (viewJson.has("View")) {
            val container = barcodeFindViewHandler.prepareContainer(this.context)

            val result = barcodeFindModule.getView(container, viewJson.toString())
            if (result.isFailure) {
                call.reject(
                    result.exceptionOrNull()?.message
                        ?: "Unable to create the BarcodeFindView from the given json=$viewJson"
                )
                return
            }

            barcodeFindViewHandler.addBarcodeFindViewContainer(container, bridge.activity)
            barcodeFindViewHandler.render()
            call.resolve()
        } else {
            call.reject("missing parameter for createFindView()")
        }
    }

    @PluginMethod
    fun updateFindView(call: PluginCall) {
        barcodeFindModule.updateBarcodeFindView(
            call.data["View"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun removeFindView(call: PluginCall) {
        barcodeFindModule.viewDisposed()
        barcodeFindViewHandler.disposeCurrentView()
        call.resolve()
    }

    @PluginMethod
    fun updateFindMode(call: PluginCall) {
        barcodeFindModule.updateBarcodeFindMode(
            call.data["BarcodeFind"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun registerBarcodeFindListener(call: PluginCall) {
        barcodeFindModule.addBarcodeFindListener(CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodeFindListener(call: PluginCall) {
        barcodeFindModule.removeBarcodeFindListener(CapacitorResult(call))
    }

    @PluginMethod
    fun registerBarcodeFindViewListener(call: PluginCall) {
        barcodeFindModule.addBarcodeFindViewListener(CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodeFindViewListener(call: PluginCall) {
        barcodeFindModule.removeBarcodeFindViewListener(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindSetItemList(call: PluginCall) {
        barcodeFindModule.setItemList(
            call.data["BarcodeFindItemList"].toString(),
            CapacitorResult(call)
        )
    }

    @PluginMethod
    fun barcodeFindViewStopSearching(call: PluginCall) {
        barcodeFindModule.viewStopSearching(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindViewStartSearching(call: PluginCall) {
        barcodeFindModule.viewStartSearching(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindViewPauseSearching(call: PluginCall) {
        barcodeFindModule.viewPauseSearching(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModeStart(call: PluginCall) {
        barcodeFindModule.modeStart(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModePause(call: PluginCall) {
        barcodeFindModule.modePause(CapacitorResult(call))
    }

    @PluginMethod
    fun barcodeFindModeStop(call: PluginCall) {
        barcodeFindModule.modeStop(CapacitorResult(call))
    }

    @PluginMethod
    fun showFindView(call: PluginCall) {
        barcodeFindViewHandler.setVisible()
        call.resolve()
    }

    @PluginMethod
    fun hideFindView(call: PluginCall) {
        barcodeFindViewHandler.setInvisible()
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeFindModeEnabledState(call: PluginCall) {
        barcodeFindModule.setModeEnabled(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun setBarcodeTransformer(call: PluginCall) {
        barcodeFindModule.setBarcodeFindTransformer(CapacitorResult(call))
    }

    @PluginMethod
    fun submitBarcodeFindTransformerResult(call: PluginCall) {
        val transformedBarcode = call.data.getString("transformedBarcode", null)
        barcodeFindModule.submitBarcodeFindTransformerResult(
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
        barcodeFindModule.updateFeedback(feedbackJson, CapacitorResult(call))
    }

    //endregion

    //region BarcodePick

    @PluginMethod
    fun createPickView(call: PluginCall) {
        val viewJson = call.getString("json")

        viewJson?.let {
            val container = barcodePickViewHandler.prepareContainer(this.context)
            barcodePickModule.addViewToContainer(container, viewJson, CapacitorResult(call))

            barcodePickViewHandler.addBarcodePickViewContainer(container, bridge.activity)
            barcodePickViewHandler.render()

            call.resolve()
        } ?: run {
            call.reject("missing parameter for createPickView()")
        }
    }

    @PluginMethod
    fun removePickView(call: PluginCall) {
        barcodePickModule.viewDisposed()
        barcodePickViewHandler.disposeCurrentView()
        call.resolve()
    }

    @PluginMethod
    fun updatePickView(call: PluginCall) {
        val viewJson = call.data.toString()
        barcodePickModule.updateView(viewJson, CapacitorResult(call))
        call.resolve()
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
        barcodePickModule.addActionListener()
        call.resolve()
    }

    @PluginMethod
    fun removePickActionListener(call: PluginCall) {
        barcodePickModule.removeActionListener()
        call.resolve()
    }

    @PluginMethod
    fun addBarcodePickScanningListener(call: PluginCall) {
        barcodePickModule.addScanningListener(CapacitorResult(call))
    }

    @PluginMethod
    fun removeBarcodePickScanningListener(call: PluginCall) {
        barcodePickModule.removeScanningListener(CapacitorResult(call))
    }

    @PluginMethod
    fun addPickViewListener(call: PluginCall) {
        barcodePickModule.addViewListener(CapacitorResult(call))
    }

    @PluginMethod
    fun removePickViewListener(call: PluginCall) {
        barcodePickModule.removeViewListener(CapacitorResult(call))
    }

    @PluginMethod
    fun registerBarcodePickViewUiListener(call: PluginCall) {
        barcodePickModule.addViewUiListener(CapacitorResult(call))
    }

    @PluginMethod
    fun unregisterBarcodePickViewUiListener(call: PluginCall) {
        barcodePickModule.removeViewUiListener(CapacitorResult(call))
    }

    @PluginMethod
    fun finishOnProductIdentifierForItems(call: PluginCall) {
        val barcodePickProductProviderCallbackItemsJson =
            JSONArray(call.getString("itemsJson")).toString()
        barcodePickModule.finishOnProductIdentifierForItems(
            barcodePickProductProviderCallbackItemsJson
        )
        call.resolve()
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
        barcodePickModule.viewStart()
        call.resolve()
    }

    @PluginMethod
    fun pickViewFreeze(call: PluginCall) {
        barcodePickModule.viewFreeze(CapacitorResult(call))
    }

    @PluginMethod
    fun pickViewStop(call: PluginCall) {
        barcodePickModule.viewStop()
        call.resolve()
    }

    @PluginMethod
    fun finishPickAction(call: PluginCall) {
        val itemDataJson = call.getString("code")
        val result = call.getBoolean("result")

        if (itemDataJson == null || result == null) {
            call.reject("failed to parse finishPickAction JSON.")
        } else {
            barcodePickModule.finishPickAction(itemDataJson, result)
            call.resolve()
        }
    }

    //endregion

    @PluginMethod
    fun updateBarcodeCaptureOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.updateOverlay(overlayJson, CapacitorResult(call))
    }

    @PluginMethod
    fun updateBarcodeCaptureMode(call: PluginCall) {
        val modeJson = call.data.getString("modeJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.updateModeFromJson(modeJson, CapacitorResult(call))
    }

    @PluginMethod
    fun applyBarcodeCaptureModeSettings(call: PluginCall) {
        val modeSettingsJson = call.data.getString("modeSettingsJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeCaptureModule.applyModeSettings(modeSettingsJson, CapacitorResult(call))
    }

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
        barcodeBatchModule.updateBasicOverlay(overlayJson, CapacitorResult(call))
    }

    @PluginMethod
    fun updateBarcodeBatchAdvancedOverlay(call: PluginCall) {
        val overlayJson = call.data.getString("overlayJson")
            ?: return call.reject(WRONG_INPUT)
        barcodeBatchModule.updateAdvancedOverlay(overlayJson, CapacitorResult(call))
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
        barcodeBatchModule.applyModeSettings(modeSettingsJson, CapacitorResult(call))
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
