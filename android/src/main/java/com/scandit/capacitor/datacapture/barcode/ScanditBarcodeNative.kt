/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */
package com.scandit.capacitor.datacapture.barcode

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.scandit.capacitor.datacapture.barcode.count.BarcodeCountViewHandler
import com.scandit.capacitor.datacapture.barcode.factories.BarcodeCaptureActionFactory
import com.scandit.capacitor.datacapture.barcode.utils.SerializableAdvancedOverlayViewData
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo
import com.scandit.capacitor.datacapture.core.data.SerializableCallbackAction
import com.scandit.capacitor.datacapture.core.data.SerializableFinishModeCallbackData
import com.scandit.capacitor.datacapture.core.errors.JsonParseError
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult
import com.scandit.datacapture.core.ui.style.BrushDeserializer
import com.scandit.datacapture.frameworks.barcode.BarcodeModule
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.capture.listeners.FrameworksBarcodeCaptureListener
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountCaptureListListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewUiListener
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionAimedBrushProvider
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionListener
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionTrackedBrushProvider
import com.scandit.datacapture.frameworks.barcode.tracking.BarcodeTrackingModule
import com.scandit.datacapture.frameworks.barcode.tracking.listeners.FrameworksBarcodeTrackingAdvancedOverlayListener
import com.scandit.datacapture.frameworks.barcode.tracking.listeners.FrameworksBarcodeTrackingBasicOverlayListener
import com.scandit.datacapture.frameworks.barcode.tracking.listeners.FrameworksBarcodeTrackingListener
import com.scandit.datacapture.frameworks.core.deserialization.DeserializationLifecycleObserver
import com.scandit.datacapture.frameworks.core.events.Emitter
import com.scandit.datacapture.frameworks.core.utils.FrameworksLog
import com.scandit.datacapture.frameworks.core.utils.MainThread
import com.scandit.datacapture.frameworks.core.utils.WorkerThread
import org.json.JSONException
import org.json.JSONObject

