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
    private var barcodeTrackingModule: BarcodeTrackingModule!
    private var barcodeSelectionModule: BarcodeSelectionModule!
    private var barcodeCountModule: BarcodeCountModule!

    private var barcodeCountViewHandler: BarcodeCountViewHandler!

    override func load() {
        let emitter = CapacitorEventEmitter(with: self)
        barcodeCaptureModule = BarcodeCaptureModule(
            barcodeCaptureListener: FrameworksBarcodeCaptureListener(emitter: emitter)
        )
        barcodeTrackingModule = BarcodeTrackingModule(
            barcodeTrackingListener: FrameworksBarcodeTrackingListener(emitter: emitter),
            barcodeTrackingBasicOverlayListener: FrameworksBarcodeTrackingBasicOverlayListener(emitter: emitter),
            barcodeTrackingAdvancedOverlayListener: FrameworksBarcodeTrackingAdvancedOverlayListener(emitter: emitter),
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
            viewUiListener: FrameworksBarcodeCountViewUIListener(emitter: emitter)
        )
        barcodeModule.didStart()
        barcodeCaptureModule.didStart()
        barcodeTrackingModule.didStart()
        barcodeSelectionModule.didStart()
        barcodeCountModule.didStart()

        barcodeCountViewHandler = BarcodeCountViewHandler(relativeTo: webView!)
    }

    func onReset() {
        barcodeModule.didStop()
        barcodeCaptureModule.didStop()
        barcodeTrackingModule.didStop()
        barcodeSelectionModule.didStop()
        barcodeCountModule.didStop()
    }

    @objc(getDefaults:)
    func getDefaults(_ call: CAPPluginCall) {
        dispatchMainSync {
            var defaults = barcodeModule.defaults.toEncodable()
            defaults["BarcodeCapture"] = barcodeCaptureModule.defaults.toEncodable()
            defaults["BarcodeTracking"] = barcodeTrackingModule.defaults.toEncodable()
            defaults["BarcodeSelection"] = barcodeSelectionModule.defaults.toEncodable()
            defaults["BarcodeCount"] = barcodeCountModule.defaults.toEncodable()
            call.resolve(defaults as PluginCallResultData)
        }
    }

    // MARK: Listeners

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

    @objc(subscribeBarcodeTrackingListener:)
    func subscribeBarcodeTrackingListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.addBarcodeTrackingListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeTrackingListener:)
    func unsubscribeBarcodeTrackingListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.removeBarcodeTrackingListener()
        call.resolve()
    }

    @objc(finishBarcodeTrackingDidUpdateSession:)
    func finishBarcodeTrackingDidUpdateSession(_ call: CAPPluginCall) {
        barcodeTrackingModule.finishDidUpdateSession(enabled: call.getBool("enabled", false))
        call.resolve()
    }

    @objc(subscribeBarcodeTrackingBasicOverlayListener:)
    func subscribeBarcodeTrackingBasicOverlayListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.addBasicOverlayListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeTrackingBasicOverlayListener:)
    func unsubscribeBarcodeTrackingBasicOverlayListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.removeBasicOverlayListener()
        call.resolve()
    }

    @objc(subscribeBarcodeTrackingAdvancedOverlayListener:)
    func subscribeBarcodeTrackingAdvancedOverlayListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.addAdvancedOverlayListener()
        call.resolve()
    }

    @objc(unsubscribeBarcodeTrackingAdvancedOverlayListener:)
    func unsubscribeBarcodeTrackingAdvancedOverlayListener(_ call: CAPPluginCall) {
        barcodeTrackingModule.removeAdvancedOverlayListener()
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
            barcodeTrackingModule.setBasicOverlayBrush(with: brushJson)
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
        self.barcodeTrackingModule.setBasicOverlayBrush(with: json)
        call.resolve()
    }

    @objc(clearTrackedBarcodeBrushes:)
    func clearTrackedBarcodeBrushes(_ call: CAPPluginCall) {
        barcodeTrackingModule.clearBasicOverlayTrackedBarcodeBrushes()
        call.resolve()
    }

    @objc(setViewForTrackedBarcode:)
    func setViewForTrackedBarcode(_ call: CAPPluginCall) {
        guard let json = try? ViewAndTrackedBarcodeJSON.fromJSONObject(call.options!) else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        guard let viewJson = json.view else {
            barcodeTrackingModule.setViewForTrackedBarcode(view: nil,
                                                           trackedBarcodeId: json.trackedBarcodeID,
                                                           sessionFrameSequenceId: json.sessionFrameSequenceID)
            return
        }
        let view: TrackedBarcodeView? = dispatchMainSync { TrackedBarcodeView(json: viewJson) }
        barcodeTrackingModule.setViewForTrackedBarcode(view: view,
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
        barcodeTrackingModule.setAnchorForTrackedBarcode(anchorParams: [
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
        barcodeTrackingModule.setOffsetForTrackedBarcode(offsetParams: [
            "offset": offsetJson,
            "identifier": identifier
        ])
        call.resolve()
    }

    @objc(clearTrackedBarcodeViews:)
    func clearTrackedBarcodeViews(_ call: CAPPluginCall) {
        self.barcodeTrackingModule.clearAdvancedOverlayTrackedBarcodeViews()
        call.resolve()
    }

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
        barcodeCountModule.addBarcodeCountViewListener()
        call.resolve()
    }

    @objc(registerBarcodeCountViewUiListener:)
    func registerBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        barcodeCountModule.addBarcodeCountViewUiListener()
        call.resolve()
    }

    @objc(unregisterBarcodeCountListener:)
    func unregisterBarcodeCountListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountListener()
        call.resolve()
    }

    @objc(unregisterBarcodeCountViewListener:)
    func unregisterBarcodeCountViewListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountViewListener()
        call.resolve()
    }

    @objc(unregisterBarcodeCountViewUiListener:)
    func unregisterBarcodeCountViewUIListener(_ call: CAPPluginCall) {
        barcodeCountModule.removeBarcodeCountViewUiListener()
        call.resolve()
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

    @objc(resetBarcodeCaptureSession:)
    func resetBarcodeCaptureSession(_ call: CAPPluginCall) {
        barcodeCaptureModule.resetSession(frameSequenceId: nil)
        call.resolve()
    }

    @objc(resetBarcodeTrackingSession:)
    func resetBarcodeTrackingSession(_ call: CAPPluginCall) {
        barcodeTrackingModule.resetSession(frameSequenceId: nil)
        call.resolve()
    }

    @objc(resetBarcodeSelectionSession:)
    func resetBarcodeSelectionSession(_ call: CAPPluginCall) {
        barcodeSelectionModule.resetLatestSession(frameSequenceId: nil)
        call.resolve()
    }

    @objc(createView:)
    func createView(_ call: CAPPluginCall) {
        guard let viewJson = call.options.jsonString else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }
        barcodeCountModule.addViewFromJson(parent: barcodeCountViewHandler.webView,
                                           viewJson: viewJson)
        barcodeCountViewHandler.barcodeCountView = barcodeCountModule.barcodeCountView
        call.resolve()
    }

    @objc(updateView:)
    func updateView(_ call: CAPPluginCall) {
        guard let _ = barcodeCountViewHandler.barcodeCountView,
              let viewJson = call.getString("BarcodeCountView") else {
            call.reject(CommandError.noBarcodeCountView.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCountView(viewJson: viewJson)
        call.resolve()
    }

    @objc(updateMode:)
    func updateMode(_ call: CAPPluginCall) {
        guard let modeJson = call.getString("BarcodeCount") else {
            call.reject(CommandError.noBarcodeCountView.toJSONString())
            return
        }
        barcodeCountModule.updateBarcodeCount(modeJson: modeJson)
        call.resolve()
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
        guard let brushJson = call.options["brush"] as? String else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }
        let brush = Brush(jsonString: brushJson)

        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush: brush,
                                                                trackedBarcodeId: trackedBarcodeId)
        call.resolve()
    }

    @objc(finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList:)
    func finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList(_ call: CAPPluginCall) {
        guard let brushJson = call.options["brush"] as? String else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }

        let brush = Brush(jsonString: brushJson)
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush: brush,
                                                                         trackedBarcodeId: trackedBarcodeId)
        call.resolve()
    }

    @objc(finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode:)
    func finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode(_ call: CAPPluginCall) {
        guard let brushJson = call.options["brush"] as? String else { call.reject("Invalid brush json received."); return }
        guard let trackedBarcodeIdString = call.options["trackedBarcodeId"] as? String,
              let trackedBarcodeId = Int(trackedBarcodeIdString)
        else { call.reject("Invalid tracked barcode id received."); return }

        let brush = Brush(jsonString: brushJson)
        barcodeCountModule.finishBrushForUnrecognizedBarcodeEvent(brush: brush,
                                                                  trackedBarcodeId: trackedBarcodeId)
        call.resolve()
    }

    @objc(setBarcodeFindModeEnabledState:)
    func setBarcodeFindModeEnabledState(_ call: CAPPluginCall) {
        // TODO: Add barcode find module callback here
        call.resolve()
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

    @objc(setBarcodeTrackingModeEnabledState:)
    func setBarcodeTrackingModeEnabledState(_ call: CAPPluginCall) {
        barcodeTrackingModule.setModeEnabled(enabled: call.getBool("enabled", false))
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
}
