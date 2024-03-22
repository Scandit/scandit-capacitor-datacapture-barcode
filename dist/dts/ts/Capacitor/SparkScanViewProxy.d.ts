import { SparkScanViewFeedback } from 'scandit-datacapture-frameworks-barcode';
import { SparkScanView } from '../SparkScanView';
export declare enum SparkScanFeedbackDelegateEvents {
    feedbackForBarcode = "SparkScanFeedbackDelegate.feedbackForBarcode"
}
export declare class SparkScanViewProxy {
    private view;
    private fastFindButtonTappedListenerHandler;
    private barcodeCountButtonTappedListenerHandler;
    private feedbackForBarcodeHandler;
    private nativeEventSubscriptions;
    static forSparkScanView(view: SparkScanView): SparkScanViewProxy;
    private constructor();
    update(): Promise<void>;
    private create;
    dispose(): void;
    emitFeedback(feedback: SparkScanViewFeedback): Promise<void>;
    stopScanning(): Promise<void>;
    pauseScanning(): Promise<void>;
    startScanning(): Promise<void>;
    prepareScanning(): Promise<void>;
    private subscribeListeners;
    private unsubscribeListeners;
    private notifyListeners;
    show(): Promise<void>;
    hide(): Promise<void>;
    addFeedbackDelegate(): void;
    private onFeedbackForBarcodeHandler;
    removeFeedbackDelegate(): void;
    showToast(text: string): Promise<void>;
}
