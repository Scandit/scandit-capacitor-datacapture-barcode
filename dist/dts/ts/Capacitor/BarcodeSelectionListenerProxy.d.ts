import { NativeCallResult } from 'scandit-datacapture-frameworks-core';
import { BarcodeSelectionListenerProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeSelectionListenerProxy implements BarcodeSelectionListenerProxy {
    private static exec;
    private eventEmitter;
    isModeEnabled: () => boolean;
    constructor();
    getCount(selectionIdentifier: string): Promise<NativeCallResult>;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    subscribeDidUpdateSelectionListener(): void;
    subscribeDidUpdateSession(): void;
    finishDidUpdateSelectionCallback(isEnabled: boolean): void;
    finishDidUpdateSessionCallback(isEnabled: boolean): void;
    unregisterListenerForEvents(): void;
    private notifyListeners;
}
