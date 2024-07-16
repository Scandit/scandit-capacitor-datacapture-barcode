import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
import { SparkScanViewProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeSparkScanViewProxy extends BaseNativeProxy implements SparkScanViewProxy {
    private fastFindButtonTappedListenerHandler;
    private barcodeCountButtonTappedListenerHandler;
    private feedbackForBarcodeHandler;
    private nativeEventSubscriptions;
    updateSparkScanView(viewJson: string): Promise<void>;
    createSparkScanView(viewJson: string): Promise<void>;
    disposeSparkScanView(): Promise<void>;
    showSparkScanView(): Promise<void>;
    hideSparkScanView(): Promise<void>;
    emitSparkScanViewFeedback(feedbackJson: string): Promise<void>;
    registerSparkScanViewListenerEvents(): void;
    unregisterSparkScanViewListenerEvents(): Promise<void>;
    showToast(text: string): Promise<void>;
    stopSparkScanViewScanning(): Promise<void>;
    startSparkScanViewScanning(): Promise<void>;
    pauseSparkScanViewScanning(): Promise<void>;
    prepareSparkScanViewScanning(): Promise<void>;
    registerDelegateForEvents(): Promise<void>;
    unregisterDelegateForEvents(): Promise<void>;
    submitFeedbackForBarcode(feedbackJson: string): Promise<void>;
    private notifyListeners;
}