@CapacitorPlugin(
    name = "ScanditBarcodeNative"
)
class ScanditBarcodeNative :
    Plugin(),
    DeserializationLifecycleObserver.Observer,
    Emitter {

    companion object {
        private const val FIELD_RESULT = "result"
        private const val CORE_PLUGIN_NAME = "ScanditCaptureCoreNative"
    }

    private val barcodeModule = BarcodeModule()
    private val barcodeCaptureModule = BarcodeCaptureModule(FrameworksBarcodeCaptureListener(this))
    private val barcodeTrackingModule = BarcodeTrackingModule(
        FrameworksBarcodeTrackingListener(this),
        FrameworksBarcodeTrackingBasicOverlayListener(this),
        FrameworksBarcodeTrackingAdvancedOverlayListener(this)
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
        FrameworksBarcodeCountViewUiListener(this)
    )

    private val barcodeCountViewHandler: BarcodeCountViewHandler = BarcodeCountViewHandler()

    override fun load() {
        super.load()

        // We need to register the plugin with its Core dependency for serializers to load.
        val corePlugin = bridge.getPlugin(CORE_PLUGIN_NAME)
        if (corePlugin != null) {
            (corePlugin.instance as ScanditCaptureCoreNative).registerPluginInstance(
                pluginHandle.instance
            )
        } else {
            FrameworksLog.error("Core not found")
        }

        barcodeCountViewHandler.attachWebView(bridge.webView, bridge.activity)
        DeserializationLifecycleObserver.attach(this)

        barcodeModule.onCreate(context)
        barcodeCaptureModule.onCreate(context)
        barcodeTrackingModule.onCreate(context)
        barcodeSelectionModule.onCreate(context)
        barcodeCountModule.onCreate(context)
    }

    override fun handleOnDestroy() {
        barcodeModule.onDestroy()
        barcodeCaptureModule.onDestroy()
        barcodeTrackingModule.onDestroy()
        barcodeSelectionModule.onDestroy()
        barcodeCountModule.onDestroy()
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
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            onJsonParseError(e, call)
        }
    }

    @PluginMethod
    fun getDefaults(call: PluginCall) {
        val defaults = JSObject.fromJSONObject(
            JSONObject(

                barcodeModule.getDefaults() +
                    mapOf("BarcodeCapture" to barcodeCaptureModule.getDefaults()) +
                    mapOf("BarcodeTracking" to barcodeTrackingModule.getDefaults()) +
                    mapOf("BarcodeSelection" to barcodeSelectionModule.getDefaults()) +
                    mapOf("BarcodeCount" to barcodeCountModule.getDefaults())

            )
        )

        call.resolve(defaults)
    }

    @PluginMethod
    fun subscribeBarcodeCaptureListener(call: PluginCall) {
        barcodeCaptureModule.addListener()
        call.resolve()
    }

    @PluginMethod
    fun subscribeBarcodeTrackingListener(call: PluginCall) {
        barcodeTrackingModule.addBarcodeTrackingListener()
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeTrackingDidUpdateSession(call: PluginCall) {
        barcodeTrackingModule.finishDidUpdateSession(call.data.getBoolean("enabled"))
        call.resolve()
    }

    @PluginMethod
    fun subscribeBarcodeTrackingBasicOverlayListener(call: PluginCall) {
        barcodeTrackingModule.addBasicOverlayListener()
        call.resolve()
    }

    @PluginMethod
    fun subscribeBarcodeSelectionListener(call: PluginCall) {
        barcodeSelectionModule.addListener()
        call.resolve()
    }

    @PluginMethod
    fun clearTrackedBarcodeBrushes(call: PluginCall) {
        barcodeTrackingModule.clearBasicOverlayTrackedBarcodeBrushes()
        call.resolve()
    }

    @PluginMethod
    fun setBrushForTrackedBarcode(call: PluginCall) {
        try {
            barcodeTrackingModule.setBasicOverlayBrushForTrackedBarcode(call.data.toString())
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun subscribeBarcodeTrackingAdvancedOverlayListener(call: PluginCall) {
        barcodeTrackingModule.addAdvancedOverlayListener()
        call.resolve()
    }

    @PluginMethod
    fun setViewForTrackedBarcode(call: PluginCall) {
        try {
            WorkerThread.runOnBackgroundThread {
                val serializationData = SerializableAdvancedOverlayViewData(call.data)

                val image = getBitmapFromBase64EncodedViewData(serializationData.view?.data)

                MainThread.runOnMainThread {
                    val view = barcodeTrackingModule.getTrackedBarcodeViewFromBitmap(
                        serializationData.trackedBarcodeId,
                        image
                    ) ?: return@runOnMainThread

                    view.layoutParams = ViewGroup.MarginLayoutParams(
                        serializationData.view?.options?.width ?: WRAP_CONTENT,
                        serializationData.view?.options?.height ?: WRAP_CONTENT
                    )

                    barcodeTrackingModule.setViewForTrackedBarcode(
                        view,
                        serializationData.trackedBarcodeId,
                        serializationData.sessionFrameSequenceId
                    )
                }
            }
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            call.reject(JsonParseError(e.message).toString())
        }

        call.resolve()
    }

    @PluginMethod
    fun setOffsetForTrackedBarcode(call: PluginCall) {
        try {
            barcodeTrackingModule.setOffsetForTrackedBarcode(
                hashMapOf(
                    "offset" to call.data.getString("offset"),
                    "identifier" to call.data.getInt("trackedBarcodeID")
                )
            )
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun setAnchorForTrackedBarcode(call: PluginCall) {
        try {
            barcodeTrackingModule.setAnchorForTrackedBarcode(
                hashMapOf(
                    "anchor" to call.data.getString("anchor"),
                    "identifier" to call.data.getInt("trackedBarcodeID")
                )
            )
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) { // TODO [SDC-1851] - fine-catch deserializer exceptions
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun getCountForBarcodeInBarcodeSelectionSession(call: PluginCall) {
        val count: Int = barcodeSelectionModule.getBarcodeCount(
            call.data.getString("selectionIdentifier").orEmpty()
        )
        CapacitorResult(call).success(
            mapOf("data" to count)
        )
    }

    @PluginMethod
    fun resetBarcodeCaptureSession(call: PluginCall) {
        barcodeCaptureModule.resetSession(null)
        call.resolve()
    }

    @PluginMethod
    fun resetBarcodeTrackingSession(call: PluginCall) {
        barcodeTrackingModule.resetSession(null)
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

    //region BarcodeCount

    //region Barcode Count Listener
    @PluginMethod
    fun finishBarcodeCountListenerOnScan(call: PluginCall) {
        barcodeCountModule.finishOnScan(true)
        call.resolve(null)
    }

    //endregion

    @PluginMethod
    fun createView(call: PluginCall) {
        val viewJson = call.data.toString()
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
    fun updateView(call: PluginCall) {
        val view = barcodeCountViewHandler.barcodeCountView
        if (view == null) {
            call.reject("The barcode count view has not been initialized yet.")
            return
        }

        barcodeCountModule.updateBarcodeCountView(call.data["BarcodeCountView"].toString())
        call.resolve()
    }

    @PluginMethod
    fun updateMode(call: PluginCall) {
        barcodeCountModule.updateBarcodeCount(call.data["BarcodeCount"].toString())
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
    fun startScanningPhase(call: PluginCall) {
        barcodeCountModule.startScanningPhase()
        call.resolve()
    }

    @PluginMethod
    fun endScanningPhase(call: PluginCall) {
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
        val barcodes = call.data.getJSONArray("TargetBarcodes")
        barcodeCountModule.setBarcodeCountCaptureList(barcodes)
        call.resolve()
    }

    @PluginMethod
    fun setViewPositionAndSize(call: PluginCall) {
        try {
            val positionJson = call.data.getString("position")
                ?: return call.reject("No position was given for setting the view.")
            val info = JSONObject(positionJson)
            barcodeCountViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(info))
            call.resolve()
        } catch (e: JSONException) {
            call.reject(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun showView(call: PluginCall) {
        barcodeCountViewHandler.setVisible()
        call.resolve()
    }

    @PluginMethod
    fun hideView(call: PluginCall) {
        barcodeCountViewHandler.setInvisible()
        call.resolve()
    }

    //endregion

    @PluginMethod
    fun finishBarcodeCountViewListenerBrushForRecognizedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brush", "")
        val brush = if (brushJson.isBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeID")
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList(call: PluginCall) {
        val brushJson = call.data.optString("brush", "")
        val brush = if (brushJson.isBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeID")
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush, trackedBarcodeId)
        call.resolve()
    }

    @PluginMethod
    fun finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode(call: PluginCall) {
        val brushJson = call.data.optString("brush", "")
        val brush = if (brushJson.isBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = call.data.getInt("trackedBarcodeID")
        barcodeCountModule.finishBrushForUnrecognizedBarcodeEvent(brush, trackedBarcodeId)
        call.resolve()
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
        payload["name"] = eventName
        notifyListeners(eventName, JSObject.fromJSONObject(JSONObject(payload)))
    }

    override fun hasListenersForEvent(eventName: String): Boolean = this.hasListeners(eventName)

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
}
