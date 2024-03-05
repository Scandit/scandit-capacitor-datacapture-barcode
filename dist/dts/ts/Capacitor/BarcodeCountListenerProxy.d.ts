import { BarcodeCountListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeCountListenerProxy implements BarcodeCountListenerProxy {
    private eventEmitter;
    isModeEnabled: () => boolean;
    constructor();
    updateMode(barcodeCountJson: string): Promise<void>;
    resetBarcodeCount(): Promise<void>;
    registerBarcodeCountListener(): Promise<void>;
    setModeEnabledState(enabled: boolean): void;
    unregisterBarcodeCountListener(): Promise<void>;
    subscribeDidScan(): void;
    subscribeDidListSessionUpdate(): void;
    finishOnScan(): void;
    startScanningPhase(): void;
    endScanningPhase(): void;
    setBarcodeCountCaptureList(captureListStr: string): void;
    private notifyListeners;
}
