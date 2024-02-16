import { BarcodeFindViewProxy } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeFindView } from 'scandit-datacapture-frameworks-barcode/dist/dts/barcodefind/BarcodeFindView';
import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeFindViewProxy extends BaseNativeProxy implements BarcodeFindViewProxy {
    private subscriptionBarcodeFindViewListener;
    showView(): Promise<void>;
    hideView(): Promise<void>;
    onPause(): Promise<void>;
    onResume(): Promise<void>;
    startSearching(): Promise<void>;
    stopSearching(): Promise<void>;
    pauseSearching(): Promise<void>;
    findNodeHandle(_view?: BarcodeFindView | undefined): number | null;
    createView(_id: number | null, barcodeFindViewJson: string): Promise<void>;
    updateView(barcodeFindViewJson: string): Promise<void>;
    subscribeBarcodeFindViewListener(): Promise<void>;
    unsubscribeBarcodeFindViewListener(): Promise<void>;
    private notifyListeners;
}
