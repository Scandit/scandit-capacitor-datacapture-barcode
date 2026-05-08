import { BarcodePickProductProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy, EventEmitter } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodePickProductProxy extends BaseNativeProxy implements BarcodePickProductProxy {
    protected eventEmitter: EventEmitter;
    private productIdentifierForItemsListenerHandle;
    constructor();
    finishOnProductIdentifierForItems(jsonData: string): Promise<void>;
    subscribeProductIdentifierForItemsListener(): Promise<void>;
    unsubscribeListeners(): void;
    private productIdentifierForItemsListenerHandler;
}
