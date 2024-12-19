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
class ScanditCapacitorBarcode: CAPPlugin {

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
        barcodeCaptureModule = BarcodeCaptureModule(
            barcodeCaptureListener: FrameworksBarcodeCaptureListener(emitter: emitter)
        )
        barcodeBatchModule = BarcodeBatchModule(
            barcodeBatchListener: FrameworksBarcodeBatchListener(emitter: emitter),
            barcodeBatchBasicOverlayListener: FrameworksBarcodeBatchBasicOverlayListener(emitter: emitter),
            barcodeBatchAdvancedOverlayListener: FrameworksBarcodeBatchAdvancedOverlayListener(emitter: emitter),
            emitter: emitter
        )
        barcodeSelectionModule = BarcodeSelectionModule(
            barcodeSelectionListener: FrameworksBarcodeSelectionListener(emitter: emitter),
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(
                emitter: emitter,
                queue: brushProviderQueue
            ),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(
                emitter: emitter,
                queue: brushProviderQueue
            )
        )
        barcodeCountModule = BarcodeCountModule(
            barcodeCountListener: FrameworksBarcodeCountListener(emitter: emitter),
            captureListListener: FrameworksBarcodeCountCaptureListListener(emitter: emitter),
            viewListener: FrameworksBarcodeCountViewListener(emitter: emitter),
            viewUiListener: FrameworksBarcodeCountViewUIListener(emitter: emitter),
            statusProvider: FrameworksBarcodeCountStatusProvider(emitter: emitter)
        )
        barcodeFindModule = BarcodeFindModule(
            listener: FrameworksBarcodeFindListener(emitter: emitter),
            viewListener: FrameworksBarcodeFindViewUIListener(emitter: emitter),
            barcodeTransformer: FrameworksBarcodeFindTransformer(emitter: emitter)
        )
        barcodePickModule = BarcodePickModule(emitter: emitter)
        sparkScanModule = SparkScanModule(
            sparkScanListener: FrameworksSparkScanListener(emitter: emitter),
            sparkScanViewUIListener: FrameworksSparkScanViewUIListener(emitter: emitter),
            feedbackDelegate: FrameworksSparkScanFeedbackDelegate(emitter: emitter)
        )
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

