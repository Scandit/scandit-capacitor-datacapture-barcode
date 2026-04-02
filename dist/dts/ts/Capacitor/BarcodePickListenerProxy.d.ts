import { BarcodePickListenerProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy, EventEmitter } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodePickListenerProxy extends BaseNativeProxy implements BarcodePickListenerProxy {
    protected eventEmitter: EventEmitter;
    private didCompleteScanningSessionListenerHandle;
    private didUpdateScanningSessionListenerHandle;
    constructor();
    subscribeBarcodePickListeners(): void;
    unsubscribeBarcodePickListeners(): void;
    subscribeDidCompleteScanningSessionListener(): Promise<void>;
    subscribeDidUpdateScanningSessionListener(): Promise<void>;
    private didCompleteScanningSessionListenerHandler;
    private didUpdateScanningSessionListenerHandler;
}
