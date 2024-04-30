import { BarcodePickView, BarcodePickViewProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy, EventEmitter } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodePickViewProxy extends BaseNativeProxy implements BarcodePickViewProxy {
    protected eventEmitter: EventEmitter;
    private didPickItemListenerHandle;
    private didUnpickItemListenerHandle;
    constructor();
    findNodeHandle(_view?: BarcodePickView | undefined): number | null;
    viewStart(): Promise<void>;
    viewPause(): Promise<void>;
    finishPickAction(code: string, result: boolean): Promise<void>;
    createView(_: number | null, json: string): Promise<void>;
    updateView(json: string): Promise<void>;
    setPositionAndSize(top: number, left: number, width: number, height: number, shouldBeUnderWebView: boolean): Promise<void>;
    addActionListener(): Promise<void>;
    unsubscribeListeners(): Promise<void>;
    subscribeDidPickItemListener(): Promise<void>;
    subscribeDidUnpickItemListener(): Promise<void>;
    private didPickItemListenerHandler;
    private didUnpickItemListenerHandler;
}