        barcodeCountViewHandler = BarcodeCountViewHandler(relativeTo: webView!)
        barcodeFindViewHandler = BarcodeFindViewHandler(relativeTo: webView!)
        barcodePickViewHandler = BarcodePickViewHandler(relativeTo: webView!)
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
        dispatchMainSync {
            var defaults = barcodeModule.defaults.toEncodable()
            defaults["BarcodeCapture"] = barcodeCaptureModule.defaults.toEncodable()
            defaults["BarcodeBatch"] = barcodeBatchModule.defaults.toEncodable()
            defaults["BarcodeSelection"] = barcodeSelectionModule.defaults.toEncodable()
            defaults["BarcodeCount"] = barcodeCountModule.defaults.toEncodable()
            defaults["BarcodeFind"] = barcodeFindModule.defaults.toEncodable()
            defaults["BarcodePick"] = barcodePickModule.defaults.toEncodable()
            defaults["SparkScan"] = sparkScanModule.defaults.toEncodable()
            call.resolve(defaults as PluginCallResultData)
        }
    }

    // MARK: Barcode Capture

    @objc(subscribeBarcodeCaptureListener:)
    func subscribeBarcodeCaptureListener(_ call: CAPPluginCall) {
        barcodeCaptureModule.addListener()
        call.resolve()
    }

    @objc(finishBarcodeCaptureDidScan:)
    func finishBarcodeCaptureDidScan(_ call: CAPPluginCall) {
        barcodeCaptureModule.finishDidScan(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(finishBarcodeCaptureDidUpdateSession:)
    func finishBarcodeCaptureDidUpdateSession(_ call: CAPPluginCall) {
        barcodeCaptureModule.finishDidUpdateSession(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(resetBarcodeCaptureSession:)
    func resetBarcodeCaptureSession(_ call: CAPPluginCall) {
        barcodeCaptureModule.resetSession(frameSequenceId: nil)
        call.resolve()
    }

    // MARK: Barcode Batch

    @objc(subscribeBarcodeBatchListener:)
    func subscribeBarcodeBatchListener(_ call: CAPPluginCall) {
        barcodeBatchModule.addBarcodeBatchListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeBatchListener:)
    func unsubscribeBarcodeBatchListener(_ call: CAPPluginCall) {
        barcodeBatchModule.removeBarcodeBatchListener()
        call.resolve()
    }

    @objc(finishBarcodeBatchDidUpdateSession:)
    func finishBarcodeBatchDidUpdateSession(_ call: CAPPluginCall) {
        barcodeBatchModule.finishDidUpdateSession(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(subscribeBarcodeBatchBasicOverlayListener:)
    func subscribeBarcodeBatchBasicOverlayListener(_ call: CAPPluginCall) {
        barcodeBatchModule.addBasicOverlayListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeBatchBasicOverlayListener:)
    func unsubscribeBarcodeBatchBasicOverlayListener(_ call: CAPPluginCall) {
        barcodeBatchModule.removeBasicOverlayListener()
        call.resolve()
    }

    @objc(subscribeBarcodeBatchAdvancedOverlayListener:)
    func subscribeBarcodeBatchAdvancedOverlayListener(_ call: CAPPluginCall) {
        barcodeBatchModule.addAdvancedOverlayListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeBatchAdvancedOverlayListener:)
    func unsubscribeBarcodeBatchAdvancedOverlayListener(_ call: CAPPluginCall) {
        barcodeBatchModule.removeAdvancedOverlayListener()
        call.resolve()
    }

    @objc(finishCallback:)
    func finishCallback(_ call: CAPPluginCall) {
        guard let resultObject = call.getObject("result") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let finishCallbackId = resultObject["finishCallbackID"] else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let result = BarcodeCaptureCallbackResult.from(([
            "finishCallbackID": finishCallbackId,
            "result": resultObject] as NSDictionary).jsonString) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        if result.isForListenerEvent(.didUpdateSessionInBarcodeSelection) {
            barcodeSelectionModule.finishDidUpdate(enabled: result.enabled ?? false)
        } else if result.isForListenerEvent(.didUpdateSelectionInBarcodeSelection) {
            barcodeSelectionModule.finishDidSelect(enabled: result.enabled ?? false)
        } else if result.isForListenerEvent(.brushForTrackedBarcode) {
            guard let brushJson = result.result?.brushJSONString else {
                call.reject(CommandError.invalidJSON.toJSONString())
                return
            }
            barcodeBatchModule.setBasicOverlayBrush(with: brushJson)
        } else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        call.resolve()
    }

    @objc(setBrushForTrackedBarcode:)
    func setBrushForTrackedBarcode(_ call: CAPPluginCall) {
        guard let json = call.options.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        self.barcodeBatchModule.setBasicOverlayBrush(with: json)
        call.resolve()
    }

    @objc(clearTrackedBarcodeBrushes:)
    func clearTrackedBarcodeBrushes(_ call: CAPPluginCall) {
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes()
        call.resolve()
    }

    @objc(setViewForTrackedBarcode:)
    func setViewForTrackedBarcode(_ call: CAPPluginCall) {
        guard let json = try? ViewAndTrackedBarcodeJSON.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewJson = json.view else {
            barcodeBatchModule.setViewForTrackedBarcode(view: nil,
                                                           trackedBarcodeId: json.trackedBarcodeID,
                                                           sessionFrameSequenceId: json.sessionFrameSequenceID)
            return
        }
        let view: TrackedBarcodeView? = dispatchMainSync { TrackedBarcodeView(json: viewJson) }
        barcodeBatchModule.setViewForTrackedBarcode(view: view,
                                                       trackedBarcodeId: json.trackedBarcodeID,
                                                       sessionFrameSequenceId: json.sessionFrameSequenceID)
        call.resolve()
    }

    @objc(setAnchorForTrackedBarcode:)
    func setAnchorForTrackedBarcode(_ call: CAPPluginCall) {
        guard let anchorJson = call.getString("anchor"),
              let identifier = call.getInt("trackedBarcodeID") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.setAnchorForTrackedBarcode(anchorParams: [
            "anchor": anchorJson,
            "identifier": identifier
        ])
        call.resolve()
    }

    @objc(setOffsetForTrackedBarcode:)
    func setOffsetForTrackedBarcode(_ call: CAPPluginCall) {
        guard let offsetJson = call.getString("offset"),
              let identifier = call.getInt("trackedBarcodeID") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.setOffsetForTrackedBarcode(offsetParams: [
            "offset": offsetJson,
            "identifier": identifier
        ])
        call.resolve()
    }

    @objc(clearTrackedBarcodeViews:)
    func clearTrackedBarcodeViews(_ call: CAPPluginCall) {
        self.barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews()
        call.resolve()
    }

    @objc(resetBarcodeBatchSession:)
    func resetBarcodeBatchSession(_ call: CAPPluginCall) {
        barcodeBatchModule.resetSession(frameSequenceId: nil)
        call.resolve()
    }

    // MARK: Barcode Selection

    @objc(subscribeBarcodeSelectionListener:)
    func subscribeBarcodeSelectionListener(_ call: CAPPluginCall) {
        barcodeSelectionModule.addListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeSelectionListener:)
    func unsubscribeBarcodeSelectionListener(_ call: CAPPluginCall) {
        barcodeSelectionModule.removeListener()
        call.resolve()
    }

    @objc(resetBarcodeSelection:)
    func resetBarcodeSelection(_ call: CAPPluginCall) {
        barcodeSelectionModule.resetSelection()
        call.resolve()
    }

    @objc(unfreezeCameraInBarcodeSelection:)
    func unfreezeCameraInBarcodeSelection(_ call: CAPPluginCall) {
        barcodeSelectionModule.unfreezeCamera()
        call.resolve()
    }

    @objc(finishBarcodeSelectionDidSelect:)
    func finishBarcodeSelectionDidSelect(_ call: CAPPluginCall) {
        barcodeSelectionModule.finishDidSelect(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(finishBarcodeSelectionDidUpdateSession:)
    func finishBarcodeSelectionDidUpdateSession(_ call: CAPPluginCall) {
        barcodeSelectionModule.finishDidUpdate(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(getCountForBarcodeInBarcodeSelectionSession:)
    func getCountForBarcodeInBarcodeSelectionSession(_ call: CAPPluginCall) {
        guard let json = try? SelectionIdentifierBarcodeJSON.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        let count = barcodeSelectionModule.getBarcodeCount(selectionIdentifier: json.selectionIdentifier)
        call.resolve([
            "data": count
        ])
    }

    @objc(resetBarcodeSelectionSession:)
    func resetBarcodeSelectionSession(_ call: CAPPluginCall) {
        barcodeSelectionModule.resetLatestSession(frameSequenceId: nil)
        call.resolve()
    }

    @objc(setTextForAimToSelectAutoHint:)
    func setTextForAimToSelectAutoHint(_ call: CAPPluginCall) {
        barcodeSelectionModule.setTextForAimToSelectAutoHint(text: call.getString("text", ""),
                                                             result: CapacitorResult(call))
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

        barcodeSelectionModule.finishBrushForAimedBarcode(brushJson: brushJson,
                                                          selectionIdentifier: selectionIdentifier)
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

        barcodeSelectionModule.finishBrushForTrackedBarcode(brushJson: brushJson,
                                                            selectionIdentifier: selectionIdentifier)
        call.resolve()
    }

    @objc(selectAimedBarcode:)
    func selectAimedBarcode(_ call: CAPPluginCall) {
        barcodeSelectionModule.selectAimedBarcode()
        call.resolve()
    }

    @objc(unselectBarcodes:)
    func unselectBarcodes(_ call: CAPPluginCall) {
        guard let barcodesStr = call.getString("barcodesStr") else {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.unselectBarcodes(barcodesJson: barcodesStr,
                                                result: CapacitorResult(call))
    }

    @objc(setSelectBarcodeEnabled:)
    func setSelectBarcodeEnabled(_ call: CAPPluginCall) {
        guard let barcodesStr = call.getString("barcodesStr") else {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        guard let enabled = call.getBool("enabled") else {
            call.reject("enabled is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.setSelectBarcodeEnabled(barcodesJson: barcodesStr,
                                                       enabled: enabled,
                                                       result: CapacitorResult(call))
    }

    @objc(increaseCountForBarcodes:)
    func increaseCountForBarcodes(_ call: CAPPluginCall) {
        guard let barcodesStr = call.getString("barcodesStr") else {
            call.reject("barcodesStr is missing in the call parameters.")
            return
        }
        barcodeSelectionModule.increaseCountForBarcodes(barcodesJson: barcodesStr,
                                                        result: CapacitorResult(call))
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
        barcodeCountModule.addBarcodeCountListener()
        call.resolve()
    }

    @objc(registerBarcodeCountViewListener:)
    func registerBarcodeCountViewListener(_ call: CAPPluginCall) {
        barcodeCountModule.addBarcodeCountViewListener(result: CapacitorResult(call))
    }

    @objc(registerBarcodeCountViewUiListener:)
    func registerBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        barcodeCountModule.addBarcodeCountViewUiListener(result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeCountListener:)
    func unregisterBarcodeCountListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountListener()
        call.resolve()
    }

    @objc(unregisterBarcodeCountViewListener:)
    func unregisterBarcodeCountViewListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountViewListener(result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeCountViewUiListener:)
    func unregisterBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountViewUiListener(result: CapacitorResult(call))
    }

    @objc(setViewPositionAndSize:)
    func setViewPosiztionAndSize(_ call: CAPPluginCall) {
        dispatchMainSync {
            let jsonObject = call.getObject("position")
            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject as Any) else {
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

    @objc(showView:)
    func show(_ call: CAPPluginCall) {
        dispatchMainSync {
            guard let barcodeCountView = self.barcodeCountViewHandler.barcodeCountView else {
                call.reject(CommandError.noViewToBeShown.toJSONString())
                return
            }

            barcodeCountView.isHidden = false

            call.resolve()
        }
    }

    @objc(hideView:)
    func hideView(_ call: CAPPluginCall) {
        dispatchMainSync {
            guard let barcodeCountView = barcodeCountViewHandler.barcodeCountView else {
                call.reject(CommandError.noViewToBeHidden.toJSONString())
                return
            }

            barcodeCountView.isHidden = true

            call.resolve()
        }
    }

    @objc(resetBarcodeCount:)
    func resetBarcodeCount(_ call: CAPPluginCall) {
        barcodeCountModule.resetBarcodeCount()
        call.resolve()
    }

    @objc(createView:)
    func createView(_ call: CAPPluginCall) {
        guard let viewJson = call.options.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.addViewFromJson(parent: barcodeCountViewHandler.webView,
                                           viewJson: viewJson,
                                           result: CapacitorResult(call))
        barcodeCountViewHandler.barcodeCountView = barcodeCountModule.barcodeCountView
    }

    @objc(updateView:)
    func updateView(_ call: CAPPluginCall) {
        guard let _ = barcodeCountViewHandler.barcodeCountView,
              let viewJson = call.getString("BarcodeCountView") else {
            call.reject(CommandError.noBarcodeCountView.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCountView(viewJson: viewJson, result: CapacitorResult(call))
    }

    @objc(updateMode:)
    func updateMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getString("BarcodeCount") else {
            call.reject(CommandError.noBarcodeCountView.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCount(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(resetBarcodeCountSession:)
    func resetBarcodeCountSession(_ call: CAPPluginCall) {
        barcodeCountModule.resetBarcodeCountSession(frameSequenceId: nil)
        call.resolve()
    }

    @objc(startScanningPhase:)
    func startScanningPhase(_ call: CAPPluginCall) {
        barcodeCountModule.startScanningPhase()
        call.resolve()
    }

    @objc(endScanningPhase:)
    func endScanningPhase(_ call: CAPPluginCall) {
        barcodeCountModule.endScanningPhase()
        call.resolve()
    }

    @objc(clearBarcodeCountViewHighlights:)
    func clearBarcodeCountViewHighlights(_ call: CAPPluginCall) {
        barcodeCountModule.clearHighlights()
        call.resolve()
    }

    @objc(setBarcodeCountCaptureList:)
    func setBarcodeCountCaptureList(_ call: CAPPluginCall) {
        guard let barcodesArray = call.options["TargetBarcodes"] as? [[String: Any]],
              let barcodesData = try? JSONSerialization.data(withJSONObject: barcodesArray),
              let barcodes = String(data: barcodesData, encoding: .utf8) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.setBarcodeCountCaptureList(barcodesJson: barcodes)
        call.resolve()
    }

    @objc(finishBarcodeCountListenerOnScan:)
    func finishBarcodeCountListenerOnScan(_ call: CAPPluginCall) {
        barcodeCountModule.finishOnScan(enabled: true)
        call.resolve()
    }

    @objc(finishBarcodeCountViewListenerBrushForRecognizedBarcode:)
    func finishBarcodeCountViewListenerBrushForRecognizedBarcode(_ call: CAPPluginCall) {
        guard let brushJson = call.options["brush"] as? String? else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }
        let brush = brushJson.flatMap { Brush(jsonString: $0) }

        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush: brush,
                                                                trackedBarcodeId: trackedBarcodeId,
                                                                result: CapacitorResult(call))
    }

    @objc(finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList:)
    func finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList(_ call: CAPPluginCall) {
        guard let brushJson = call.options["brush"] as? String? else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }

        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush: brush,
                                                                         trackedBarcodeId: trackedBarcodeId,
                                                                         result: CapacitorResult(call))
    }

    @objc(finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode:)
    func finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode(_ call: CAPPluginCall) {
        guard let brushJson = call.options["brush"] as? String? else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }

        let brush = brushJson.flatMap { Brush(jsonString: $0) }
        barcodeCountModule.finishBrushForUnrecognizedBarcodeEvent(brush: brush,
                                                                  trackedBarcodeId: trackedBarcodeId,
                                                                  result: CapacitorResult(call))
    }

    @objc(setBarcodeFindModeEnabledState:)
    func setBarcodeFindModeEnabledState(_ call: CAPPluginCall) {
        barcodeFindModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(setBarcodeTransformer:)
    func setBarcodeTransformer(_ call: CAPPluginCall) {
        barcodeFindModule.setBarcodeFindTransformer(result: CapacitorResult(call))
    }


    @objc(submitBarcodeFindTransformerResult:)
    func submitBarcodeFindTransformerResult(_ call: CAPPluginCall) {
        guard let transformedBarcode = call.getString("transformedBarcode") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.submitBarcodeFindTransformerResult(
            transformedData: transformedBarcode,
            result: CapacitorResult(call)
        )
    }

    @objc(updateBarcodeFindFeedback:)
    func updateBarcodeFindFeedback(_ call: CAPPluginCall) {
        guard let feedbackJson = call.getString("feedbackJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeFindModule.updateFeedback(
            feedbackJson: feedbackJson,
            result: CapacitorResult(call)
        )
    }

    @objc(getSpatialMap:)
    func getSpatialMap(_ call: CAPPluginCall) {
        call.resolve(["data": barcodeCountModule.getSpatialMap()?.jsonString as Any])
    }

    @objc(getSpatialMapWithHints:)
    func getSpatialMapWithHints(_ call: CAPPluginCall) {
        guard let expectedNumberOfRows = call.getInt("expectedNumberOfRows") else {
            call.reject("expectedNumberOfRows is missing in the function parameters.")
            return
        }

        guard let expectedNumberOfColumns = call.getInt("expectedNumberOfColumns") else {
            call.reject("expectedNumberOfColumns is missing in the function parameters.")
            return
        }

        let map = barcodeCountModule.getSpatialMap(expectedNumberOfRows: expectedNumberOfRows,
                                         expectedNumberOfColumns: expectedNumberOfColumns)
        call.resolve(["data": map?.jsonString as Any])
    }

    @objc(setBarcodeCountModeEnabledState:)
    func setBarcodeCountModeEnabledState(_ call: CAPPluginCall) {
        barcodeCountModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(updateBarcodeCountFeedback:)
    func updateBarcodeCountFeedback(_ call: CAPPluginCall) {
        if let feedbackJson = call.getString("feedbackJson") {
            barcodeCountModule.updateFeedback(feedbackJson: feedbackJson, result: CapacitorResult(call))
            return
        }

        call.reject("No feedbackJson was provided for the function.")
    }

    @objc(setBarcodeBatchModeEnabledState:)
    func setBarcodeBatchModeEnabledState(_ call: CAPPluginCall) {
        barcodeBatchModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(setBarcodeSelectionModeEnabledState:)
    func setBarcodeSelectionModeEnabledState(_ call: CAPPluginCall) {
        barcodeSelectionModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(setBarcodeCaptureModeEnabledState:)
    func setBarcodeCaptureModeEnabledState(_ call: CAPPluginCall) {
        barcodeCaptureModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    // MARK: BarcodeFind

    @objc(createFindView:)
    func createFindView(_ call: CAPPluginCall) {
        guard let viewJson = call.options.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        dispatchMainSync {
            barcodeFindModule.addViewToContainer(container: barcodeFindViewHandler.webView,
                                                 jsonString: viewJson,
                                                 result: CapacitorResult(call))
            barcodeFindViewHandler.barcodeFindView = barcodeFindModule.barcodeFindView
        }
    }

    @objc(updateFindView:)
    func updateFindView(_ call: CAPPluginCall) {
        do {
            if let viewJson = String(
                data: try JSONSerialization.data(withJSONObject: call.options["View"] as! [String: Any]),
                encoding: .utf8)
            {
                barcodeFindModule.updateBarcodeFindView(viewJson: viewJson,
                                                        result: CapacitorResult(call))
            }
        } catch {
            call.reject("Error serializing 'View' to JSON: \(error)")
        }
    }

    @objc(removeFindView:)
    func removeFindView(_ call: CAPPluginCall) {
        barcodeFindViewHandler.barcodeFindView = nil
        barcodeFindModule.removeBarcodeFindView(result: CapacitorResult(call))
    }

    @objc(updateFindMode:)
    func updateFindMode(_ call: CAPPluginCall) {
        let modeJson = call.options["BarcodeFind"] as! String
        barcodeFindModule.updateBarcodeFindMode(modeJson: modeJson,
                                                result: CapacitorResult(call))
    }

    @objc(registerBarcodeFindListener:)
    func registerBarcodeFindListener(_ call: CAPPluginCall) {
        barcodeFindModule.addBarcodeFindListener(result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeFindListener:)
    func unregisterBarcodeFindListener(_ call: CAPPluginCall) {
        barcodeFindModule.removeBarcodeFindListener(result: CapacitorResult(call))
    }

    @objc(registerBarcodeFindViewListener:)
    func registerBarcodeFindViewListener(_ call: CAPPluginCall) {
        barcodeFindModule.addBarcodeFindViewListener(result: CapacitorResult(call))
    }

    @objc(unregisterBarcodeFindViewListener:)
    func unregisterBarcodeFindViewListener(_ call: CAPPluginCall) {
        barcodeFindModule.removeBarcodeFindViewListener(result: CapacitorResult(call))
    }

    @objc(barcodeFindViewOnPause:)
    func barcodeFindViewOnPause(_ call: CAPPluginCall) {
        // No iOS implementation
        call.resolve()
    }

    @objc(barcodeFindViewOnResume:)
    func barcodeFindViewOnResume(_ call: CAPPluginCall) {
        barcodeFindModule.prepareSearching(result: CapacitorResult(call))
    }

    @objc(barcodeFindSetItemList:)
    func barcodeFindSetItemList(_ call: CAPPluginCall) {
        let json = call.options["BarcodeFindItemList"] as! String
        barcodeFindModule.setItemList(barcodeFindItemsJson: json, result: CapacitorResult(call))
    }

    @objc(barcodeFindViewStopSearching:)
    func barcodeFindViewStopSearching(_ call: CAPPluginCall) {
        barcodeFindModule.stopSearching(result: CapacitorResult(call))
    }

    @objc(barcodeFindViewStartSearching:)
    func barcodeFindViewStartSearching(_ call: CAPPluginCall) {
        barcodeFindModule.startSearching(result: CapacitorResult(call))
    }

    @objc(barcodeFindViewPauseSearching:)
    func barcodeFindViewPauseSearching(_ call: CAPPluginCall) {
        barcodeFindModule.pauseSearching(result: CapacitorResult(call))
    }

    @objc(barcodeFindModeStart:)
    func barcodeFindModeStart(_ call: CAPPluginCall) {
        barcodeFindModule.startMode(result: CapacitorResult(call))
    }

    @objc(barcodeFindModePause:)
    func barcodeFindModePause(_ call: CAPPluginCall) {
        barcodeFindModule.pauseMode(result: CapacitorResult(call))
    }

    @objc(barcodeFindModeStop:)
    func barcodeFindModeStop(_ call: CAPPluginCall) {
        barcodeFindModule.stopMode(result: CapacitorResult(call))
    }

    @objc(showFindView:)
    func showFindView(_ call: CAPPluginCall) {
        dispatchMainSync {
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
        dispatchMainSync {
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
        dispatchMainSync {
            barcodePickModule.addViewToContainer(container: barcodePickViewHandler.webView,
                                                 jsonString: viewJson,
                                                 result: CapacitorResult(call))
            barcodePickViewHandler.barcodePickView = barcodePickModule.barcodePickView
        }
    }

    @objc(updateePickView:)
    func updatePickView(_ call: CAPPluginCall) {
        let viewJson = call.options["BarcodePickView"] as! String
        barcodePickModule.updateView(viewJson: viewJson,
                                     result: CapacitorResult(call))

    }

    @objc(setPickViewPositionAndSize:)
    func setPickViewPositionAndSize(_ call: CAPPluginCall) {
        dispatchMainSync {
            let jsonObject = call.getObject("position")
            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject as Any) else {
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

    @objc(addActionListener:)
    func addActionListener(_ call: CAPPluginCall) {
        barcodePickModule.addActionListener()
        call.resolve()
    }

    @objc(removeActionListener:)
    func removeActionListener(_ call: CAPPluginCall) {
        barcodePickModule.removeActionListener()
        call.resolve()
    }

    @objc(addScanningListener:)
    func addScanningListener(_ call: CAPPluginCall) {
        barcodePickModule.addScanningListener()
        call.resolve()
    }

    @objc(removeScanningListener:)
    func removeScanningListener(_ call: CAPPluginCall) {
        barcodePickModule.removeScanningListener()
        call.resolve()
    }

    @objc(addViewListener:)
    func addViewListener(_ call: CAPPluginCall) {
        barcodePickModule.addViewListener()
        call.resolve()
    }

    @objc(removeViewListener:)
    func removeViewListener(_ call: CAPPluginCall) {
        barcodePickModule.removeViewListener()
        call.resolve()
    }

    @objc(registerBarcodePickViewUiListener:)
    func registerBarcodePickViewUiListener(_ call: CAPPluginCall) {
        barcodePickModule.addViewUiListener()
        call.resolve()
    }

    @objc(unregisterBarcodePickViewUiListener:)
    func unregisterBarcodePickViewUiListener(_ call: CAPPluginCall) {
        barcodePickModule.removeViewUiListener()
        call.resolve()
    }

    @objc(finishOnProductIdentifierForItems:)
    func finishOnProductIdentifierForItems(_ call: CAPPluginCall) {
        let itemsJson = call.options["itemsJson"] as! String
        barcodePickModule.finishProductIdentifierForItems(barcodePickProductProviderCallbackItemsJson: itemsJson)
        call.resolve()
    }

    @objc(viewStop:)
    func viewStop(_ call: CAPPluginCall) {
        barcodePickModule.viewPause()
        call.resolve()
    }

    @objc(viewStart:)
    func viewStart(_ call: CAPPluginCall) {
        barcodePickModule.viewStart()
        call.resolve()
    }

    @objc(viewFreeze:)
    func viewFreeze(_ call: CAPPluginCall) {
        barcodePickModule.viewFreeze()
        call.resolve()
    }

    @objc(finishPickAction:)
    func finishPickAction(_ call: CAPPluginCall) {
        guard let result = call.options["result"] as? Bool,
              let code = call.options["code"] as? String else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodePickModule.finishPickAction(data: code, result: result)
        call.resolve()
    }

    @objc(updateBarcodeCaptureOverlay:)
    func updateBarcodeCaptureOverlay(_ call: CAPPluginCall) {
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCaptureModule.updateOverlay(overlayJson: overlayJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeCaptureMode:)
    func updateBarcodeCaptureMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getString("modeJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCaptureModule.updateModeFromJson(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(applyBarcodeCaptureModeSettings:)
    func applyBarcodeCaptureModeSettings(_ call: CAPPluginCall) {
        guard let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCaptureModule.applyModeSettings(modeSettingsJson: modeSettingsJson, result: CapacitorResult(call))
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
        guard let modeJson = call.getString("modeJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.updateModeFromJson(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(applyBarcodeSelectionModeSettings:)
    func applyBarcodeSelectionModeSettings(_ call: CAPPluginCall) {
        guard let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.applyModeSettings(modeSettingsJson: modeSettingsJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeSelectionFeedback:)
    func updateBarcodeSelectionFeedback(_ call: CAPPluginCall) {
        guard let feedbackJson = call.getString("feedbackJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeSelectionModule.updateFeedback(feedbackJson: feedbackJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeBatchBasicOverlay:)
    func updateBarcodeBatchBasicOverlay(_ call: CAPPluginCall) {
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.updateBasicOverlay(overlayJson: overlayJson, result: CapacitorResult(call))
    }

    @objc(updateBarcodeBatchAdvancedOverlay:)
    func updateBarcodeBatchAdvancedOverlay(_ call: CAPPluginCall) {
        guard let overlayJson = call.getString("overlayJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.updateAdvancedOverlay(overlayJson: overlayJson, result: CapacitorResult(call))
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
        guard let modeSettingsJson = call.getString("modeSettingsJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeBatchModule.applyModeSettings(modeSettingsJson: modeSettingsJson, result: CapacitorResult(call))
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
        dispatchMainSync {
            sparkScanModule.addViewToContainer(
                container,
                jsonString: viewJson,
                result: CapacitorResult(call)
            )
        }
    }

    @objc(disposeSparkScanView:)
    func disposeSparkScanView(_ call: CAPPluginCall) {
        dispatchMainSync {
            sparkScanModule.disposeView()
        }
        call.resolve()
    }

    @objc(updateSparkScanView:)
    func updateSparkScanView(_ call: CAPPluginCall) {
        guard let viewJson = call.getObject("View")?.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        dispatchMainSync {
            sparkScanModule.updateView(viewJson: viewJson, result: CapacitorResult(call))
        }
    }

    @objc(updateSparkScanMode:)
    func updateSparkScanMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getObject("SparkScan")?.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        sparkScanModule.updateMode(modeJson: modeJson, result: CapacitorResult(call))
    }

    @objc(showSparkScanView:)
    func showSparkScanView(_ call: CAPPluginCall) {
        dispatchMainSync {
            sparkScanModule.sparkScanView?.isHidden = false
        }
    }

    @objc(hideSparkScanView:)
    func hideSparkScanView(_ call: CAPPluginCall) {
        dispatchMainSync {
            sparkScanModule.sparkScanView?.isHidden = true
        }
    }

    @objc(registerSparkScanListenerForEvents:)
    func registerSparkScanListenerForEvents(_ call: CAPPluginCall) {
        sparkScanModule.addSparkScanListener()
        call.resolve()
    }

    @objc(unregisterSparkScanListenerForEvents:)
    func unregisterSparkScanListenerForEvents(_ call: CAPPluginCall) {
        sparkScanModule.removeSparkScanListener()
        call.resolve()
    }

    @objc(setSparkScanModeEnabledState:)
    func setSparkScanModeEnabledState(_ call: CAPPluginCall) {
        sparkScanModule.setModeEnabled(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(finishSparkScanDidUpdateSessionCallback:)
    func finishSparkScanDidUpdateSessionCallback(_ call: CAPPluginCall) {
        sparkScanModule.finishDidUpdateSession(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(finishSparkScanDidScanCallback:)
    func finishSparkScanDidScanCallback(_ call: CAPPluginCall) {
        sparkScanModule.finishDidScan(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(registerSparkScanViewListenerEvents:)
    func registerSparkScanViewListenerEvents(_ call: CAPPluginCall) {
        sparkScanModule.addSparkScanViewUiListener()
        call.resolve()
    }

    @objc(unregisterSparkScanViewListenerEvents:)
    func unregisterSparkScanViewListenerEvents(_ call: CAPPluginCall) {
        sparkScanModule.removeSparkScanViewUiListener()
        call.resolve()
    }

    @objc(prepareSparkScanViewScanning:)
    func prepareSparkScanViewScanning(_ call: CAPPluginCall) {
        sparkScanModule.prepareScanning(result: CapacitorResult(call))
    }

    @objc(startSparkScanViewScanning:)
    func startSparkScanViewScanning(_ call: CAPPluginCall) {
        sparkScanModule.startScanning(result: CapacitorResult(call))
    }

    @objc(pauseSparkScanViewScanning:)
    func pauseSparkScanViewScanning(_ call: CAPPluginCall) {
        sparkScanModule.pauseScanning()
        call.resolve()
    }

    @objc(stopSparkScanViewScanning:)
    func stopSparkScanViewScanning(_ call: CAPPluginCall) {
        sparkScanModule.stopScanning()
        call.resolve()
    }

    @objc(addSparkScanFeedbackDelegate:)
    func addSparkScanFeedbackDelegate(_ call: CAPPluginCall) {
        sparkScanModule.addFeedbackDelegate(result: CapacitorResult(call))
    }

    @objc(removeSparkScanFeedbackDelegate:)
    func removeSparkScanFeedbackDelegate(_ call: CAPPluginCall) {
        sparkScanModule.removeFeedbackDelegate(result: CapacitorResult(call))
    }

    @objc(submitSparkScanFeedbackForBarcode:)
    func submitSparkScanFeedbackForBarcode(_ call: CAPPluginCall) {
        sparkScanModule.submitFeedbackForBarcode(
            feedbackJson: call.getString("feedbackJson"),
            result: CapacitorResult(call))
    }

    @objc(showToast:)
    func showToast(_ call: CAPPluginCall) {
        guard let text = call.getString("text") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        sparkScanModule.showToast(text: text, result: CapacitorResult(call))
    }

    @objc(createBarcodeGenerator:)
    func createBarcodeGenerator(_ call: CAPPluginCall) {
        guard let barcodeGeneratorJson = call.getString("barcodeGeneratorJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeGeneratorModule.createGenerator(generatorJson: barcodeGeneratorJson, result: CapacitorResult(call))
    }

    @objc(generateFromBase64EncodedData:)
    func generateFromBase64EncodedData(_ call: CAPPluginCall) {
        guard let generatorId = call.getString("generatorId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let data = call.getString("data") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let imageWidth = call.getInt("imageWidth") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeGeneratorModule.generateFromBase64EncodedData(
            generatorId: generatorId,
            data: data,
            imageWidth: imageWidth,
            result: CapacitorResult(call)
        )
    }

    @objc(generateFromString:)
    func generateFromString(_ call: CAPPluginCall) {
        guard let generatorId = call.getString("generatorId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let text = call.getString("text") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let imageWidth = call.getInt("imageWidth") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeGeneratorModule.generate(
            generatorId: generatorId,
            text: text,
            imageWidth: imageWidth,
            result: CapacitorResult(call)
        )
    }

    @objc(disposeBarcodeGenerator:)
    func disposeBarcodeGenerator(_ call: CAPPluginCall) {
        guard let generatorId = call.getString("generatorId") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeGeneratorModule.disposeGenerator(generatorId: generatorId, result: CapacitorResult(call))
    }
}
