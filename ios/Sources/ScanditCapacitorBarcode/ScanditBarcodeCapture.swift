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
        CAPPluginMethod(name: "setBarcodeCountViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeBarcodeCountView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeFindView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setFindViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createPickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removePickView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setPickViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createSparkScanView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "createBarcodeArView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeBarcodeArView", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setArViewPositionAndSize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "executeBarcode", returnType: CAPPluginReturnPromise),
    ]

    private let barcodeModule = BarcodeModule()
    private var barcodeCaptureModule: BarcodeCaptureModule!
    private var barcodeBatchModule: BarcodeBatchModule!
    private var barcodeSelectionModule: BarcodeSelectionModule!
    private var barcodeCountModule: BarcodeCountModule!
    private var barcodeFindModule: BarcodeFindModule!
    private var barcodePickModule: BarcodePickModule!
    private var sparkScanModule: SparkScanModule!
    private var barcodeGeneratorModule: BarcodeGeneratorModule!
    private var barcodeArModule: BarcodeArModule!

    private var barcodeCountViewHandler: BarcodeCountViewHandler!
    private var barcodeFindViewHandler: BarcodeFindViewHandler!
    private var barcodePickViewHandler: BarcodePickViewHandler!
    private var barcodeArViewHandler: BarcodeArViewHandler!

    override func load() {
        let emitter = CapacitorEventEmitter(with: self)
        DefaultServiceLocator.shared.register(module: barcodeModule)

        barcodeCaptureModule = BarcodeCaptureModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeCaptureModule)

        barcodeBatchModule = BarcodeBatchModule(emitter: emitter, viewFromJsonResolver: nil)
        DefaultServiceLocator.shared.register(module: barcodeBatchModule)

        barcodeSelectionModule = BarcodeSelectionModule(
            emitter: emitter,
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(
                emitter: emitter
            ),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(
                emitter: emitter
            )
        )
        DefaultServiceLocator.shared.register(module: barcodeSelectionModule)

        barcodeCountModule = BarcodeCountModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeCountModule)

        barcodeFindModule = BarcodeFindModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeFindModule)

        barcodePickModule = BarcodePickModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodePickModule)

        sparkScanModule = SparkScanModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: sparkScanModule)

        barcodeGeneratorModule = BarcodeGeneratorModule()
        DefaultServiceLocator.shared.register(module: barcodeGeneratorModule)

        barcodeArModule = BarcodeArModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeArModule)

        barcodeModule.didStart()
        barcodeCaptureModule.didStart()
        barcodeBatchModule.didStart()
        barcodeSelectionModule.didStart()
        barcodeCountModule.didStart()
        barcodeFindModule.didStart()
        barcodePickModule.didStart()
        sparkScanModule.didStart()
        barcodeGeneratorModule.didStart()
        barcodeArModule.didStart()

        guard let webView = webView else {
            fatalError("WebView must be available for view handler initialization")
        }
        barcodeCountViewHandler = BarcodeCountViewHandler(relativeTo: webView)
        barcodeFindViewHandler = BarcodeFindViewHandler(relativeTo: webView)
        barcodePickViewHandler = BarcodePickViewHandler(relativeTo: webView)
        barcodeArViewHandler = BarcodeArViewHandler(relativeTo: webView)
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
        barcodeArModule.didStop()
    }

    @objc(getDefaults:)
    func getDefaults(_ call: CAPPluginCall) {
        dispatchMain {
            let defaults = self.barcodeModule.getDefaults()
            call.resolve(defaults as PluginCallResultData)
        }
    }

    // MARK: Barcode Count

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
        dispatchMain {
            // Dispose the current view in the handler first (removes from view hierarchy synchronously)
            self.barcodeCountViewHandler.disposeCurrentView()
            // Then dispose in the module
            self.barcodeCountModule.disposeBarcodeCountView(viewId: viewId)
            // Set the next topmost view if any
            self.barcodeCountViewHandler.currentBarcodeCountView = self.barcodeCountModule.getTopMostView()
        }
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
                container: self.barcodeFindViewHandler.container,
                jsonString: viewJson,
                result: CapacitorResult(call)
            )
            self.barcodeFindViewHandler.barcodeFindView = self.barcodeFindModule.getViewById(viewId)
        }
    }

    @objc(removeFindView:)
    func removeFindView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }
        dispatchMain {
            // Dispose the current view in the handler first (removes from view hierarchy synchronously)
            self.barcodeFindViewHandler.disposeCurrentView()
            // Then dispose in the module
            self.barcodeFindModule.removeBarcodeFindView(viewId, result: CapacitorResult(call))
        }
    }

    @objc(setFindViewPositionAndSize:)
    func setFindViewPositionAndSize(_ call: CAPPluginCall) {
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

            self.barcodeFindViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

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
            // Dispose the current view in the handler first (removes from view hierarchy synchronously)
            self.barcodePickViewHandler.disposeCurrentView()
            // Then dispose in the module
            self.barcodePickModule.removeView(viewId: viewId, result: CapacitorResult(call))
            // Set the next topmost view if any
            self.barcodePickViewHandler.currentBarcodePickView = self.barcodePickModule.getTopMostView()
        }
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

    // MARK: BarcodeAr

    @objc(createBarcodeArView:)
    func createBarcodeArView(_ call: CAPPluginCall) {
        guard let viewJson = call.getString("viewJson") else {
            call.reject(CommandError.invalidJSON.toJSONString())
            return
        }

        dispatchMain {
            guard let webView = self.webView else {
                call.reject(CommandError.noWebView.toJSONString())
                return
            }

            // Create container view
            let container = UIView()
            container.backgroundColor = .clear

            // Add BarcodeAr view to container via the module
            self.barcodeArModule.addViewToContainer(
                container: container,
                jsonString: viewJson,
                result: CapacitorResult(call)
            )

            // Set up the view handler with the container
            self.barcodeArViewHandler.addBarcodeArViewContainer(container)
        }
    }

    @objc(removeBarcodeArView:)
    func removeBarcodeArView(_ call: CAPPluginCall) {
        guard let viewId = call.getInt("viewId") else {
            call.reject(CommandError.noViewIdParameter.toJSONString())
            return
        }

        dispatchMain {

            self.barcodeArViewHandler.disposeCurrentView()
            self.barcodeArModule.removeView(viewId: viewId, result: CapacitorResult(call))
            call.resolve()
        }
    }

    @objc(setArViewPositionAndSize:)
    func setArViewPositionAndSize(_ call: CAPPluginCall) {
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

            self.barcodeArViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

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

    /// Single entry point for all Barcode operations.
    /// Routes method calls to the appropriate command via the shared command factory.
    @objc(executeBarcode:)
    func executeBarcode(_ call: CAPPluginCall) {
        guard let moduleName = call.getString("moduleName") else {
            call.reject("Missing moduleName parameter")
            return
        }

        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            call.reject("Unable to retrieve the CoreModule from the locator.")
            return
        }

        guard let targetModule = DefaultServiceLocator.shared.resolve(clazzName: moduleName) else {
            call.reject("Unable to retrieve the \(moduleName) from the locator.")
            return
        }

        let result = CapacitorResult(call)
        let handled = coreModule.execute(
            CapacitorMethodCall(call),
            result: result,
            module: targetModule
        )

        if !handled {
            let methodName = call.getString("methodName") ?? "unknown"
            call.reject("Unknown Core method: \(methodName)")
        }
    }
}
