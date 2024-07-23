import { SparkScanListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeSparkScanListenerProxy implements SparkScanListenerProxy {
    private didScanListenerHandler;
    private didUpdateSessionListenerHandler;
    private eventEmitter;
    private nativeEventSubscriptions;
    constructor();
    resetSession(): Promise<void>;
    updateMode(sparkScanJson: string): Promise<void>;
    registerListenerForEvents(): void;
    unregisterListenerForEvents(): void;
    subscribeDidUpdateSessionListener(): void;
    subscribeDidScanListener(): void;
    finishDidUpdateSessionCallback(enabled: boolean): Promise<void>;
    finishDidScanCallback(enabled: boolean): Promise<void>;
    setModeEnabledState(enabled: boolean): void;
    private notifyListeners;
}
