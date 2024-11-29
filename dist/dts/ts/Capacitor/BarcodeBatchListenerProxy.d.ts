import { BarcodeBatchListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeBatchListenerProxy implements BarcodeBatchListenerProxy {
    private eventEmitter;
    isModeEnabled: () => boolean;
    constructor();
    updateBarcodeBatchMode(modeJson: string): Promise<void>;
    applyBarcodeBatchModeSettings(newSettingsJson: string): Promise<void>;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    unregisterListenerForEvents(): void;
    subscribeDidUpdateSession(): void;
    finishDidUpdateSessionCallback(enabled: boolean): void;
    setModeEnabledState(enabled: boolean): void;
    private notifyListeners;
}
