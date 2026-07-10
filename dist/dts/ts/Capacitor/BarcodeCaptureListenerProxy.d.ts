import { BarcodeCaptureListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeCaptureListenerProxy implements BarcodeCaptureListenerProxy {
    private eventEmitter;
    isModeEnabled: () => boolean;
    private didScanListenerHandler;
    private didUpdateSessionListenerHandler;
    constructor();
    updateBarcodeCaptureMode(modeJson: string): Promise<void>;
    applyBarcodeCaptureModeSettings(newSettingsJson: string): Promise<void>;
    updateBarcodeCaptureOverlay(overlayJson: string): Promise<void>;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    unregisterListenerForEvents(): void;
    setModeEnabledState(enabled: boolean): void;
    subscribeDidUpdateSessionListener(): Promise<void>;
    subscribeDidScanListener(): Promise<void>;
    finishDidUpdateSessionCallback(isFinished: boolean): void;
    finishDidScanCallback(isFinished: boolean): void;
    private emitInCallback;
    private notifyListeners;
}
