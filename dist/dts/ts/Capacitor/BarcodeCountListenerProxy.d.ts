import { BarcodeCountListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeCountListenerProxy implements BarcodeCountListenerProxy {
    private eventEmitter;
    isModeEnabled: () => boolean;
    private didScanListenerHandler;
    private didListSessionUpdateListenerHandler;
    constructor();
    updateMode(barcodeCountJson: string): Promise<void>;
    resetBarcodeCount(): Promise<void>;
    registerBarcodeCountListener(): Promise<void>;
    setModeEnabledState(enabled: boolean): void;
    updateFeedback(feedbackJson: string): void;
    unregisterBarcodeCountListener(): Promise<void>;
    subscribeDidScan(): Promise<void>;
    subscribeDidListSessionUpdate(): Promise<void>;
    finishOnScan(): void;
    startScanningPhase(): void;
    endScanningPhase(): void;
    setBarcodeCountCaptureList(captureListStr: string): void;
    private notifyListeners;
}
