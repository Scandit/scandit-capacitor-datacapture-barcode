import { Brush, Color, DataCaptureContext } from 'scandit-datacapture-frameworks-core';
import { SparkScan, SparkScanFeedbackDelegate, SparkScanViewSettings, SparkScanViewUiListener } from 'scandit-datacapture-frameworks-barcode';
export declare class SparkScanView {
    private baseSparkScanView;
    get uiListener(): SparkScanViewUiListener | null;
    set uiListener(newValue: SparkScanViewUiListener | null);
    static forContext(context: DataCaptureContext, sparkScan: SparkScan, settings: SparkScanViewSettings | null): SparkScanView;
    static get defaultBrush(): Brush;
    private constructor();
    get previewSizeControlVisible(): boolean;
    set previewSizeControlVisible(newValue: boolean);
    get torchButtonVisible(): boolean;
    set torchButtonVisible(newValue: boolean);
    get scanningBehaviorButtonVisible(): boolean;
    set scanningBehaviorButtonVisible(newValue: boolean);
    get barcodeCountButtonVisible(): boolean;
    set barcodeCountButtonVisible(newValue: boolean);
    get barcodeFindButtonVisible(): boolean;
    set barcodeFindButtonVisible(newValue: boolean);
    get targetModeButtonVisible(): boolean;
    set targetModeButtonVisible(newValue: boolean);
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get stopCapturingText(): string | null;
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set stopCapturingText(newValue: string | null);
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get startCapturingText(): string | null;
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set startCapturingText(newValue: string | null);
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get resumeCapturingText(): string | null;
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set resumeCapturingText(newValue: string | null);
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get scanningCapturingText(): string | null;
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set scanningCapturingText(newValue: string | null);
    /**
     * @deprecated This property is not relevant anymore.
     */
    get captureButtonActiveBackgroundColor(): Color | null;
    /**
     * @deprecated This property is not relevant anymore.
     */
    set captureButtonActiveBackgroundColor(newValue: Color | null);
    /**
     * @deprecated use triggerButtonCollapsedColor and triggerButtonExpandedColor instead.
     */
    get captureButtonBackgroundColor(): Color | null;
    /**
     * @deprecated use triggerButtonCollapsedColor and triggerButtonExpandedColor instead.
     */
    set captureButtonBackgroundColor(newValue: Color | null);
    /**
     * @deprecated use triggerButtonTintColor instead.
     */
    get captureButtonTintColor(): Color | null;
    /**
     * @deprecated use triggerButtonTintColor instead.
     */
    set captureButtonTintColor(newValue: Color | null);
    get toolbarBackgroundColor(): Color | null;
    set toolbarBackgroundColor(newValue: Color | null);
    get toolbarIconActiveTintColor(): Color | null;
    set toolbarIconActiveTintColor(newValue: Color | null);
    get toolbarIconInactiveTintColor(): Color | null;
    set toolbarIconInactiveTintColor(newValue: Color | null);
    get cameraSwitchButtonVisible(): boolean;
    set cameraSwitchButtonVisible(newValue: boolean);
    get torchControlVisible(): boolean;
    set torchControlVisible(newValue: boolean);
    get previewCloseControlVisible(): boolean;
    set previewCloseControlVisible(newValue: boolean);
    get triggerButtonAnimationColor(): Color | null;
    set triggerButtonAnimationColor(newValue: Color | null);
    get triggerButtonExpandedColor(): Color | null;
    set triggerButtonExpandedColor(newValue: Color | null);
    get triggerButtonCollapsedColor(): Color | null;
    set triggerButtonCollapsedColor(newValue: Color | null);
    get triggerButtonTintColor(): Color | null;
    set triggerButtonTintColor(newValue: Color | null);
    get triggerButtonVisible(): boolean;
    set triggerButtonVisible(newValue: boolean);
    get triggerButtonImage(): string | null;
    set triggerButtonImage(newValue: string | null);
    prepareScanning(): void;
    startScanning(): void;
    pauseScanning(): void;
    stopScanning(): void;
    dispose(): void;
    show(): Promise<void>;
    hide(): Promise<void>;
    get feedbackDelegate(): SparkScanFeedbackDelegate | null;
    set feedbackDelegate(delegate: SparkScanFeedbackDelegate | null);
    showToast(text: string): Promise<void>;
    private toJSON;
}
