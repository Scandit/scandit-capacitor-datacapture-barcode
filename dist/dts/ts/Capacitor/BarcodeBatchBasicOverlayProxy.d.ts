import { BarcodeBatchBasicOverlayProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeBatchBasicOverlayProxy implements BarcodeBatchBasicOverlayProxy {
    private static capacitorExec;
    private eventEmitter;
    constructor();
    updateBarcodeBatchBasicOverlay(overlayJson: string): Promise<void>;
    setBrushForTrackedBarcode(brushJson: string | null, trackedBarcodeIdentifer: number, _sessionFrameSequenceID: number | null): Promise<void>;
    clearTrackedBarcodeBrushes(): Promise<void>;
    registerListenerForBasicOverlayEvents(): void;
    unregisterListenerForBasicOverlayEvents(): void;
    subscribeBrushForTrackedBarcode(): void;
    subscribeDidTapTrackedBarcode(): void;
    private notifyListeners;
}
