import { TrackedBarcode } from '../Barcode';
import { Capacitor, CapacitorFunction } from './Capacitor';
var BarcodeTrackingBasicOverlayListenerEvent;
(function (BarcodeTrackingBasicOverlayListenerEvent) {
    BarcodeTrackingBasicOverlayListenerEvent["BrushForTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.brushForTrackedBarcode";
    BarcodeTrackingBasicOverlayListenerEvent["DidTapTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.didTapTrackedBarcode";
})(BarcodeTrackingBasicOverlayListenerEvent || (BarcodeTrackingBasicOverlayListenerEvent = {}));
export class BarcodeTrackingBasicOverlayProxy {
    static forOverlay(overlay) {
        const proxy = new BarcodeTrackingBasicOverlayProxy();
        proxy.overlay = overlay;
        proxy.initialize();
        return proxy;
    }
    setBrushForTrackedBarcode(brush, trackedBarcode) {
        return new Promise((resolve, reject) => {
            BarcodeTrackingBasicOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.SetBrushForTrackedBarcode, {
                brush: brush ? JSON.stringify(brush.toJSON()) : null,
                sessionFrameSequenceID: trackedBarcode.sessionFrameSequenceID,
                trackedBarcodeID: trackedBarcode.identifier,
            });
        });
    }
    clearTrackedBarcodeBrushes() {
        return new Promise((resolve, reject) => {
            BarcodeTrackingBasicOverlayProxy.capacitorExec(resolve, reject, CapacitorFunction.ClearTrackedBarcodeBrushes, null);
        });
    }
    subscribeListener() {
        window.Capacitor.Plugins[Capacitor.pluginName][CapacitorFunction.SubscribeBarcodeTrackingBasicOverlayListener]();
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeTrackingBasicOverlayListenerEvent.BrushForTrackedBarcode, this.notifyListeners.bind(this));
        window.Capacitor.Plugins[Capacitor.pluginName]
            .addListener(BarcodeTrackingBasicOverlayListenerEvent.DidTapTrackedBarcode, this.notifyListeners.bind(this));
    }
    notifyListeners(event) {
        var _a, _b;
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case BarcodeTrackingBasicOverlayListenerEvent.BrushForTrackedBarcode:
                if ((_a = this.overlay.listener) === null || _a === void 0 ? void 0 : _a.brushForTrackedBarcode) {
                    const trackedBarcode = TrackedBarcode
                        .fromJSON(JSON.parse(event.trackedBarcode));
                    const brush = this.overlay.listener.brushForTrackedBarcode(this.overlay, trackedBarcode);
                    BarcodeTrackingBasicOverlayProxy.capacitorExec(null, null, CapacitorFunction.SetBrushForTrackedBarcode, {
                        brush: brush ? JSON.stringify(brush.toJSON()) : null,
                        sessionFrameSequenceID: trackedBarcode.sessionFrameSequenceID,
                        trackedBarcodeID: trackedBarcode.identifier,
                    });
                }
                break;
            case BarcodeTrackingBasicOverlayListenerEvent.DidTapTrackedBarcode:
                if ((_b = this.overlay.listener) === null || _b === void 0 ? void 0 : _b.didTapTrackedBarcode) {
                    const trackedBarcode = TrackedBarcode
                        .fromJSON(JSON.parse(event.trackedBarcode));
                    this.overlay.listener.didTapTrackedBarcode(this.overlay, trackedBarcode);
                }
                break;
        }
        return null;
    }
    initialize() {
        this.subscribeListener();
    }
}
BarcodeTrackingBasicOverlayProxy.capacitorExec = Capacitor.exec;
//# sourceMappingURL=BarcodeTrackingBasicOverlayProxy.js.map