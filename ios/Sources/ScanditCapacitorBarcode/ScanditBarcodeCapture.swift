/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import Capacitor
import ScanditBarcodeCapture
import ScanditCapacitorDatacaptureCore
import ScanditFrameworksBarcode
import ScanditFrameworksCore

@objc(ScanditCapacitorBarcode)
class ScanditCapacitorBarcode: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScanditCapacitorBarcode"
    public let jsName = "ScanditBarcodeNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getDefaults", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeCaptureListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeCaptureListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeCaptureDidScan", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeCaptureDidUpdateSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeBatchListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeBatchListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeBatchDidUpdateSessionCallback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForBasicOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForBasicOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateSizeOfTrackedBarcodeView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerListenerForAdvancedOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterListenerForAdvancedOverlayEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishCallback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBrushForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearTrackedBarcodeBrushes", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setViewForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnchorForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setOffsetForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearTrackedBarcodeViews", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeSelectionListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeSelectionListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeSelection", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeCaptureSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeBatchSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeSelectionSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unfreezeCameraInBarcodeSelection", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeSelectionDidSelect", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeSelectionDidUpdateSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCountForBarcodeInBarcodeSelectionSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeCountListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeCountViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeCountViewUiListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeCountListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeCountViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeCountViewUiListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeCountViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hideBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeCountMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeCount", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetBarcodeCountSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startBarcodeCountScanningPhase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endBarcodeCountScanningPhase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearBarcodeCountViewHighlights", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeCountCaptureList", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeCountOnScan", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeCountBrushForRecognizedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(
            name: "finishBarcodeCountBrushForRecognizedBarcodeNotInList",
            returnType: CAPPluginReturnPromise
        ),
        CAPPluginMethod(name: "finishBarcodeCountBrushForAcceptedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBarcodeCountBrushForRejectedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeCountModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeCountFeedback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeBatchModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeSelectionModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeCaptureModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateFindMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeFindModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeFindListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeFindListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodeFindViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodeFindViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindViewOnPause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindViewOnResume", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindSetItemList", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindViewStopSearching", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindViewStartSearching", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindViewPauseSearching", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindModeStart", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindModePause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "barcodeFindModeStop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hideFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setTextForAimToSelectAutoHint", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeAimedBarcodeBrushProvider", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAimedBarcodeBrushProvider", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBrushForAimedBarcodeCallback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeTrackedBarcodeBrushProvider", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setTrackedBarcodeBrushProvider", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishBrushForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "selectAimedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unselectBarcodes", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setSelectBarcodeEnabled", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "increaseCountForBarcodes", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "subscribeBrushForAimedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "subscribeBrushForTrackedBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSpatialMap", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getSpatialMapWithHints", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setBarcodeTransformer", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unsetBarcodeTransformer", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitBarcodeFindTransformerResult", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeFindFeedback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createPickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updatePickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removePickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addPickActionListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removePickActionListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addBarcodePickScanningListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeBarcodePickScanningListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "addPickViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removePickViewListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerBarcodePickViewUiListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterBarcodePickViewUiListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishOnProductIdentifierForItems", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerOnProductIdentifierForItemsListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterOnProductIdentifierForItemsListener", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setPickViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pickViewStop", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pickViewStart", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pickViewFreeze", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pickViewPause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pickViewResume", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishPickAction", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "findNodeHandle", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showPickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hidePickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeCaptureOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeCaptureMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "applyBarcodeCaptureModeSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeSelectionBasicOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeSelectionMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "applyBarcodeSelectionModeSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeSelectionFeedback", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeBatchBasicOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeBatchAdvancedOverlay", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateBarcodeBatchMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "applyBarcodeBatchModeSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disposeSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateSparkScanMode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hideSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerSparkScanListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterSparkScanListenerForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setSparkScanModeEnabledState", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishSparkScanDidUpdateSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "finishSparkScanDidScan", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerSparkScanViewListenerEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterSparkScanViewListenerEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "prepareSparkScanViewScanning", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startSparkScanViewScanning", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pauseSparkScanViewScanning", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopSparkScanViewScanning", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "registerSparkScanFeedbackDelegateForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "unregisterSparkScanFeedbackDelegateForEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "submitSparkScanFeedbackForBarcode", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showSparkScanViewToast", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "executeNativeBarcodeGenerator", returnType: CAPPluginReturnPromise),
    ]

    private let barcodeModule = BarcodeModule()
    private let brushProviderQueue = DispatchQueue(label: "com.scandit.frameworks.capacitor.brushprovider")
    private var barcodeCaptureModule: BarcodeCaptureModule!
    private var barcodeBatchModule: BarcodeBatchModule!
    private var barcodeSelectionModule: BarcodeSelectionModule!
    private var barcodeCountModule: BarcodeCountModule!
    private var barcodeFindModule: BarcodeFindModule!
    private var barcodePickModule: BarcodePickModule!
    private var sparkScanModule: SparkScanModule!
    private var barcodeGeneratorModule: BarcodeGeneratorModule!

    private var barcodeCountViewHandler: BarcodeCountViewHandler!
    private var barcodeFindViewHandler: BarcodeFindViewHandler!
    private var barcodePickViewHandler: BarcodePickViewHandler!

    override func load() {
        let emitter = CapacitorEventEmitter(with: self)
        barcodeCaptureModule = BarcodeCaptureModule(emitter: emitter)
        barcodeBatchModule = BarcodeBatchModule(emitter: emitter)
        barcodeSelectionModule = BarcodeSelectionModule(
            emitter: emitter,
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(
                emitter: emitter,
                queue: brushProviderQueue
            ),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(
                emitter: emitter,
                queue: brushProviderQueue
            )
        )
        barcodeCountModule = BarcodeCountModule(emitter: emitter)
        barcodeFindModule = BarcodeFindModule(emitter: emitter)
        barcodePickModule = BarcodePickModule(emitter: emitter)
        sparkScanModule = SparkScanModule(emitter: emitter)
        barcodeGeneratorModule = BarcodeGeneratorModule()

        barcodeModule.didStart()
        barcodeCaptureModule.didStart()
        barcodeBatchModule.didStart()
        barcodeSelectionModule.didStart()
        barcodeCountModule.didStart()
        barcodeFindModule.didStart()
        barcodePickModule.didStart()
        sparkScanModule.didStart()
        barcodeGeneratorModule.didStart()

        guard let webView = webView else {
            fatalError("WebView must be available for view handler initialization")
        }
        barcodeCountViewHandler = BarcodeCountViewHandler(relativeTo: webView)
        barcodeFindViewHandler = BarcodeFindViewHandler(relativeTo: webView)
        barcodePickViewHandler = BarcodePickViewHandler(relativeTo: webView)
    }

    func onReset() {
        barcodeModule.didStop()
        barcodeCaptureModule.didStop()
        barcodeBatchModule.didStop()
        barcodeSelectionModule.didStop()
        barcodeCountModule.didStop()
        barcodeFindModule.didStop()
        barcodePickModule.didStop()
        sparkScanModule.didStop()
        barcodeGeneratorModule.didStop()
    }

    @objc(getDefaults:)
    func getDefaults(_ call: CAPPluginCall) {
        dispatchMain {
            var defaults = self.barcodeModule.defaults.toEncodable()
            defaults["BarcodeCapture"] = self.barcodeCaptureModule.defaults.toEncodable()
            defaults["BarcodeBatch"] = self.barcodeBatchModule.defaults.toEncodable()
            defaults["BarcodeSelection"] = self.barcodeSelectionModule.defaults.toEncodable()
            defaults["BarcodeCount"] = self.barcodeCountModule.defaults.toEncodable()
            defaults["BarcodeFind"] = self.barcodeFindModule.defaults.toEncodable()
            defaults["BarcodePick"] = self.barcodePickModule.defaults.toEncodable()
            defaults["SparkScan"] = self.sparkScanModule.defaults.toEncodable()
            call.resolve(defaults as PluginCallResultData)
        }
    }

    // MARK: Barcode Capture

    @objc(registerBarcodeCaptureListenerForEvents:)
    func registerBarcodeCaptureListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject("Missing modeId parameter")
            return
        }
        barcodeCaptureModule.addListener(modeId: modeId)
        call.resolve()
    }

    @objc(unregisterBarcodeCaptureListenerForEvents:)
    func unregisterBarcodeCaptureListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject("Missing modeId parameter")
            return
        }
        barcodeCaptureModule.removeListener(modeId: modeId)
        call.resolve()
    }

    @objc(finishBarcodeCaptureDidUpdateSession:)
    func finishBarcodeCaptureDidUpdateSession(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject("Missing modeId parameter")
            return
        }
        let enabled = call.getBool("enabled", false)
        barcodeCaptureModule.finishDidUpdateSession(modeId: modeId, enabled: enabled)
        call.resolve()
    }

    @objc(finishBarcodeCaptureDidScan:)
    func finishBarcodeCaptureDidScan(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject("Missing modeId parameter")
            return
        }
        let enabled = call.getBool("enabled", false)
        barcodeCaptureModule.finishDidScan(modeId: modeId, enabled: enabled)
        call.resolve()
    }

    @objc(resetBarcodeCaptureSession:)
    func resetBarcodeCaptureSession(_ call: CAPPluginCall) {
        barcodeCaptureModule.resetSession()
        call.resolve()
    }

    @objc(setBarcodeCaptureModeEnabledState:)
    func setBarcodeCaptureModeEnabledState(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject("Missing modeId parameter")
            return
        }
        let enabled = call.getBool("enabled", false)
        barcodeCaptureModule.setModeEnabled(modeId: modeId, enabled: enabled)
        call.resolve()
    }

    @objc(updateBarcodeCaptureOverlay:)
    func updateBarcodeCaptureOverlay(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject("Missing viewId parameter")
            return
        }
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject("Missing overlayJson parameter")
            return
        }
        barcodeCaptureModule.updateOverlay(viewId, overlayJson: overlayJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeCaptureMode:)
    func updateBarcodeCaptureMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getString("modeJson") else {
            call.reject("Missing modeJson parameter")
            return
        }
        barcodeCaptureModule.updateModeFromJson(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(applyBarcodeCaptureModeSettings:)
    func applyBarcodeCaptureModeSettings(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId"), let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject("Missing modeId or modeSettingsJson parameter")
            return
        }
        barcodeCaptureModule.applyModeSettings(
            modeId: modeId,
            modeSettingsJson: modeSettingsJson,
            result: CapacitorResult(call)
        )
    }

    // MARK: Barcode Batch

    @objc(registerBarcodeBatchListenerForEvents:)
    func registerBarcodeBatchListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.addBarcodeBatchListener(modeId)
        call.resolve()
    }

    @objc(unregisterBarcodeBatchListenerForEvents:)
    func unregisterBarcodeBatchListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.removeBarcodeBatchListener(modeId)
        call.resolve()
    }

    @objc(finishBarcodeBatchDidUpdateSessionCallback:)
    func finishBarcodeBatchDidUpdateSessionCallback(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.finishDidUpdateSession(modeId: modeId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(registerListenerForBasicOverlayEvents:)
    func registerListenerForBasicOverlayEvents(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.addBasicOverlayListener(dataCaptureViewId)
        call.resolve()
    }

    @objc(unregisterListenerForBasicOverlayEvents:)
    func unregisterListenerForBasicOverlayEvents(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.removeBasicOverlayListener(dataCaptureViewId)
        call.resolve()
    }

    @objc(registerListenerForAdvancedOverlayEvents:)
    func registerListenerForAdvancedOverlayEvents(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.addAdvancedOverlayListener(dataCaptureViewId)
        call.resolve()
    }

    @objc(unregisterListenerForAdvancedOverlayEvents:)
    func unregisterListenerForAdvancedOverlayEvents(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.removeAdvancedOverlayListener(dataCaptureViewId)
        call.resolve()
    }

    @objc(finishCallback:)
    func finishCallback(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let resultObject = call.getObject("result") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let finishCallbackId = resultObject["finishCallbackID"] else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard
            let result = BarcodeCaptureCallbackResult.from(
                ([
                    "finishCallbackID": finishCallbackId,
                    "result": resultObject,
                ] as NSDictionary).jsonString
            )
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        if result.isForListenerEvent(.didUpdateSessionInBarcodeSelection) {
            barcodeSelectionModule.finishDidUpdate(modeId: modeId, enabled: result.enabled ?? false)
        } else if result.isForListenerEvent(.didUpdateSelectionInBarcodeSelection) {
            barcodeSelectionModule.finishDidSelect(modeId: modeId, enabled: result.enabled ?? false)
        } else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        call.resolve()
    }

    @objc(setBrushForTrackedBarcode:)
    func setBrushForTrackedBarcode(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }

        guard let trackedBarcodeId = call.getInt("trackedBarcodeIdentifier") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        let brushJson = call.getString("brushJson")
        self.barcodeBatchModule.setBasicOverlayBrush(
            dataCaptureViewId,
            brushJson: brushJson,
            trackedBarcodeId: trackedBarcodeId
        )
        call.resolve()
    }

    @objc(clearTrackedBarcodeBrushes:)
    func clearTrackedBarcodeBrushes(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes(dataCaptureViewId)
        call.resolve()
    }

    @objc(setViewForTrackedBarcode:)
    func setViewForTrackedBarcode(_ call: CAPPluginCall) {
        guard let options = call.options,
            let json = try? ViewAndTrackedBarcodeJSON.fromJSONObject(options)
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewJson = json.viewJson else {
            barcodeBatchModule.setViewForTrackedBarcode(
                view: nil,
                trackedBarcodeId: json.trackedBarcodeIdentifier,
                sessionFrameSequenceId: json.sessionFrameSequenceID,
                dataCaptureViewId: json.dataCaptureViewId
            )
            return
        }
        dispatchMain { [weak self] in
            let view: TrackedBarcodeView? = TrackedBarcodeView(json: viewJson)
            self?.barcodeBatchModule.setViewForTrackedBarcode(
                view: view,
                trackedBarcodeId: json.trackedBarcodeIdentifier,
                sessionFrameSequenceId: json.sessionFrameSequenceID,
                dataCaptureViewId: json.dataCaptureViewId
            )
            call.resolve()
        }
    }

    @objc(updateSizeOfTrackedBarcodeView:)
    func updateSizeOfTrackedBarcodeView(_ call: CAPPluginCall) {
        // https://scandit.atlassian.net/browse/SDC-26621
    }

    @objc(setAnchorForTrackedBarcode:)
    func setAnchorForTrackedBarcode(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        guard let anchorJson = call.getString("anchor"),
            let identifier = call.getInt("trackedBarcodeIdentifier")
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.setAnchorForTrackedBarcode(
            anchorJson: anchorJson,
            trackedBarcodeId: identifier,
            dataCaptureViewId: dataCaptureViewId
        )
        call.resolve()
    }

    @objc(setOffsetForTrackedBarcode:)
    func setOffsetForTrackedBarcode(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        guard let offsetJson = call.getString("offsetJson"),
            let identifier = call.getInt("trackedBarcodeIdentifier")
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.setOffsetForTrackedBarcode(
            offsetJson: offsetJson,
            trackedBarcodeId: identifier,
            dataCaptureViewId: dataCaptureViewId
        )
        call.resolve()
    }

    @objc(clearTrackedBarcodeViews:)
    func clearTrackedBarcodeViews(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        self.barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews(dataCaptureViewId)
        call.resolve()
    }

    @objc(resetBarcodeBatchSession:)
    func resetBarcodeBatchSession(_ call: CAPPluginCall) {
        barcodeBatchModule.resetSession(frameSequenceId: nil)
        call.resolve()
    }

    // MARK: Barcode Selection

    @objc(registerBarcodeSelectionListenerForEvents:)
    func registerBarcodeSelectionListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.addListener(modeId: modeId)
        call.resolve()
    }

    @objc(unregisterBarcodeSelectionListenerForEvents:)
    func unregisterBarcodeSelectionListenerForEvents(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.removeListener(modeId: modeId)
        call.resolve()
    }

    @objc(resetBarcodeSelection:)
    func resetBarcodeSelection(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.resetSelection(modeId: modeId)
        call.resolve()
    }

    @objc(unfreezeCameraInBarcodeSelection:)
    func unfreezeCameraInBarcodeSelection(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.unfreezeCamera(modeId: modeId)
        call.resolve()
    }

    @objc(finishBarcodeSelectionDidSelect:)
    func finishBarcodeSelectionDidSelect(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.finishDidSelect(modeId: modeId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(finishBarcodeSelectionDidUpdateSession:)
    func finishBarcodeSelectionDidUpdateSession(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.finishDidUpdate(modeId: modeId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(getCountForBarcodeInBarcodeSelectionSession:)
    func getCountForBarcodeInBarcodeSelectionSession(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let selectionIdentifier = call.getString("selectionIdentifier") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.submitBarcodeCountForIdentifier(
            modeId: modeId,
            selectionIdentifier: selectionIdentifier,
            result: CapacitorResult(call)
        )
    }

    @objc(resetBarcodeSelectionSession:)
    func resetBarcodeSelectionSession(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.resetLatestSession(modeId: modeId, frameSequenceId: nil)
        call.resolve()
    }

    @objc(setTextForAimToSelectAutoHint:)
    func setTextForAimToSelectAutoHint(_ call: CAPPluginCall) {
        barcodeSelectionModule.setTextForAimToSelectAutoHint(
            text: call.getString("text", ""),
            result: CapacitorResult(call)
        )
    }

    @objc(removeAimedBarcodeBrushProvider:)
    func removeAimedBarcodeBrushProvider(_ call: CAPPluginCall) {
        barcodeSelectionModule.removeAimedBarcodeBrushProvider()
        call.resolve()
    }

    @objc(setAimedBarcodeBrushProvider:)
    func setAimedBarcodeBrushProvider(_ call: CAPPluginCall) {
        barcodeSelectionModule.setAimedBrushProvider(result: CapacitorResult(call))
    }

    @objc(finishBrushForAimedBarcodeCallback:)
    func finishBrushForAimedBarcodeCallback(_ call: CAPPluginCall) {
        let brushJson = call.getString("brush")
        guard let selectionIdentifier = call.getString("selectionIdentifier") else {
            call.reject("selectionIdentifier is missing in the call parameters.")
            return
        }

        barcodeSelectionModule.finishBrushForAimedBarcode(
            brushJson: brushJson,
            selectionIdentifier: selectionIdentifier
        )
        call.resolve()
    }

    @objc(removeTrackedBarcodeBrushProvider:)
    func removeTrackedBarcodeBrushProvider(_ call: CAPPluginCall) {
        barcodeSelectionModule.removeTrackedBarcodeBrushProvider()
        call.resolve()
    }

    @objc(setTrackedBarcodeBrushProvider:)
    func setTrackedBarcodeBrushProvider(_ call: CAPPluginCall) {
        barcodeSelectionModule.setTrackedBrushProvider(result: CapacitorResult(call))
    }

    @objc(finishBrushForTrackedBarcode:)
    func finishBrushForTrackedBarcode(_ call: CAPPluginCall) {
        let brushJson = call.getString("brush")
        guard let selectionIdentifier = call.getString("selectionIdentifier") else {
            call.reject("selectionIdentifier is missing in the call parameters.")
            return
        }

        barcodeSelectionModule.finishBrushForTrackedBarcode(
            brushJson: brushJson,
            selectionIdentifier: selectionIdentifier
        )
        call.resolve()
    }

    @objc(selectAimedBarcode:)
    func selectAimedBarcode(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.selectAimedBarcode(modeId: modeId)
        call.resolve()
    }

    @objc(unselectBarcodes:)
    func unselectBarcodes(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let barcodesStr = call.getString("barcodesJson") else {
            call.reject("barcodeJson is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.unselectBarcodes(
            modeId: modeId,
            barcodesJson: barcodesStr,
            result: CapacitorResult(call)
        )
    }

    @objc(setSelectBarcodeEnabled:)
    func setSelectBarcodeEnabled(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let barcodesStr = call.getString("barcodeJson") else {
            call.reject("barcodeJson is missing in the call parameters.")
            return
        }
        guard let enabled = call.getBool("enabled") else {
            call.reject("enabled is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.setSelectBarcodeEnabled(
            modeId: modeId,
            barcodesJson: barcodesStr,
            enabled: enabled,
            result: CapacitorResult(call)
        )
    }

    @objc(increaseCountForBarcodes:)
    func increaseCountForBarcodes(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let barcodesStr = call.getString("barcodeJson") else {
            call.reject("barcodeJson is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.increaseCountForBarcodes(
            modeId: modeId,
            barcodesJson: barcodesStr,
            result: CapacitorResult(call)
        )
    }

    @objc(subscribeBrushForAimedBarcode:)
    func subscribeBrushForAimedBarcode(_ call: CAPPluginCall) {
        // Setting the provider does subriber
        call.resolve()
    }

    @objc(subscribeBrushForTrackedBarcode:)
    func subscribeBrushForTrackedBarcode(_ call: CAPPluginCall) {
        // Setting the provider does subriber
        call.resolve()
    }

    // MARK: Barcode Count

    @objc(registerBarcodeCountListener:)
    func registerBarcodeCountListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.addBarcodeCountListener(viewId: viewId)
        call.resolve()
    }

    @objc(registerBarcodeCountViewListener:)
    func registerBarcodeCountViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.addBarcodeCountViewListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(registerBarcodeCountViewUiListener:)
    func registerBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.addBarcodeCountViewUiListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeCountListener:)
    func unregisterBarcodeCountListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.removeBarcodeCountListener(viewId: viewId)
        call.resolve()
    }

    @objc(unregisterBarcodeCountViewListener:)
    func unregisterBarcodeCountViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.removeBarcodeCountViewListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeCountViewUiListener:)
    func unregisterBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.removeBarcodeCountViewUiListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(setBarcodeCountViewPositionAndSize:)
    func setBarcodeCountViewPositionAndSize(_ call: CAPPluginCall) {
        dispatchMain {
            guard let top = call.getDouble("top"),
                let left = call.getDouble("left"),
                let width = call.getDouble("width"),
                let height = call.getDouble("height")
            else {
                call.reject("Missing required position parameters")
                return
            }

            let shouldBeUnderWebView = call.getBool("shouldBeUnderWebView", false)
            let jsonObject: [String: Any] = [
                "top": top,
                "left": left,
                "width": width,
                "height": height,
                "shouldBeUnderWebView": shouldBeUnderWebView,
            ]

            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject) else {
                call.reject(CommandError.invalidJSON.toJSONString())
                return
            }

            self.barcodeCountViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

            if viewPositionAndSizeJSON.shouldBeUnderWebView {
                // Make the WebView transparent, so we can see views behind
                self.webView?.isOpaque = false
                self.webView?.backgroundColor = .clear
                self.webView?.scrollView.backgroundColor = .clear
            } else {
                self.webView?.isOpaque = true
                self.webView?.backgroundColor = nil
                self.webView?.scrollView.backgroundColor = nil
            }

            call.resolve()
        }
    }

    @objc(showBarcodeCountView:)
    func showBarcodeCountView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.showView(viewId)
        call.resolve()
    }

    @objc(hideBarcodeCountView:)
    func hideBarcodeCountView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        barcodeCountModule.hideView(viewId)
        call.resolve()
    }

    @objc(resetBarcodeCount:)
    func resetBarcodeCount(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.resetBarcodeCount(viewId: viewId)
        call.resolve()
    }

    @objc(createBarcodeCountView:)
    func createBarcodeCountView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("viewJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        dispatchMain {
            self.barcodeCountModule.addViewFromJson(
                parent: self.barcodeCountViewHandler.webView,
                viewJson: viewJson,
                result: CapacitorResult(call)
            )

            self.barcodeCountViewHandler.currentBarcodeCountView = self.barcodeCountModule.getTopMostView()
        }
    }

    @objc(removeBarcodeCountView:)
    func removeBarcodeCountView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        self.barcodeCountModule.disposeBarcodeCountView(viewId: viewId)
        self.barcodeCountViewHandler.currentBarcodeCountView = self.barcodeCountModule.getTopMostView()
        call.resolve()
    }

    @objc(updateBarcodeCountView:)
    func updateBarcodeCountView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("viewJson"),
            let viewId = call.getInt("viewId")
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCountView(viewId: viewId, viewJson: viewJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeCountMode:)
    func updateBarcodeCountMode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId"),
            let barcodeCountJson = call.getString("barcodeCountJson")
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCount(viewId: viewId, modeJson: barcodeCountJson, result: CapacitorResult(call))
    }

    @objc(resetBarcodeCountSession:)
    func resetBarcodeCountSession(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.resetBarcodeCountSession(viewId: viewId, frameSequenceId: nil)
        call.resolve()
    }

    @objc(startBarcodeCountScanningPhase:)
    func startBarcodeCountScanningPhase(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.startScanningPhase(viewId: viewId)
        call.resolve()
    }

    @objc(endBarcodeCountScanningPhase:)
    func endBarcodeCountScanningPhase(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.endScanningPhase(viewId: viewId)
        call.resolve()
    }

    @objc(clearBarcodeCountViewHighlights:)
    func clearBarcodeCountViewHighlights(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.clearHighlights(viewId: viewId)
        call.resolve()
    }

    @objc(setBarcodeCountCaptureList:)
    func setBarcodeCountCaptureList(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let barcodesArray = call.options["TargetBarcodes"] as? [[String: Any]],
            let barcodesData = try? JSONSerialization.data(withJSONObject: barcodesArray),
            let barcodes = String(data: barcodesData, encoding: .utf8)
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.setBarcodeCountCaptureList(viewId: viewId, barcodesJson: barcodes)
        call.resolve()
    }

    @objc(finishBarcodeCountOnScan:)
    func finishBarcodeCountOnScan(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.finishOnScan(viewId: viewId, enabled: true)
        call.resolve()
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcode:)
    func finishBarcodeCountBrushForRecognizedBarcode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let trackedBarcodeId = call.getInt("trackedBarcodeId") else {
            call.reject("Invalid tracked barcode id received.")
            return
        }
        let brushJson = call.getString("brushJson")
        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(
            viewId: viewId,
            brush: brush,
            trackedBarcodeId: trackedBarcodeId,
            result: CapacitorResult(call)
        )
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcodeNotInList:)
    func finishBarcodeCountBrushForRecognizedBarcodeNotInList(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let trackedBarcodeId = call.getInt("trackedBarcodeId") else {
            call.reject("Invalid tracked barcode id received.")
            return
        }
        let brushJson = call.getString("brushJson")
        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(
            viewId: viewId,
            brush: brush,
            trackedBarcodeId: trackedBarcodeId,
            result: CapacitorResult(call)
        )
    }

    @objc(finishBarcodeCountBrushForAcceptedBarcode:)
    func finishBarcodeCountBrushForAcceptedBarcode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let trackedBarcodeId = call.getInt("trackedBarcodeId") else {
            call.reject("Invalid tracked barcode id received.")
            return
        }
        let brushJson = call.getString("brushJson")
        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForAcceptedBarcodeEvent(
            viewId: viewId,
            brush: brush,
            trackedBarcodeId: trackedBarcodeId
        )
        call.resolve()
    }

    @objc(finishBarcodeCountBrushForRejectedBarcode:)
    func finishBarcodeCountBrushForRejectedBarcode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let trackedBarcodeId = call.getInt("trackedBarcodeId") else {
            call.reject("Invalid tracked barcode id received.")
            return
        }
        let brushJson = call.getString("brushJson")
        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForRejectedBarcodeEvent(
            viewId: viewId,
            brush: brush,
            trackedBarcodeId: trackedBarcodeId
        )
        call.resolve()
    }

    @objc(getBarcodeCountSpatialMap:)
    func getBarcodeCountSpatialMap(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.submitSpatialMap(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(getBarcodeCountSpatialMapWithHints:)
    func getBarcodeCountSpatialMapWithHints(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let expectedNumberOfRows = call.getInt("expectedNumberOfRows") else {
            call.reject("expectedNumberOfRows is missing in the function parameters.")
            return
        }

        guard let expectedNumberOfColumns = call.getInt("expectedNumberOfColumns") else {
            call.reject("expectedNumberOfColumns is missing in the function parameters.")
            return
        }

        barcodeCountModule.submitSpatialMap(
            viewId: viewId,
            expectedNumberOfRows: expectedNumberOfRows,
            expectedNumberOfColumns: expectedNumberOfColumns,
            result: CapacitorResult(call)
        )
    }

    @objc(setBarcodeCountModeEnabledState:)
    func setBarcodeCountModeEnabledState(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeCountModule.setModeEnabled(viewId: viewId, enabled: call.getBool("isEnabled", false))
        call.resolve()
    }

    @objc(updateBarcodeCountFeedback:)
    func updateBarcodeCountFeedback(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        if let feedbackJson = call.getString("feedbackJson") {
            barcodeCountModule.updateFeedback(viewId: viewId, feedbackJson: feedbackJson, result: CapacitorResult(call))
            return
        }

        call.reject("No feedbackJson was provided for the function.")
    }

    @objc(setBarcodeBatchModeEnabledState:)
    func setBarcodeBatchModeEnabledState(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeBatchModule.setModeEnabled(modeId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(setBarcodeSelectionModeEnabledState:)
    func setBarcodeSelectionModeEnabledState(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        barcodeSelectionModule.setModeEnabled(modeId: modeId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    // MARK: BarcodeFind

    @objc(createFindView:)
    func createFindView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("json") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.barcodeFindModule.addViewToContainer(
                container: self.barcodeFindViewHandler.webView,
                jsonString: viewJson,
                result: CapacitorResult(call)
            )
            self.barcodeFindViewHandler.barcodeFindView = self.barcodeFindModule.getViewById(viewId)
        }
    }

    @objc(updateFindView:)
    func updateFindView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        do {
            guard let options = call.options,
                let barcodeFindViewJson = options["barcodeFindViewJson"] as? [String: Any],
                let data = try? JSONSerialization.data(withJSONObject: barcodeFindViewJson),
                let viewJson = String(data: data, encoding: .utf8)
            else {
                call.reject(CommandError.invalidJSON.toJSONString())
                return
            }
            barcodeFindModule.updateBarcodeFindView(
                viewId,
                viewJson: viewJson,
                result: CapacitorResult(call)
            )
        }
    }

    @objc(removeFindView:)
    func removeFindView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.barcodeFindViewHandler.barcodeFindView = nil
            self.barcodeFindModule.removeBarcodeFindView(viewId, result: CapacitorResult(call))
        }
    }

    @objc(updateFindMode:)
    func updateFindMode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId"),
            let options = call.options,
            let modeJson = options["barcodeFindJson"] as? String
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.updateBarcodeFindMode(
            viewId,
            modeJson: modeJson,
            result: CapacitorResult(call)
        )
    }

    @objc(registerBarcodeFindListener:)
    func registerBarcodeFindListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.addBarcodeFindListener(viewId, result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeFindListener:)
    func unregisterBarcodeFindListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.removeBarcodeFindListener(viewId, result: CapacitorResult(call))
    }

    @objc(registerBarcodeFindViewListener:)
    func registerBarcodeFindViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.addBarcodeFindViewListener(viewId, result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeFindViewListener:)
    func unregisterBarcodeFindViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.removeBarcodeFindViewListener(viewId, result: CapacitorResult(call))
    }

    @objc(setBarcodeFindModeEnabledState:)
    func setBarcodeFindModeEnabledState(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.setModeEnabled(viewId, enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(setBarcodeTransformer:)
    func setBarcodeTransformer(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.setBarcodeFindTransformer(viewId, result: CapacitorResult(call))
    }

    @objc(unsetBarcodeTransformer:)
    func unsetBarcodeTransformer(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.setBarcodeFindTransformer(viewId, result: CapacitorResult(call))
    }

    @objc(submitBarcodeFindTransformerResult:)
    func submitBarcodeFindTransformerResult(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let transformedBarcode = call.getString("transformedBarcode") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.submitBarcodeFindTransformerResult(
            viewId,
            transformedData: transformedBarcode,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeFindFeedback:)
    func updateBarcodeFindFeedback(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let feedbackJson = call.getString("feedbackJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.updateFeedback(
            viewId,
            feedbackJson: feedbackJson,
            result: CapacitorResult(call)
        )
    }

    @objc(barcodeFindViewOnPause:)
    func barcodeFindViewOnPause(_ call: CAPPluginCall) {
        // No iOS implementation
        call.resolve()
    }

    @objc(barcodeFindViewOnResume:)
    func barcodeFindViewOnResume(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.prepareSearching(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindSetItemList:)
    func barcodeFindSetItemList(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId"),
            let options = call.options,
            let json = options["itemsJson"] as? String
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.setItemList(viewId, barcodeFindItemsJson: json, result: CapacitorResult(call))
    }

    @objc(barcodeFindViewStopSearching:)
    func barcodeFindViewStopSearching(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.stopSearching(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindViewStartSearching:)
    func barcodeFindViewStartSearching(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.startSearching(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindViewPauseSearching:)
    func barcodeFindViewPauseSearching(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.pauseSearching(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindModeStart:)
    func barcodeFindModeStart(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.startMode(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindModePause:)
    func barcodeFindModePause(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.pauseMode(viewId, result: CapacitorResult(call))
    }

    @objc(barcodeFindModeStop:)
    func barcodeFindModeStop(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodeFindModule.stopMode(viewId, result: CapacitorResult(call))
    }

    @objc(showFindView:)
    func showFindView(_ call: CAPPluginCall) {
        dispatchMain {
            guard let barcodeFindView = self.barcodeFindViewHandler.barcodeFindView else {
                call.reject(CommandError.noViewToBeShown.toJSONString())
                return
            }
            barcodeFindView.isHidden = false
            call.resolve()
        }
    }

    @objc(hideFindView:)
    func hideFindView(_ call: CAPPluginCall) {
        dispatchMain {
            guard let barcodeFindView = self.barcodeFindViewHandler.barcodeFindView else {
                call.reject(CommandError.noViewToBeShown.toJSONString())
                return
            }
            barcodeFindView.isHidden = true
            call.resolve()
        }
    }

    // MARK: Barcode Pick

    @objc(createPickView:)
    func createPickView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("json") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        dispatchMain {
            self.barcodePickModule.addViewToContainer(
                container: self.barcodePickViewHandler.webView,
                jsonString: viewJson,
                result: CapacitorResult(call)
            )
            self.barcodePickViewHandler.currentBarcodePickView = self.barcodePickModule.getTopMostView()
        }
    }

    @objc(removePickView:)
    func removePickView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.barcodePickViewHandler.currentBarcodePickView = nil
            self.barcodePickModule.removeView(viewId: viewId, result: CapacitorResult(call))
        }
    }

    @objc(updatePickView:)
    func updatePickView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId"),
            let options = call.options,
            let viewJson = options["BarcodePickView"] as? String
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodePickModule.updateView(
            viewId: viewId,
            viewJson: viewJson,
            result: CapacitorResult(call)
        )

    }

    @objc(setPickViewPositionAndSize:)
    func setPickViewPositionAndSize(_ call: CAPPluginCall) {
        dispatchMain {
            guard let top = call.getDouble("top"),
                let left = call.getDouble("left"),
                let width = call.getDouble("width"),
                let height = call.getDouble("height")
            else {
                call.reject("Missing required position parameters")
                return
            }

            let shouldBeUnderWebView = call.getBool("shouldBeUnderWebView", false)
            let jsonObject: [String: Any] = [
                "top": top,
                "left": left,
                "width": width,
                "height": height,
                "shouldBeUnderWebView": shouldBeUnderWebView,
            ]

            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject) else {
                call.reject(CommandError.invalidJSON.toJSONString())
                return
            }

            self.barcodePickViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

            if viewPositionAndSizeJSON.shouldBeUnderWebView {
                // Make the WebView transparent, so we can see views behind
                self.webView?.isOpaque = false
                self.webView?.backgroundColor = .clear
                self.webView?.scrollView.backgroundColor = .clear
            } else {
                self.webView?.isOpaque = true
                self.webView?.backgroundColor = nil
                self.webView?.scrollView.backgroundColor = nil
            }

            call.resolve()
        }
    }

    @objc(addPickActionListener:)
    func addPickActionListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.addActionListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(removePickActionListener:)
    func removePickActionListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.removeActionListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(addBarcodePickScanningListener:)
    func addBarcodePickScanningListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.addScanningListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(removeBarcodePickScanningListener:)
    func removeBarcodePickScanningListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.removeScanningListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(addPickViewListener:)
    func addPickViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.addViewListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(removePickViewListener:)
    func removePickViewListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.removeViewListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(addBarcodePickListener:)
    func addBarcodePickListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.addBarcodePickListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(removeBarcodePickListener:)
    func removeBarcodePickListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.removeBarcodePickListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(registerBarcodePickViewUiListener:)
    func registerBarcodePickViewUiListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.addViewUiListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(unregisterBarcodePickViewUiListener:)
    func unregisterBarcodePickViewUiListener(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.removeViewUiListener(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(finishOnProductIdentifierForItems:)
    func finishOnProductIdentifierForItems(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId"),
            let options = call.options,
            let itemsJson = options["itemsJson"] as? String
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodePickModule.finishProductIdentifierForItems(
            viewId: viewId,
            barcodePickProductProviderCallbackItemsJson: itemsJson,
            result: CapacitorResult(call)
        )
    }

    @objc(registerOnProductIdentifierForItemsListener:)
    func registerOnProductIdentifierForItemsListener(_ call: CAPPluginCall) {
        call.resolve()
    }

    @objc(unregisterOnProductIdentifierForItemsListener:)
    func unregisterOnProductIdentifierForItemsListener(_ call: CAPPluginCall) {
        call.resolve()
    }

    @objc(pickViewStop:)
    func pickViewStop(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.viewStop(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(pickViewStart:)
    func pickViewStart(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.viewStart(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(pickViewFreeze:)
    func pickViewFreeze(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.viewFreeze(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(pickViewPause:)
    func pickViewPause(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.viewPause(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(pickViewResume:)
    func pickViewResume(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        barcodePickModule.viewResume(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(finishPickAction:)
    func finishPickAction(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let result = call.options["result"] as? Bool,
            let code = call.options["code"] as? String
        else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodePickModule.finishPickAction(
            viewId: viewId,
            data: code,
            actionResult: result,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeSelectionBasicOverlay:)
    func updateBarcodeSelectionBasicOverlay(_ call: CAPPluginCall) {
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.updateBasicOverlay(overlayJson: overlayJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeSelectionMode:)
    func updateBarcodeSelectionMode(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let modeJson = call.getString("modeJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.updateModeFromJson(
            modeId: modeId,
            modeJson: modeJson,
            result: CapacitorResult(call)
        )
    }

    @objc(applyBarcodeSelectionModeSettings:)
    func applyBarcodeSelectionModeSettings(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.applyModeSettings(
            modeId: modeId,
            modeSettingsJson: modeSettingsJson,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeSelectionFeedback:)
    func updateBarcodeSelectionFeedback(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let feedbackJson = call.getString("feedbackJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.updateFeedback(modeId: modeId, feedbackJson: feedbackJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeBatchBasicOverlay:)
    func updateBarcodeBatchBasicOverlay(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.updateBasicOverlay(
            dataCaptureViewId,
            overlayJson: overlayJson,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeBatchAdvancedOverlay:)
    func updateBarcodeBatchAdvancedOverlay(_ call: CAPPluginCall) {
        guard let dataCaptureViewId = call.getInt("dataCaptureViewId") else {
            call.reject(CommandError.noDataCaptureViewIdParameter.toJSONString())
            return
        }
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.updateAdvancedOverlay(
            dataCaptureViewId,
            overlayJson: overlayJson,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeBatchMode:)
    func updateBarcodeBatchMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getString("modeJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.updateModeFromJson(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(applyBarcodeBatchModeSettings:)
    func applyBarcodeBatchModeSettings(_ call: CAPPluginCall) {
        guard let modeId = call.getInt("modeId") else {
            call.reject(CommandError.noModeIdParameter.toJSONString())
            return
        }
        guard let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.applyModeSettings(modeId, modeSettingsJson: modeSettingsJson, result: CapacitorResult(call))
    }

    // MARK: SparkScan

    @objc(createSparkScanView:)
    func createSparkScanView(_ call: CAPPluginCall) {
        guard let container = bridge?.webView else {
            call.reject(CommandError.noWebView.toJSONString())
            return
        }

        guard let viewJson = call.getString("viewJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        self.sparkScanModule.addViewToContainer(
            container,
            jsonString: viewJson,
            result: CapacitorResult(call)
        )
    }

    @objc(disposeSparkScanView:)
    func disposeSparkScanView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        dispatchMain {
            self.sparkScanModule.disposeView(viewId: viewId)
        }
        call.resolve()
    }

    @objc(updateSparkScanView:)
    func updateSparkScanView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("viewJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.sparkScanModule.updateView(viewId: viewId, viewJson: viewJson, result: CapacitorResult(call))
        }
    }

    @objc(updateSparkScanMode:)
    func updateSparkScanMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getObject("SparkScan")?.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.updateMode(viewId: viewId, modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(showSparkScanView:)
    func showSparkScanView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.sparkScanModule.showView(viewId)
        }
    }

    @objc(hideSparkScanView:)
    func hideSparkScanView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            self.sparkScanModule.hideView(viewId)
        }
    }

    @objc(registerSparkScanListenerForEvents:)
    func registerSparkScanListenerForEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.addSparkScanListener(viewId: viewId)
        call.resolve()
    }

    @objc(unregisterSparkScanListenerForEvents:)
    func unregisterSparkScanListenerForEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.removeSparkScanListener(viewId: viewId)
        call.resolve()
    }

    @objc(setSparkScanModeEnabledState:)
    func setSparkScanModeEnabledState(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.setModeEnabled(viewId: viewId, enabled: call.getBool("isEnabled", false))
        call.resolve()
    }

    @objc(finishSparkScanDidUpdateSession:)
    func finishSparkScanDidUpdateSession(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.finishDidUpdateSession(viewId: viewId, enabled: call.getBool("isEnabled", false))
        call.resolve()
    }

    @objc(finishSparkScanDidScan:)
    func finishSparkScanDidScan(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.finishDidScan(viewId: viewId, enabled: call.getBool("isEnabled", false))
        call.resolve()
    }

    @objc(registerSparkScanViewListenerEvents:)
    func registerSparkScanViewListenerEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.addSparkScanViewUiListener(viewId: viewId)
        call.resolve()
    }

    @objc(unregisterSparkScanViewListenerEvents:)
    func unregisterSparkScanViewListenerEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.removeSparkScanViewUiListener(viewId: viewId)
        call.resolve()
    }

    @objc(prepareSparkScanViewScanning:)
    func prepareSparkScanViewScanning(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.prepareScanning(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(startSparkScanViewScanning:)
    func startSparkScanViewScanning(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.startScanning(viewId: viewId, result: CapacitorResult(call))
    }

    @objc(pauseSparkScanViewScanning:)
    func pauseSparkScanViewScanning(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.pauseScanning(viewId: viewId)
        call.resolve()
    }

    @objc(stopSparkScanViewScanning:)
    func stopSparkScanViewScanning(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.stopScanning(viewId: viewId)
        call.resolve()
    }

    @objc(registerSparkScanFeedbackDelegateForEvents:)
    func registerSparkScanFeedbackDelegateForEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.addFeedbackDelegate(viewId)
        call.resolve()
    }

    @objc(unregisterSparkScanFeedbackDelegateForEvents:)
    func unregisterSparkScanFeedbackDelegateForEvents(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.removeFeedbackDelegate(viewId)
        call.resolve()
    }

    @objc(submitSparkScanFeedbackForBarcode:)
    func submitSparkScanFeedbackForBarcode(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        sparkScanModule.submitFeedbackForBarcode(
            viewId: viewId,
            feedbackJson: call.getString("feedbackJson"),
            result: CapacitorResult(call)
        )
    }

    @objc(showSparkScanViewToast:)
    func showSparkScanViewToast(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        guard let text = call.getString("text") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        sparkScanModule.showToast(viewId: viewId, text: text, result: CapacitorResult(call))
    }

    @objc(executeNativeBarcodeGenerator:)
    func executeNativeBarcodeGenerator(_ call: CAPPluginCall) {
        _ = barcodeGeneratorModule.execute(method: CapacitorMethodCall(call), result: CapacitorResult(call))
    }
}
