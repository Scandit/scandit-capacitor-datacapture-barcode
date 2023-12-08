import { BarcodeCountView } from '../BarcodeCountView';
import { BarcodeCountViewListener, BarcodeCountViewUiListener } from 'scandit-datacapture-frameworks-barcode';
export declare class BarcodeCountViewProxy {
    private view;
    private barcodeCount;
    private isInListenerCallback;
    static forBarcodeCount(view: BarcodeCountView): BarcodeCountViewProxy;
    private constructor();
    update(): Promise<void>;
    private create;
    dispose(): void;
    setUiListener(listener: BarcodeCountViewUiListener | null): void;
    setListener(listener: BarcodeCountViewListener | null): void;
    clearHighlights(): Promise<void>;
    setPositionAndSize(top: number, left: number, width: number, height: number, shouldBeUnderWebView: boolean): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    private subscribeListeners;
    private unsubscribeListeners;
    private singleScanButtonTappedHandler;
    private listButtonTappedHandler;
    private exitButtonTappedHandler;
    private filteredBarcodeTappedHandler;
    private recognizedBarcodeNotInListTappedHandler;
    private recognizedBarcodeTappedHandler;
    private unrecognizedBarcodeTappedHandler;
    private captureListCompletedHandler;
    private notifyListeners;
}
