import { BarcodeTrackingListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeTrackingListenerProxy implements BarcodeTrackingListenerProxy {
    private eventEmitter;
    isModeEnabled: () => boolean;
    constructor();
    updateBarcodeTrackingMode(modeJson: string): Promise<void>;
    applyBarcodeTrackingModeSettings(newSettingsJson: string): Promise<void>;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    unregisterListenerForEvents(): void;
    subscribeDidUpdateSession(): void;
    finishDidUpdateSessionCallback(enabled: boolean): void;
    setModeEnabledState(enabled: boolean): void;
    private notifyListeners;
}
