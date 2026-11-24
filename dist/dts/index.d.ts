import { BarcodeBatch, TrackedBarcode, BarcodeCountIcon, BarcodeCountViewUiListener, BarcodeCountViewListener, BarcodeFilterHighlightSettings, BarcodeCountNotInListActionSettings, BarcodeCount, BarcodeCountMappingFlowSettings, BarcodeCountToolbarSettings, BarcodeCountStatusProvider, BarcodeFindViewProps, BarcodeFindViewUiListener, SparkScanViewUiListener, SparkScan, SparkScanViewSettings, SparkScanFeedbackDelegate, SparkScanScanningMode, BarcodePickViewUiListener, BarcodePickViewListener, BarcodePickActionListener, BarcodePick, BarcodePickViewSettings, BarcodeArViewUiListener, BarcodeArAnnotationProvider, BarcodeArHighlightProvider, BarcodeAr, BarcodeArViewSettings } from './barcode';
export { AdaptiveRecognitionErrorReason, AdaptiveRecognitionFrameMetadata, AdaptiveRecognitionServiceListener, ArucoDictionary, ArucoDictionaryPreset, ArucoMarker, AztecBarcodeGeneratorBuilder, Barcode, BarcodeAr, BarcodeArAnnotation, BarcodeArAnnotationProvider, BarcodeArAnnotationTrigger, BarcodeArCircleHighlight, BarcodeArCircleHighlightPreset, BarcodeArFeedback, BarcodeArFilter, BarcodeArHighlight, BarcodeArHighlightProvider, BarcodeArInfoAnnotation, BarcodeArInfoAnnotationAnchor, BarcodeArInfoAnnotationBodyComponent, BarcodeArInfoAnnotationFooter, BarcodeArInfoAnnotationHeader, BarcodeArInfoAnnotationListener, BarcodeArInfoAnnotationWidthPreset, BarcodeArListener, BarcodeArPopoverAnnotation, BarcodeArPopoverAnnotationAnchor, BarcodeArPopoverAnnotationButton, BarcodeArPopoverAnnotationListener, BarcodeArRectangleHighlight, BarcodeArResponsiveAnnotation, BarcodeArSession, BarcodeArSettings, BarcodeArStatusIconAnnotation, BarcodeArStatusIconAnnotationAnchor, BarcodeArViewSettings, BarcodeArViewUiListener, BarcodeBatch, BarcodeBatchBasicOverlay, BarcodeBatchBasicOverlayListener, BarcodeBatchBasicOverlayStyle, BarcodeBatchLicenseInfo, BarcodeBatchListener, BarcodeBatchSession, BarcodeBatchSettings, BarcodeCapture, BarcodeCaptureFeedback, BarcodeCaptureLicenseInfo, BarcodeCaptureListener, BarcodeCaptureOverlay, BarcodeCaptureSession, BarcodeCaptureSettings, BarcodeCount, BarcodeCountCaptureList, BarcodeCountCaptureListListener, BarcodeCountCaptureListSession, BarcodeCountFeedback, BarcodeCountIcon, BarcodeCountListener, BarcodeCountMappingFlowSettings, BarcodeCountNotInListActionSettings, BarcodeCountSession, BarcodeCountSessionSnapshot, BarcodeCountSettings, BarcodeCountStatus, BarcodeCountStatusItem, BarcodeCountStatusProvider, BarcodeCountStatusProviderCallback, BarcodeCountStatusResult, BarcodeCountStatusResultAbort, BarcodeCountStatusResultError, BarcodeCountStatusResultSuccess, BarcodeCountToolbarSettings, BarcodeCountViewListener, BarcodeCountViewStyle, BarcodeCountViewUiListener, BarcodeDataTransformer, BarcodeDefinition, BarcodeDefinitionBuilder, BarcodeFilterHighlightSettings, BarcodeFilterHighlightSettingsBrush, BarcodeFilterHighlightType, BarcodeFilterSettings, BarcodeFind, BarcodeFindFeedback, BarcodeFindItem, BarcodeFindItemContent, BarcodeFindItemSearchOptions, BarcodeFindListener, BarcodeFindSession, BarcodeFindSettings, BarcodeFindTransformer, BarcodeFindViewProps, BarcodeFindViewSettings, BarcodeFindViewUiListener, BarcodeGenerator, BarcodeGeneratorBuilder, BarcodeIdentifier, BarcodeInfo, BarcodePick, BarcodePickAction, BarcodePickActionCallback, BarcodePickActionListener, BarcodePickAsyncMapperProductProvider, BarcodePickAsyncMapperProductProviderCallback, BarcodePickListener, BarcodePickProduct, BarcodePickProductProvider, BarcodePickProductProviderCallback, BarcodePickProductProviderCallbackItem, BarcodePickScanningListener, BarcodePickScanningSession, BarcodePickSession, BarcodePickSettings, BarcodePickState, BarcodePickStatusIconSettings, BarcodePickStatusIconStyle, BarcodePickViewHighlightStyle, BarcodePickViewHighlightStyleAsyncProvider, BarcodePickViewHighlightStyleCustomView, BarcodePickViewHighlightStyleCustomViewProvider, BarcodePickViewHighlightStyleCustomViewResponse, BarcodePickViewHighlightStyleRequest, BarcodePickViewHighlightStyleResponse, BarcodePickViewHighlightStyleResponseBuilder, BarcodePickViewListener, BarcodePickViewSettings, BarcodePickViewUiListener, BarcodeSelection, BarcodeSelectionAimerBehavior, BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionBrushProvider, BarcodeSelectionFeedback, BarcodeSelectionFreezeBehavior, BarcodeSelectionLicenseInfo, BarcodeSelectionListener, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionSettings, BarcodeSelectionStrategy, BarcodeSelectionTapBehavior, BarcodeSelectionTapSelection, BarcodeSelectionType, BarcodeSpatialGrid, BatterySavingMode, CapturePreset, Checksum, Cluster, Code128BarcodeGeneratorBuilder, Code39BarcodeGeneratorBuilder, CompositeFlag, CompositeType, CompositeTypeDescription, DataMatrixBarcodeGeneratorBuilder, Dot, DotWithIcons, Ean13BarcodeGeneratorBuilder, Ean13UpcaClassification, EncodingRange, InterleavedTwoOfFiveBarcodeGeneratorBuilder, LocalizedOnlyBarcode, Pdf417BarcodeGeneratorBuilder, Pdf417CompactionMode, Pdf417Dimensions, QrCodeBarcodeGeneratorBuilder, QrCodeErrorCorrectionLevel, Range, Rectangular, RectangularWithIcons, ScanComponentBarcodePreset, ScanComponentDefinition, ScanComponentTextSemanticType, ScanItemDefinition, ScanItemIdentifier, ScannedBarcode, ScannedComponent, ScannedComponentIdentifier, ScannedItem, ScannedItemIdentifier, ScannedText, SparkScan, SparkScanBarcodeErrorFeedback, SparkScanBarcodeFeedback, SparkScanBarcodeSuccessFeedback, SparkScanFeedbackDelegate, SparkScanLicenseInfo, SparkScanListener, SparkScanMiniPreviewSize, SparkScanPreviewBehavior, SparkScanScanningBehavior, SparkScanScanningMode, SparkScanScanningModeDefault, SparkScanScanningModeTarget, SparkScanSession, SparkScanSettings, SparkScanToastSettings, SparkScanViewSettings, SparkScanViewState, SparkScanViewUiListener, StructuredAppendData, Symbology, SymbologyDescription, SymbologySettings, TargetBarcode, TextDefinition, TextDefinitionBuilder, TextIdentifier, TrackedBarcode, TrackedObject, UpcaBarcodeGeneratorBuilder } from './barcode';
import { DefaultSerializeable, Size, DataCaptureOverlay, Anchor, PointWithUnit, Brush, LogoStyle, DataCaptureContext, Rect, FrameSourceState, Color, CameraSettings, ZoomSwitchOrientation } from 'scandit-capacitor-datacapture-core/dist/dts/core';
import { Anchor as Anchor$1, PointWithUnit as PointWithUnit$1 } from 'scandit-capacitor-datacapture-core';

type Optional<T> = T | null;

/**
 * Provides a way to set different options for how the {@link TrackedBarcodeView} will be shown.
 *
 * @since 6.8.0
 */
interface TrackedBarcodeViewOptions {
    /**
     * The expected size of the view.
     *
     * Sets either this or {@link TrackedBarcodeViewOptions.scale} to set a specific size for the {@link TrackedBarcodeView}.
     *
     * @since 6.8.0
     */
    size?: Size;
    /**
     * The scaling factor to use to size the view. The value should be a positive number.
     *
     * Sets either this or {@link TrackedBarcodeViewOptions.size} to set a specific size for the {@link TrackedBarcodeView}.
     *
     * @since 6.8.0
     */
    scale?: number;
}
/**
 * A view that can be shown for a {@link TrackedBarcode} through a {@link BarcodeBatchAdvancedOverlay}.
 *
 * @since 6.8.0
 */
declare class TrackedBarcodeView extends DefaultSerializeable {
    private data;
    private options;
    /**
     * Creates a view based on an HTML element.
     *
     * Certain elements, e.g. embedded images cannot be rendered this way. Suitable for simple HTML elements that e.g. consist of colors, shapes and text. For more advanced views, use {@link TrackedBarcodeView.withBase64EncodedData}. As acquiring the view this way causes quality loss, we suggest to pass a view that’s double the size of what’s expected and scale it down using {@link TrackedBarcodeViewOptions.scale}.
     *
     * @since 6.8.0
     */
    static withHTMLElement(element: HTMLElement, options: Optional<TrackedBarcodeViewOptions>): Promise<TrackedBarcodeView>;
    /**
     * Creates a view based on base64 encoded data. The image data should be image/png.
     *
     * @since 6.8.0
     */
    static withBase64EncodedData(data: string, options: Optional<TrackedBarcodeViewOptions>): Promise<TrackedBarcodeView>;
    private static getEncodedImageData;
    private static getSize;
    private static getSVGDataForElement;
    private static getCanvasWithSize;
    private static getBase64DataForSVG;
    private constructor();
}



/**
 * An overlay for {@link DataCaptureView} that allows anchoring a single user-provided View to each tracked barcode.The provided view is visible on the top of the camera preview as long as its tracked barcode is and for all this time retains its relative position to it. This is useful when an additional information should be provided to tracked barcodes in real time. For instance, a user may overlay the price of an item or its expiry date for each corresponding barcode.To display the views, this overlay must be attached to a {@link DataCaptureView}. This can be done by passing this overlay to {@link DataCaptureView.addOverlay}.A user of this class may configure what view is displayed for the given barcode and the relative position between the two by implementing {@link BarcodeBatchAdvancedOverlayListener} or by calling {@link BarcodeBatchAdvancedOverlay.setViewForTrackedBarcode}, {@link BarcodeBatchAdvancedOverlay.setAnchorForTrackedBarcode} or {@link BarcodeBatchAdvancedOverlay.setOffsetForTrackedBarcode}.
 *
 * For additional information about using this overlay, refer to [Adding AR Overlays](https://docs.scandit.com/sdks/capacitor/matrixscan/advanced) .
 *
 * @since 7.0.0
 */
declare class BarcodeBatchAdvancedOverlay implements DataCaptureOverlay {
    private baseBarcodeBatchOverlay;
    private get type();
    /**
     * Whether to show scan area guides on top of the preview. This property is useful during development to visualize the current scan areas on screen. It is not meant to be used for production. By default this property is *false*.
     *
     * @since 7.0.0
     */
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    /** @since 7.0.0 */
    get listener(): BarcodeBatchAdvancedOverlayListener | null;
    set listener(listener: BarcodeBatchAdvancedOverlayListener | null);
    /**
     * Constructs a new BarcodeBatchAdvancedOverlay. For the overlay to be displayed on screen, it must be added to a {@link DataCaptureView}.
     *
     * @since 7.6.0
     */
    constructor(mode: BarcodeBatch);
    /**
     * The method can be called to change the view drawn for the given tracked barcode. Setting the view to *null* will unset the view from the tracked barcode and will effectively remove it from the overlay. This method is thread-safe, it can be called from any thread. The view set via this method will take precedence over the one set via {@link BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode}: in case a view is set before {@link BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode} got called, no call to {@link BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode} will happen.
     *
     * @since 7.0.0
     */
    setViewForTrackedBarcode(view: Promise<TrackedBarcodeView | null>, trackedBarcode: TrackedBarcode): Promise<void>;
    /**
     * The method can be called to change the anchor point for the view associated with the given tracked barcode. This method is thread-safe, it can be called from any thread. The anchor set via this method will take precedence over the one set via {@link BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode}: in case a view is set before {@link BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode} got called, no call to {@link BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode} will happen.
     *
     * @since 7.0.0
     */
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcode: TrackedBarcode): Promise<void>;
    /**
     * The method can be called to change the offset for the view associated with the given tracked barcode. This method is thread-safe, it can be called from any thread. The offset set via this method will take precedence over the one set via {@link BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode}: in case a view is set before {@link BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode} got called, no call to {@link BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode} will happen. If the {@link MeasureUnit} of the offset is {@link MeasureUnit.Fraction}, the offset is calculated relative to view’s dimensions.
     *
     * @since 7.0.0
     */
    setOffsetForTrackedBarcode(offset: PointWithUnit, trackedBarcode: TrackedBarcode): Promise<void>;
    /**
     * Clears all the views for the currently tracked barcodes from this overlay. This method is thread-safe, it can be called from any thread.
     *
     * @since 7.0.0
     */
    clearTrackedBarcodeViews(): Promise<void>;
    private set view(value);
    private get view();
    private onViewIdChanged;
    toJSON(): object;
}



/** @since 7.0.0 */
interface BarcodeBatchAdvancedOverlayListener {
    /**
     * Callback method that can be used to define an action that should be performed when a view for a tracked barcode is tapped.
     *
     * @since 7.0.0
     */
    didTapViewForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): void;
    /**
     * View to be drawn corresponding to the given {@link TrackedBarcode}. This method will be called before {@link BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode} and {@link BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode}. Beware that this view can be overridden with {@link BarcodeBatchAdvancedOverlay.setViewForTrackedBarcode} method. This method will only be called for new tracked barcodes that do not have a view yet, e.g. a view set by a call to {@link BarcodeBatchAdvancedOverlay.setViewForTrackedBarcode}.
     *
     * Called from the main thread.
     *
     * @since 7.0.0
     */
    viewForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): Promise<TrackedBarcodeView | null>;
    /**
     * Anchor point that should be used for the view corresponding to the given {@link TrackedBarcode}. This method will be called after {@link BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode} and before {@link BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode}. Beware that this anchor can be overridden with {@link BarcodeBatchAdvancedOverlay.setAnchorForTrackedBarcode} method. This method will only be called for new tracked barcodes that do not have an anchor yet, e.g. an anchor set by a call to {@link BarcodeBatchAdvancedOverlay.setAnchorForTrackedBarcode}.
     *
     * Called from the main thread.
     *
     * @since 7.0.0
     */
    anchorForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): Anchor$1;
    /**
     * Offset to be set to the view corresponding to the given {@link TrackedBarcode}. The offset is relative to the anchor point of the tracked barcode. This method will be called after {@link BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode} and {@link BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode}. Beware that this offset can be overridden with {@link BarcodeBatchAdvancedOverlay.setOffsetForTrackedBarcode} method. This method will only be called for new tracked barcodes that do not have an offset yet, e.g. an offset set by a call to {@link BarcodeBatchAdvancedOverlay.setOffsetForTrackedBarcode}.
     *
     * Called from the main thread.
     *
     * @since 7.0.0
     */
    offsetForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): PointWithUnit$1;
}

/**
 * The style of the {@link BarcodeCountView}
 *
 * @since 6.18.0
 */
declare enum BarcodeCountViewStyle {
    /**
     * Style that draws the highlights as icons and adds an animation for when a code newly appears.
     *
     * @since 6.18.0
     */
    Icon = "icon",
    /**
     * Style that draws the highlights as a dot and adds an animation for when a code newly appears.
     *
     * @since 6.18.0
     */
    Dot = "dot"
}
/**
 * {@link BarcodeCount} comes with a ready-to-use UI. Add {@link BarcodeCountView} to the view hierarchy. Please note that this view should be presented full screen.
 *
 * @since 6.18.0
 */
declare class BarcodeCountView {
    private viewId;
    /**
     * Returns the default brush to use for a recognized barcode. When setting a {@link BarcodeCountCaptureList} to the mode, this brush will be used for recognized barcodes that are part of the target list. Only used when setting the view {@link BarcodeCountView.style} to {@link BarcodeCountViewStyle.Dot}.
     *
     * @since 6.18.0
     */
    static get defaultRecognizedBrush(): Brush;
    /**
     * Returns the default brush to use for a recognized barcode that’s not part of the target {@link BarcodeCountCaptureList}. Only used when setting the view {@link BarcodeCountView.style} to {@link BarcodeCountViewStyle.Dot}.
     *
     * @since 6.18.0
     */
    static get defaultNotInListBrush(): Brush;
    /**
     * Returns the default brush to use for accepted barcodes. Only used when setting the view {@link BarcodeCountView.style} to {@link BarcodeCountViewStyle.Dot}.
     *
     * @since 7.1.0
     */
    static get defaultAcceptedBrush(): Brush;
    /**
     * Returns the default brush to use for rejected barcodes. Only used when setting the view {@link BarcodeCountView.style} to {@link BarcodeCountViewStyle.Dot}.
     *
     * @since 7.1.0
     */
    static get defaultRejectedBrush(): Brush;
    /**
     * Returns the default {@link BarcodeCountIcon} used for a recognized barcode. When setting a {@link BarcodeCountCaptureList} to the mode, this icon will be used for recognized barcodes that are part of the target list. Only used when the view {@link BarcodeCountView.style} is {@link BarcodeCountViewStyle.Icon}.
     *
     * @since 8.7.0
     */
    static get defaultRecognizedIcon(): BarcodeCountIcon;
    /**
     * Returns the default {@link BarcodeCountIcon} used for a recognized barcode that’s not part of the target {@link BarcodeCountCaptureList}. Only used when the view {@link BarcodeCountView.style} is {@link BarcodeCountViewStyle.Icon}.
     *
     * @since 8.7.0
     */
    static get defaultNotInListIcon(): BarcodeCountIcon;
    /**
     * Returns the default {@link BarcodeCountIcon} used for an accepted barcode. Used regardless of the view {@link BarcodeCountView.style}.
     *
     * @since 8.7.0
     */
    static get defaultAcceptedIcon(): BarcodeCountIcon;
    /**
     * Returns the default {@link BarcodeCountIcon} used for a rejected barcode. Used regardless of the view {@link BarcodeCountView.style}.
     *
     * @since 8.7.0
     */
    static get defaultRejectedIcon(): BarcodeCountIcon;
    /**
     * Returns whether the device supports listening for hardware button events. This is true for devices with api >= 28.
     *
     * This method is only supported on Android devices.
     *
     * @since 7.1.0
     */
    static get hardwareTriggerSupported(): boolean;
    /**
     * The listener which is called whenever the exit or list button of the view did receive a tap.
     *
     * Using this listener requires the MatrixScan AR add-on.
     *
     * @since 6.18.0
     */
    get uiListener(): BarcodeCountViewUiListener | null;
    set uiListener(listener: BarcodeCountViewUiListener | null);
    /**
     * The listener which is called whenever a new {@link TrackedBarcode} is newly tracked or newly recognized.
     *
     * Using this listener requires the MatrixScan AR add-on.
     *
     * @since 6.18.0
     */
    get listener(): BarcodeCountViewListener | null;
    set listener(listener: BarcodeCountViewListener | null);
    /**
     * When set to *true*, user guidance and the loading view will be shown to the user. The user guidance prompts the user to scan, and to move closer or further away from the target barcodes in order to scan them properly.
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowUserGuidanceView(): boolean;
    set shouldShowUserGuidanceView(newValue: boolean);
    /**
     * When set to *true*, a list button will be shown to the user in the lower left hand corner of the screen. When tapped, this button will freeze the mode. This button triggers a call to BarcodeCountViewUiListener.didTapListButton().
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowListButton(): boolean;
    set shouldShowListButton(newValue: boolean);
    /**
     * When set to *true*, the mode will disable automatically when the default exit button is tapped.
     *
     * By default this property is *true*.
     *
     * @since 7.0.0
     */
    get shouldDisableModeOnExitButtonTapped(): boolean;
    set shouldDisableModeOnExitButtonTapped(newValue: boolean);
    /**
     * When set to *true*, an exit button will be shown in the lower right hand corner of the screen. The behavior for this button is left entirely to the developer, and does nothing by default. When clicked, this button triggers a call to BarcodeCountViewUiListener.didTapExitButton().
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowExitButton(): boolean;
    set shouldShowExitButton(newValue: boolean);
    /**
     * When set to *true*, a shutter button will be shown to the user centered in the bottom of the screen. This button triggers the processing of the current video feed. The same functionality can be triggered by calling {@link BarcodeCount.startScanningPhase}.
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowShutterButton(): boolean;
    set shouldShowShutterButton(newValue: boolean);
    /**
     * When set to *true*, this view will show some messages about currently scanned barcodes.
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowHints(): boolean;
    set shouldShowHints(newValue: boolean);
    /**
     * When set to *true*, a button will be shown above the default shutter button. This button clears all currently shown barcodes highlights.
     *
     * @since 6.18.0
     */
    get shouldShowClearHighlightsButton(): boolean;
    set shouldShowClearHighlightsButton(newValue: boolean);
    /**
     * When set to *true*, a button will be shown to the user in the lower left corner of the preview. The behavior for this button is left entirely to the developer, and does nothing by default. When clicked, this button triggers a call to BarcodeCountViewUiListener.didTapSingleScanButton().
     *
     * By default this property is *false*.
     *
     * @since 6.18.0
     */
    get shouldShowSingleScanButton(): boolean;
    set shouldShowSingleScanButton(newValue: boolean);
    /**
     * When set to *true*, a floating shutter button will be visible on screen. This button can be dragged to any position and, when tapped, will trigger the processing of the current video feed.
     *
     * By default this property is *false*.
     *
     * @since 6.18.0
     */
    get shouldShowFloatingShutterButton(): boolean;
    set shouldShowFloatingShutterButton(newValue: boolean);
    /**
     * When set to *true*, a collapsable toolbar will be visible at the top of the preview. This toolbar contains a set of convenience buttons for easy preference setting during scanning.
     *
     * By default this property is *true*.
     *
     * @since 6.18.0
     */
    get shouldShowToolbar(): boolean;
    set shouldShowToolbar(newValue: boolean);
    /**
     * When set to *true*, a button will be shown to the user in the lower right corner of the preview. This button toggles “status mode”, in which the normal barcode highlights will be replaced by status indicators for each barcode.
     *
     * @since 8.3.0
     */
    get shouldShowStatusModeButton(): boolean;
    set shouldShowStatusModeButton(newValue: boolean);
    /**
     * When enabled, status icons will be loaded immediately after barcodes are scanned, without requiring manual activation of status mode.
     *
     * @since 8.3.0
     */
    get shouldShowStatusIconsOnScan(): boolean;
    set shouldShowStatusIconsOnScan(newValue: boolean);
    /**
     * When set to *true*, this view will visualize the active scan area used for BarcodeCount. This is useful to check {@link DataCaptureView.scanAreaMargins|margins} defined on the {@link DataCaptureView} are set correctly. This property is meant for debugging during development and is not intended for use in production.
     *
     * By default this property is *false*.
     *
     * @since 6.18.0
     */
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(newValue: boolean);
    /**
     * The brush applied to recognized tracked barcodes if {@link BarcodeCountViewListener} is not implemented. When setting a {@link BarcodeCountCaptureList} to the mode, this brush will be used for recognized barcodes that are part of the target list. Setting this brush to *null* hides all tracked barcodes.
     *
     * Defaults to a yellow-colored Brush.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 6.18.0
     */
    get recognizedBrush(): Brush | null;
    set recognizedBrush(newValue: Brush | null);
    /**
     * The brush applied to recognized tracked barcodes that are not part of the target {@link BarcodeCountCaptureList}, and only if {@link BarcodeCountViewListener} is not implemented. When {@link BarcodeCountCaptureList} is not set, this method will never be called. Setting this brush to *null* hides all tracked barcodes.
     *
     * Defaults to a red-colored Brush.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 6.18.0
     */
    get notInListBrush(): Brush | null;
    set notInListBrush(newValue: Brush | null);
    /**
     * The brush applied to accepted tracked barcodes if {@link BarcodeCountViewListener} is not implemented. Setting this brush to *null* hides all accepted barcodes.
     *
     * Defaults to a green-colored Brush.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    get acceptedBrush(): Brush | null;
    set acceptedBrush(newValue: Brush | null);
    /**
     * The brush applied to rejected tracked barcodes if {@link BarcodeCountViewListener} is not implemented. Setting this brush to *null* hides all rejected barcodes.
     *
     * Defaults to a red-colored Brush.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    get rejectedBrush(): Brush | null;
    set rejectedBrush(newValue: Brush | null);
    /**
     * The style of the logo, either the extended “Scanning By Scandit” or the minimal “Scandit”.
     *
     * Default is {@link LogoStyle.Minimal}.
     *
     * @since 8.7.0
     */
    get logoStyle(): LogoStyle;
    set logoStyle(newValue: LogoStyle);
    /**
     * The anchor point used to position the Scandit logo.
     *
     * Default is {@link Anchor.BottomLeft}.
     *
     * @since 8.7.0
     */
    get logoAnchor(): Anchor;
    set logoAnchor(newValue: Anchor);
    /**
     * Use this property to access or modify the current view settings for barcode filtering.
     *
     * @since 6.18.0
     */
    get filterSettings(): BarcodeFilterHighlightSettings | null;
    set filterSettings(newValue: BarcodeFilterHighlightSettings | null);
    /**
     * The view style. Defaults to {@link BarcodeCountViewStyle.Dot}.
     *
     * @since 6.18.0
     */
    get style(): BarcodeCountViewStyle;
    /**
     * Use this property to access or modify the accessibility hint for the list button provided by the view.
     *
     * Default value is “List button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get listButtonAccessibilityHint(): string;
    set listButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the list button provided by the view.
     *
     * Default value is “List button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get listButtonAccessibilityLabel(): string;
    set listButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description of the list button provided by the view.
     *
     * Default value is “List button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 6.18.0
     */
    get listButtonContentDescription(): string;
    set listButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the exit button provided by the view.
     *
     * Default value is “Exit button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get exitButtonAccessibilityHint(): string;
    set exitButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the exit button provided by the view.
     *
     * Default value is “Exit button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get exitButtonAccessibilityLabel(): string;
    set exitButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description of the exit button provided by the view.
     *
     * Default value is “Exit button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 6.18.0
     */
    get exitButtonContentDescription(): string;
    set exitButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the shutter button provided by the view.
     *
     * Default value is “Shutter button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get shutterButtonAccessibilityHint(): string;
    set shutterButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the shutter button provided by the view.
     *
     * Default value is “Shutter button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get shutterButtonAccessibilityLabel(): string;
    set shutterButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description of the shutter button provided by the view.
     *
     * Default value is “Shutter button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 6.18.0
     */
    get shutterButtonContentDescription(): string;
    set shutterButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the floating shutter button provided by the view.
     *
     * Default value is “Floating shutter button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get floatingShutterButtonAccessibilityHint(): string;
    set floatingShutterButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the floating shutter button provided by the view.
     *
     * Default value is “Floating shutter button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get floatingShutterButtonAccessibilityLabel(): string;
    set floatingShutterButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description for the floating shutter button provided by the view.
     *
     * Default value is “Floating shutter button”.
     *
     * @since 6.18.0
     */
    get floatingShutterButtonContentDescription(): string;
    set floatingShutterButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the clear highlights button provided by the view.
     *
     * Default value is “Clear highlights button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get clearHighlightsButtonAccessibilityHint(): string;
    set clearHighlightsButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the clear highlights button provided by the view.
     *
     * Default value is “Clear highlights button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get clearHighlightsButtonAccessibilityLabel(): string;
    set clearHighlightsButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description of the “clear highlights” button provided by the view.
     *
     * Default value is “Clear highlights button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 6.18.0
     */
    get clearHighlightsButtonContentDescription(): string;
    set clearHighlightsButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the single scan button provided by the view.
     *
     * Default value is “Single scan button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get singleScanButtonAccessibilityHint(): string;
    set singleScanButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the single scan button provided by the view.
     *
     * Default value is “Single scan button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 6.18.0
     */
    get singleScanButtonAccessibilityLabel(): string;
    set singleScanButtonAccessibilityLabel(newValue: string);
    /**
     * Use this property to access or modify the content description of the “single scan” button provided by the view.
     *
     * Default value is “Single scan button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 6.18.0
     */
    get singleScanButtonContentDescription(): string;
    set singleScanButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the accessibility hint for the status mode button provided by the view.
     *
     * Default value is “Status mode button”.
     *
     * @since 8.3.0
     */
    get statusModeButtonAccessibilityHint(): string;
    set statusModeButtonAccessibilityHint(newValue: string);
    /**
     * Use this property to access or modify the accessibility label for the single status mode button provided by the view.
     *
     * Default value is “Status mode button”.
     *
     * This property has effect only when running on iOS.
     *
     * @since 8.3.0
     */
    get statusModeButtonAccessibilityLabel(): string;
    set statusModeButtonAccessibilityLabel(newValue: string);
    /**
     * Gets or sets the content description for the status mode button provided by the view.
     *
     * Default value is “Status mode button”.
     *
     * This property has effect only when running on Android.
     *
     * @since 8.3.0
     */
    get statusModeButtonContentDescription(): string;
    set statusModeButtonContentDescription(newValue: string);
    /**
     * Use this property to access or modify the text of the clear button label provided by the view.
     *
     * Default value is “Clear screen”.
     *
     * @since 6.18.0
     */
    get clearHighlightsButtonText(): string;
    set clearHighlightsButtonText(newValue: string);
    /**
     * Use this property to access or modify the text of the exit button label provided by the view.
     *
     * Default value is “Finish”.
     *
     * @since 6.18.0
     */
    get exitButtonText(): string;
    set exitButtonText(newValue: string);
    /**
     * Use this property to access or modify the text of the hint which suggests to tap the shutter button.
     *
     * Default value is “Tap shutter to scan items”.
     *
     * @since 6.18.0
     */
    get textForTapShutterToScanHint(): string;
    set textForTapShutterToScanHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint displayed while scanning is in progress.
     *
     * Default value is “Scanning”.
     *
     * @since 6.18.0
     */
    get textForScanningHint(): string;
    set textForScanningHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint displayed when camera should be moved closer to rescan.
     *
     * Default value is “Move closer and tap shutter”.
     *
     * @since 6.18.0
     */
    get textForMoveCloserAndRescanHint(): string;
    set textForMoveCloserAndRescanHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint displayed when camera should be further away to rescan.
     *
     * Default value is “Step back and tap shutter”.
     *
     * @since 6.18.0
     */
    get textForMoveFurtherAndRescanHint(): string;
    set textForMoveFurtherAndRescanHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint displayed when a barcode not in list is scanned.
     *
     * Default value is “Wrong barcodes detected!”.
     *
     * @since 8.3.0
     */
    get textForBarcodesNotInListDetectedHint(): string;
    set textForBarcodesNotInListDetectedHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint displayed when screen is cleaned.
     *
     * Default value is “Screen cleaned up. All items saved.”.
     *
     * @since 8.3.0
     */
    get textForScreenCleanedUpHint(): string;
    set textForScreenCleanedUpHint(newValue: string);
    /**
     * Use this property to access or modify the text of the hint that suggests the user to use gestures to form clusters. Shown only when {@link BarcodeCountSettings.clusteringMode} is {@link ClusteringMode.Manual} or {@link ClusteringMode.AutoWithManualCorrection}.
     *
     * Default value is “Swipe or circle codes to group together.”.
     *
     * @since 8.3.0
     */
    get textForClusteringGestureHint(): string;
    set textForClusteringGestureHint(newValue: string);
    /**
     * When set to *true*, a progress bar will be shown to the user when a capture list has been set using {@link BarcodeCount.setBarcodeCountCaptureList}, indicating how many of the barcodes in the list have been scanned.
     *
     * By default this property is *true*.
     *
     * @since 6.25.0
     */
    get shouldShowListProgressBar(): boolean;
    set shouldShowListProgressBar(newValue: boolean);
    /**
     * Indicates whether the torch control button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.26.0
     */
    get shouldShowTorchControl(): boolean;
    set shouldShowTorchControl(newValue: boolean);
    /**
     * Updates the position of the torch control button.
     *
     * Only {@link Anchor.TopLeft}, {@link Anchor.TopRight}, {@link Anchor.BottomLeft} and {@link Anchor.BottomRight}, are supported.
     *
     * Any other value will default to {@link Anchor.TopLeft}.
     *
     * @since 6.26.0
     */
    get torchControlPosition(): Anchor;
    set torchControlPosition(newValue: Anchor);
    /**
     * Text of the hint displayed when the user deselects an item.
     *
     * Default value is “Barcode removed”.
     *
     * @since 7.0.0
     */
    get textForTapToUncountHint(): string;
    set textForTapToUncountHint(newValue: string);
    /**
     * Enables this feature to be able to deselect items by tapping on the highlights.
     *
     * Default value is *false*.
     *
     * @since 7.0.0
     */
    get tapToUncountEnabled(): boolean;
    set tapToUncountEnabled(newValue: boolean);
    /**
     * Use this object to customize barcode not in list actions.
     *
     * @since 7.1.0
     */
    get barcodeNotInListActionSettings(): BarcodeCountNotInListActionSettings;
    set barcodeNotInListActionSettings(newValue: BarcodeCountNotInListActionSettings);
    /**
     * Enables the {@link BarcodeCountView} to react to clicks of the volume button.
     *
     * This method is only supported on iOS devices.
     *
     * @since 7.1.0
     */
    get hardwareTriggerEnabled(): boolean;
    set hardwareTriggerEnabled(newValue: boolean);
    private baseBarcodeCountView;
    private htmlElement;
    private _htmlElementState;
    private set htmlElementState(value);
    private get htmlElementState();
    private scrollListener;
    private domObserver;
    /**
     * Constructs a new barcode count view.
     *
     * @since 6.18.0
     */
    static forContextWithMode(context: DataCaptureContext, barcodeCount: BarcodeCount): BarcodeCountView;
    /**
     * Constructs a new barcode count view.
     *
     * @since 6.18.0
     */
    static forContextWithModeAndStyle(context: DataCaptureContext, barcodeCount: BarcodeCount, style: BarcodeCountViewStyle): BarcodeCountView;
    /**
     * Constructs a new barcode count view to use with the grid mapping flow.
     *
     * The grid mapping flow only supports grids of 4 rows by 2 columns.
     *
     * @since 8.3.0
     */
    static forMapping(context: DataCaptureContext, barcodeCount: BarcodeCount, style: BarcodeCountViewStyle, mappingFlowSettings: BarcodeCountMappingFlowSettings): BarcodeCountView;
    constructor({ context, barcodeCount, style, mappingFlowSettings, }: {
        context: DataCaptureContext;
        barcodeCount: BarcodeCount;
        style: BarcodeCountViewStyle;
        mappingFlowSettings?: BarcodeCountMappingFlowSettings;
    });
    private orientationChangeListener;
    /**
     * Clear all currently shown barcodes highlights. This only affects screen rendering, and all detected barcodes will still be available in the {@link BarcodeCountSession}.
     *
     * @since 6.18.0
     */
    clearHighlights(): Promise<void>;
    /**
     * Pass an instance of {@link BarcodeCountToolbarSettings} to configure the text and accessibility options for the toolbar.
     *
     * @since 6.18.0
     */
    setToolbarSettings(settings: BarcodeCountToolbarSettings): void;
    /**
     * Sets a {@link BarcodeCountStatusProvider} for this view. This provider will be queried when the “status mode” button is clicked.
     *
     * The Barcode Count status mode API is still in beta and may change in future versions of Scandit Data Capture SDK.
     *
     * @since 8.3.0
     */
    setStatusProvider(provider: BarcodeCountStatusProvider): void;
    /**
     * Connect the data capture view to a given HTML element, so it’s size and position can be mirrored.
     *
     * To position the barcode count view below the WebView and show content over the camera preview, change the z-index of the element to be less than 0. If you do this, make sure that the background of your HTML page is transparent, so the barcode count view positioned under the WebView can be seen.
     *
     * Should not be used together with {@link BarcodeCountView.setFrame}. One strategy to size the capture view should be chosen.
     *
     * @since 6.18.0
     */
    connectToElement(element: HTMLElement): void;
    /**
     * Detach the barcode count view from the currently connected HTML element. This releases the HTML element and removes any listeners or resources related to it.
     *
     * @since 6.18.0
     */
    detachFromElement(): void;
    /**
     * Manually set a specific size and position for the barcode count view.
     *
     * To position the barcode count view below the WebView and show content over the camera preview, set the isUnderContent argument to *true*. If you do this, make sure that the background of your HTML page is transparent, so the barcode count view positioned under the WebView can be seen.
     *
     * Should not be used together with {@link BarcodeCountView.connectToElement}. One strategy to size the capture view should be chosen.
     *
     * @since 6.18.0
     */
    setFrame(frame: Rect, isUnderContent?: boolean): Promise<void>;
    /**
     * Sets the view to be visible.
     *
     * Should only be used with {@link BarcodeCountView.setFrame}.
     *
     * @since 6.18.0
     */
    show(): Promise<void>;
    /**
     * Sets the view not to be visible.
     *
     * Should only be used with {@link BarcodeCountView.setFrame}.
     *
     * @since 6.18.0
     */
    hide(): Promise<void>;
    /**
     * Sets a {@link Brush} to be used for a particular recognized {@link TrackedBarcode}. This will override any other applicable brush for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    setBrushForRecognizedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    /**
     * Sets a {@link Brush} to be used for a particular recognized {@link TrackedBarcode} that doesn’t belong to the capture list. This will only be applicable when using a capture list, and will override any other applicable brush for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    setBrushForRecognizedBarcodeNotInList(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    /**
     * Sets a {@link Brush} to be used for a particular accepted {@link TrackedBarcode}. This will override any other applicable brush for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    setBrushForAcceptedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    /**
     * Sets a {@link Brush} to be used for a particular rejected {@link TrackedBarcode}. This will override any other applicable brush for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Dot} style.
     *
     * @since 7.1.0
     */
    setBrushForRejectedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    /**
     * Sets a {@link BarcodeCountIcon} to be used for a particular recognized {@link TrackedBarcode}. This will override any other applicable icon for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Icon} style.
     *
     * On iOS, passing *null* suppresses the highlight for the given barcode. On Android, passing *null* removes the override, so the barcode reverts to its default or listener-provided icon.
     *
     * The icon is applied while answering the corresponding view listener callback for that barcode. Calling this method at another time resolves without changing the icon, as the pre-existing brush setters do.
     *
     * @since 8.7.0
     */
    setIconForRecognizedBarcode(trackedBarcode: TrackedBarcode, icon: BarcodeCountIcon | null): Promise<void>;
    /**
     * Sets a {@link BarcodeCountIcon} to be used for a particular recognized {@link TrackedBarcode} that doesn’t belong to the capture list. This will only be applicable when using a capture list, and will override any other applicable icon for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Icon} style.
     *
     * On iOS, passing *null* suppresses the highlight for the given barcode. On Android, passing *null* removes the override, so the barcode reverts to its default or listener-provided icon.
     *
     * The icon is applied while answering the corresponding view listener callback for that barcode. Calling this method at another time resolves without changing the icon, as the pre-existing brush setters do.
     *
     * @since 8.7.0
     */
    setIconForRecognizedBarcodeNotInList(trackedBarcode: TrackedBarcode, icon: BarcodeCountIcon | null): Promise<void>;
    /**
     * Sets a {@link BarcodeCountIcon} to be used for a particular accepted {@link TrackedBarcode}. This will override any other applicable icon for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Icon} style.
     *
     * On iOS, passing *null* suppresses the highlight for the given barcode. On Android, passing *null* removes the override, so the barcode reverts to its default or listener-provided icon.
     *
     * The icon is applied while answering the corresponding view listener callback for that barcode. Calling this method at another time resolves without changing the icon, as the pre-existing brush setters do.
     *
     * @since 8.7.0
     */
    setIconForAcceptedBarcode(trackedBarcode: TrackedBarcode, icon: BarcodeCountIcon | null): Promise<void>;
    /**
     * Sets a {@link BarcodeCountIcon} to be used for a particular rejected {@link TrackedBarcode}. This will override any other applicable icon for this particular barcode.
     *
     * Used only when the view uses the {@link BarcodeCountViewStyle.Icon} style.
     *
     * On iOS, passing *null* suppresses the highlight for the given barcode. On Android, passing *null* removes the override, so the barcode reverts to its default or listener-provided icon.
     *
     * The icon is applied while answering the corresponding view listener callback for that barcode. Calling this method at another time resolves without changing the icon, as the pre-existing brush setters do.
     *
     * @since 8.7.0
     */
    setIconForRejectedBarcode(trackedBarcode: TrackedBarcode, icon: BarcodeCountIcon | null): Promise<void>;
    /**
     * This method is only supported on Android devices and is only available on devices with api >= 28. Whether a device supports this can be checked at runtime with the {@link BarcodeCountView.hardwareTriggerSupported} flag.
     *
     * @since 7.1.0
     */
    enableHardwareTrigger(hardwareTriggerKeyCode: number | null): Promise<void>;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    private _show;
    private _hide;
    private toJSON;
}

/**
 * {@link BarcodeFind} comes with a ready-to-use search UI that uses augmented reality overlays to highlight items that match predefined criteria. The BarcodeFindView integrates with any app in just a few lines of code.
 *
 * @since 6.22.0
 */
declare class BarcodeFindView {
    private baseBarcodeFindView;
    private htmlElement;
    private _htmlElementState;
    private scrollListener;
    private domObserver;
    /**
     * Constructs a new BarcodeFind view with the given view props.
     *
     * @since 7.6.0
     */
    constructor(props: BarcodeFindViewProps);
    private set htmlElementState(value);
    private get htmlElementState();
    private updatePositionAndSize;
    private orientationChangeListener;
    /**
     * Sets the listener which is called whenever the finish button is tapped from the view.
     *
     * @since 6.22.0
     */
    get barcodeFindViewUiListener(): BarcodeFindViewUiListener | null;
    set barcodeFindViewUiListener(value: BarcodeFindViewUiListener | null);
    /**
     * Returns whether the device supports listening for hardware button events. This is true for devices with api >= 28.
     *
     * @since 7.1.0
     */
    static get hardwareTriggerSupported(): boolean;
    /**
     * Indicates whether guidance should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.22.0
     */
    get shouldShowUserGuidanceView(): boolean;
    set shouldShowUserGuidanceView(value: boolean);
    /**
     * Indicates whether hints should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.22.0
     */
    get shouldShowHints(): boolean;
    set shouldShowHints(value: boolean);
    /**
     * Indicates whether the item carousel should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.22.0
     */
    get shouldShowCarousel(): boolean;
    set shouldShowCarousel(value: boolean);
    /**
     * Indicates whether the pause button should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.22.0
     */
    get shouldShowPauseButton(): boolean;
    set shouldShowPauseButton(value: boolean);
    /**
     * Indicates whether the finish button should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.22.0
     */
    get shouldShowFinishButton(): boolean;
    set shouldShowFinishButton(value: boolean);
    /**
     * Indicates whether the progress bar should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.22.0
     */
    get shouldShowProgressBar(): boolean;
    set shouldShowProgressBar(value: boolean);
    /**
     * Indicates whether the torch control button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.22.0
     */
    get shouldShowTorchControl(): boolean;
    set shouldShowTorchControl(value: boolean);
    /**
     * Indicates whether the zoom control should be shown to the user, allowing them to switch between the normal and ultra-wide lenses.
     *
     * Default is *false*.
     *
     * The zoom control requires a device with an ultra-wide camera. On devices without an ultra-wide camera, setting this property to *true* has no effect.
     *
     * @since 7.1.0
     */
    get shouldShowZoomControl(): boolean;
    set shouldShowZoomControl(value: boolean);
    /**
     * Updates the position of the torch control button.
     *
     * Only {@link Anchor.TopLeft}, {@link Anchor.TopCenter}, {@link Anchor.TopRight} and {@link Anchor.BottomLeft} are supported.
     *
     * Any other value will default to {@link Anchor.TopLeft}.
     *
     * @since 6.22.0
     */
    get torchControlPosition(): Anchor;
    set torchControlPosition(value: Anchor);
    /**
     * Overrides the default text displayed in the button for collapsing the item carousel.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForCollapseCardsButton(): string | null;
    set textForCollapseCardsButton(value: string | null);
    /**
     * Overrides the default text displayed in the green confirmation view shown when all items have been found.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForAllItemsFoundSuccessfullyHint(): string | null;
    set textForAllItemsFoundSuccessfullyHint(value: string | null);
    /**
     * Overrides the default text displayed in the confirmation view shown when the item list has been updated.
     *
     * Default is *null*.
     *
     * @since 6.24.0
     */
    get textForItemListUpdatedHint(): string | null;
    set textForItemListUpdatedHint(value: string | null);
    /**
     * Overrides the default text displayed in the confirmation view shown when the item list has been updated and search is paused.
     *
     * Default is *null*.
     *
     * @since 6.24.0
     */
    get textForItemListUpdatedWhenPausedHint(): string | null;
    set textForItemListUpdatedWhenPausedHint(value: string | null);
    /**
     * Overrides the default text for the “Point at barcodes to search” hint.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForPointAtBarcodesToSearchHint(): string | null;
    set textForPointAtBarcodesToSearchHint(value: string | null);
    /**
     * Overrides the default text for the “Move closer” hint.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForMoveCloserToBarcodesHint(): string | null;
    set textForMoveCloserToBarcodesHint(value: string | null);
    /**
     * Overrides the default text for “Tap shutter to pause” hint.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForTapShutterToPauseScreenHint(): string | null;
    set textForTapShutterToPauseScreenHint(value: string | null);
    /**
     * Overrides the default text for “Tap shutter to resume” hint.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get textForTapShutterToResumeSearchHint(): string | null;
    set textForTapShutterToResumeSearchHint(value: string | null);
    /**
     * The style of the logo, either the extended “Scanning By Scandit” or the minimal “Scandit”.
     *
     * Default is {@link LogoStyle.Extended}.
     *
     * @since 8.6.0
     */
    get logoStyle(): LogoStyle;
    set logoStyle(value: LogoStyle);
    /**
     * The anchor point used to position the Scandit logo.
     *
     * Default is {@link Anchor.BottomRight}.
     *
     * @since 8.6.0
     */
    get logoAnchor(): Anchor;
    set logoAnchor(value: Anchor);
    /**
     * Specifies the desired camera state when BarcodeFind stops searching. This property allows optimization of camera transitions when switching between different capture modes.
     *
     * On Flutter, Capacitor, Cordova and React Native this property is only effective on iOS; it is ignored on Android.
     *
     * For example, setting this to {@link FrameSourceState.Standby} instead of the default {@link FrameSourceState.Off} can improve camera startup times when transitioning to another mode (such as SparkScan) that uses standby state, as it avoids the On→Off→Standby transition sequence.
     *
     * Default is {@link FrameSourceState.Off}.
     *
     * @since 8.6.0
     */
    get cameraStateOnStop(): FrameSourceState;
    set cameraStateOnStop(value: FrameSourceState);
    /**
     * Method to call for stopping the mode. For instance, it can be called when the view controller containing BarcodeFindView is about to disappear (i.e., UIViewController’s viewWillDisappear).
     *
     * @since 6.22.0
     */
    stopSearching(): Promise<void>;
    /**
     * Starts the searching process. You can call this method if you want to trigger the searching process without any user interaction.
     *
     * @since 6.22.0
     */
    startSearching(): Promise<void>;
    /**
     * Pauses the searching process. You can call this method if you want to trigger pausing the searching process without any user interaction.
     *
     * @since 6.22.0
     */
    pauseSearching(): Promise<void>;
    /**
     * Connect the barcode find view to a given HTML element, so it’s size and position can be mirrored.
     *
     * @since 6.22.0
     */
    connectToElement(element: HTMLElement): void;
    /**
     * Detach the barcode find view from the currently connected HTML element. This releases the HTML element and removes any listeners or resources related to it.
     *
     * @since 6.22.0
     */
    detachFromElement(): void;
    /**
     * Sets the view to be visible.
     *
     * @since 6.22.0
     */
    show(): Promise<void>;
    /**
     * Sets the view not to be visible.
     *
     * @since 6.22.0
     */
    hide(): Promise<void>;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private _show;
    private _hide;
    private toJSON;
}

/**
 * {@link SparkScan} comes with a ready-to-use UI and scanning modes that are purpose-built to tackle high-volume scanning at close range. The SparkScanView integrates with any app without requiring app redesign or customization. It includes:
 *
 * camera preview screenlarge-sized scan buttonquick access toolbar to adjust scanning settings
 *
 * @since 6.22.0
 */
declare class SparkScanView {
    private baseSparkScanView;
    /**
     * Sets the listener which is called whenever a barcode find button or barcode count button is tapped from the toolbar.
     *
     * @since 6.22.0
     */
    get uiListener(): SparkScanViewUiListener | null;
    set uiListener(newValue: SparkScanViewUiListener | null);
    /**
     * Constructs a new SparkScan view and adds it to the provided parentView. When the settings are provided, those will be used to set the default behaviour and look of the view.
     *
     * @since 6.22.0
     */
    static forContext(context: DataCaptureContext, sparkScan: SparkScan, settings: SparkScanViewSettings | null): SparkScanView;
    /**
     * Returns the default brush used by the overlay.
     *
     * @since 6.22.0
     */
    static get defaultBrush(): Brush;
    private constructor();
    /**
     * Indicates whether the mini preview size control should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 6.23.0
     */
    get previewSizeControlVisible(): boolean;
    set previewSizeControlVisible(newValue: boolean);
    /**
     * Indicates whether the scanning behavior button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.22.0
     */
    get scanningBehaviorButtonVisible(): boolean;
    set scanningBehaviorButtonVisible(newValue: boolean);
    /**
     * Indicates whether the barcode count button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.22.0
     */
    get barcodeCountButtonVisible(): boolean;
    set barcodeCountButtonVisible(newValue: boolean);
    /**
     * Indicates whether the barcode find button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.26.0
     */
    get barcodeFindButtonVisible(): boolean;
    set barcodeFindButtonVisible(newValue: boolean);
    /**
     * Indicates whether the target mode button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 6.22.0
     */
    get targetModeButtonVisible(): boolean;
    set targetModeButtonVisible(newValue: boolean);
    /**
     * Indicates whether the selection mode button should be shown to the user. The button toggles {@link SparkScanSettings.selectionMode} between {@link SelectionMode.On} and {@link SelectionMode.Off}.
     *
     * Renamed replacement for the deprecated {@link SparkScanView.targetModeButtonVisible}. Both properties share the same underlying state; when a deserialised JSON snapshot contains both keys, `selectionModeButtonVisible` wins.
     *
     * Default is *false*.
     *
     * @since 8.5.0
     */
    get selectionModeButtonVisible(): boolean;
    set selectionModeButtonVisible(newValue: boolean);
    /**
     * Indicates whether the label capture button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 7.4.0
     */
    get labelCaptureButtonVisible(): boolean;
    set labelCaptureButtonVisible(newValue: boolean);
    /**
     * Sets the toolbar background color.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get toolbarBackgroundColor(): Color | null;
    set toolbarBackgroundColor(newValue: Color | null);
    /**
     * Sets the toolbar icon active color.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get toolbarIconActiveTintColor(): Color | null;
    set toolbarIconActiveTintColor(newValue: Color | null);
    /**
     * Sets the toolbar icon inactive color.
     *
     * Default is *null*.
     *
     * @since 6.22.0
     */
    get toolbarIconInactiveTintColor(): Color | null;
    set toolbarIconInactiveTintColor(newValue: Color | null);
    /**
     * Indicates whether the camera switch button should be shown to the user.
     *
     * Default is *false*.
     *
     * This API is still in beta and may change in future versions of Scandit Data Capture SDK.
     *
     * @since 6.24.0
     */
    get cameraSwitchButtonVisible(): boolean;
    set cameraSwitchButtonVisible(newValue: boolean);
    /**
     * Indicates whether the torch control should be shown to the user.
     *
     * Default is *true*.
     *
     * If {@link SparkScanViewSettings.defaultTorchState} is set to {@link TorchState.Auto}, torch control is hidden.
     *
     * @since 7.0.0
     */
    get torchControlVisible(): boolean;
    set torchControlVisible(newValue: boolean);
    /**
     * Indicates whether the zoom switch control should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 8.4.0
     */
    get zoomSwitchControlVisible(): boolean;
    set zoomSwitchControlVisible(newValue: boolean);
    /**
     * Indicates whether the mini preview close control should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 7.0.0
     */
    get previewCloseControlVisible(): boolean;
    set previewCloseControlVisible(newValue: boolean);
    /**
     * Sets the color of the pulsing animation around the trigger button, which is shown when the scanner is active.
     *
     * @since 7.0.0
     */
    get triggerButtonAnimationColor(): Color | null;
    set triggerButtonAnimationColor(newValue: Color | null);
    /**
     * Sets the background color of the trigger button when button is expanded.
     *
     * @since 7.0.0
     */
    get triggerButtonExpandedColor(): Color | null;
    set triggerButtonExpandedColor(newValue: Color | null);
    /**
     * Sets the background color of the trigger button when button is collapsed.
     *
     * @since 7.0.0
     */
    get triggerButtonCollapsedColor(): Color | null;
    set triggerButtonCollapsedColor(newValue: Color | null);
    /**
     * Sets the trigger button tint color.
     *
     * @since 7.0.0
     */
    get triggerButtonTintColor(): Color | null;
    set triggerButtonTintColor(newValue: Color | null);
    /**
     * Indicates whether the trigger button should be shown to the user.
     *
     * Default is *true*.
     *
     * @since 7.0.0
     */
    get triggerButtonVisible(): boolean;
    set triggerButtonVisible(newValue: boolean);
    /**
     * The image displayed in the trigger button.
     *
     * @since 7.0.0
     */
    get triggerButtonImage(): string | null;
    set triggerButtonImage(newValue: string | null);
    /** @since 6.22.0 */
    prepareScanning(): Promise<void>;
    /**
     * Starts the scanning process. You can call this method if you want to trigger the scanning process without any user interaction.
     *
     * @since 6.22.0
     */
    startScanning(): Promise<void>;
    /**
     * Pauses the scanning process. You can call this method if you want to trigger pausing the scanning process without any user interaction.
     *
     * @since 6.22.0
     */
    pauseScanning(): Promise<void>;
    /** @since 6.22.0 */
    stopScanning(): Promise<void>;
    /**
     * Disposes of the SparkScanView and releases all associated resources. Call this method when the view is no longer needed to free native resources.
     *
     * @since 6.22.0
     */
    dispose(): Promise<void>;
    /**
     * Sets the view to be visible.
     *
     * @since 6.22.0
     */
    show(): Promise<void>;
    /**
     * Sets the view not to be visible.
     *
     * @since 6.22.0
     */
    hide(): Promise<void>;
    /**
     * Sets the feedback delegate. If no delegate is set, the default {@link Success|SparkScanBarcodeFeedback.Success} feedback is emitted.
     *
     * @since 6.23.0
     */
    get feedbackDelegate(): SparkScanFeedbackDelegate | null;
    set feedbackDelegate(delegate: SparkScanFeedbackDelegate | null);
    /**
     * Shows a toast with text inside the mini preview.
     *
     * @since 6.23.0
     */
    showToast(text: string): Promise<void>;
    /**
     * Returns the currently used SparkScanScanningMode.
     *
     * @since 8.7.0
     */
    getScanningMode(): Promise<SparkScanScanningMode>;
    private toJSON;
}

interface BarcodePickViewProps {
    context: DataCaptureContext;
    barcodePick: BarcodePick;
    settings: BarcodePickViewSettings;
    cameraSettings: CameraSettings;
    style: any;
}
/**
 * BarcodePickView.
 *
 * @since 6.22.0
 */
declare class BarcodePickView extends DefaultSerializeable {
    private viewId;
    private baseBarcodePickView;
    private htmlElement;
    private _htmlElementState;
    private domObserver;
    private scrollListener;
    constructor(props: BarcodePickViewProps);
    /**
     * Sets the listener which is called whenever the finish button is tapped from the view.
     *
     * @since 6.23.0
     */
    get uiListener(): BarcodePickViewUiListener | null;
    set uiListener(value: BarcodePickViewUiListener | null);
    private orientationChangeListener;
    private set htmlElementState(value);
    private get htmlElementState();
    /**
     * Connect the barcode pick view to a given HTML element, so it’s size and position can be mirrored.
     *
     * @since 6.22.0
     */
    connectToElement(element: HTMLElement): void;
    /**
     * Detach the barcode pick view from the currently connected HTML element. This releases the HTML element and removes any listeners or resources related to it.
     *
     * @since 6.22.0
     */
    detachFromElement(): void;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    /**
     * Starts the camera and the scanning process. Can be stopped by calling {@link BarcodePickView.stop}.
     *
     * @since 6.22.0
     */
    start(): Promise<void>;
    /**
     * Pauses the camera and the scanning process. It can be started again using {@link BarcodePickView.start}.
     *
     * @since 6.24.0
     */
    stop(): Promise<void>;
    /**
     * Freezes the camera and the highlights position to make the selection easier. The scanning can be started again using {@link BarcodePickView.start}.
     *
     * @since 6.23.0
     */
    freeze(): Promise<void>;
    /**
     * Notifies the barcode pick view that the container has paused.
     *
     * @since 7.5.0
     */
    pause(): Promise<void>;
    /**
     * Notifies the barcode pick view that the container has resumed.
     *
     * @since 7.5.0
     */
    resume(): Promise<void>;
    /**
     * Resets the picking flow. This will clear all picked items and restore the initial state.
     *
     * @since 8.1.0
     */
    reset(): Promise<void>;
    /**
     * Adds a {@link BarcodePickViewListener} to the mode. User actions will be notified to the listener.
     *
     * @since 6.23.0
     */
    addListener(listener: BarcodePickViewListener): void;
    /**
     * Removes a {@link BarcodePickViewListener}.
     *
     * @since 6.23.0
     */
    removeListener(listener: BarcodePickViewListener): void;
    /**
     * Adds a {@link BarcodePickActionListener} to the mode. User actions will be notified to the listener.
     *
     * @since 6.22.0
     */
    addActionListener(listener: BarcodePickActionListener): void;
    /**
     * Removes a {@link BarcodePickActionListener}.
     *
     * @since 6.22.0
     */
    removeActionListener(listener: BarcodePickActionListener): void;
    /**
     * Stops the camera and the scanning process. After this call the view should not be used anymore.
     *
     * @since 6.23.0
     */
    release(): void;
}

interface BarcodeArViewProps {
    context: DataCaptureContext;
    barcodeAr: BarcodeAr;
    settings: BarcodeArViewSettings;
    cameraSettings: CameraSettings;
    uiListener?: BarcodeArViewUiListener;
    annotationProvider?: BarcodeArAnnotationProvider;
    highlightProvider?: BarcodeArHighlightProvider;
}
/**
 * Barcode AR comes with a ready-to-use UI that allows highlighting barcodes and displaying additional information over them. The BarcodeArView integrates with any app in just a few lines of code.
 *
 * @since 8.2.0
 */
declare class BarcodeArView extends DefaultSerializeable {
    private viewId;
    private baseBarcodeArView;
    private htmlElement;
    private _htmlElementState;
    private domObserver;
    private scrollListener;
    constructor(props: BarcodeArViewProps);
    /**
     * Sets the listener which is called whenever a barcode highlight is tapped in the view.
     *
     * @since 8.2.0
     */
    get uiListener(): BarcodeArViewUiListener | null;
    set uiListener(value: BarcodeArViewUiListener | null);
    /**
     * Sets the provider which supplies annotation information for barcodes in the view. If *null*, no annotation will be displayed for any barcode.
     *
     * @since 8.2.0
     */
    get annotationProvider(): BarcodeArAnnotationProvider | null;
    set annotationProvider(value: BarcodeArAnnotationProvider | null);
    /**
     * Sets the provider which supplies highlight information for barcodes in the view. If *null*, a default provider is used, which returns a predefined highlight for each barcode.
     *
     * @since 8.2.0
     */
    get highlightProvider(): BarcodeArHighlightProvider | null;
    set highlightProvider(value: BarcodeArHighlightProvider | null);
    private orientationChangeListener;
    private set htmlElementState(value);
    private get htmlElementState();
    private setPositionAndSize;
    /**
     * Connect the barcode ar view to a given HTML element, so it’s size and position can be mirrored.
     *
     * @since 8.2.0
     */
    connectToElement(element: HTMLElement): Promise<void>;
    /**
     * Detach the barcode ar view from the currently connected HTML element. This releases the HTML element and removes any listeners or resources related to it.
     *
     * @since 8.2.0
     */
    detachFromElement(): Promise<void>;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    /**
     * Starts the scanning process.
     *
     * @since 8.2.0
     */
    start(): Promise<void>;
    /**
     * Stops the scanning process.
     *
     * On Android the highlights and annotations that are already shown are kept, and they are still there when scanning starts again. On iOS they are removed, and they are supplied again by the providers after the next start. Resetting or disposing the view removes them.
     *
     * @since 8.2.0
     */
    stop(): Promise<void>;
    /**
     * Pauses the scanning process.
     *
     * The highlights and annotations that are already shown are kept, so they stay tappable while the view is paused and when scanning starts again. Resetting or disposing the view removes them.
     *
     * @since 8.2.0
     */
    pause(): Promise<void>;
    /**
     * Clears all highlights and annotations currently visible and calls {@link BarcodeArView.highlightProvider} and {@link BarcodeArView.annotationProvider} to supply new highlights and annotations.
     *
     * @since 8.2.0
     */
    reset(): Promise<void>;
    /**
     * Indicates whether the torch control button should be shown to the user.
     *
     * Default is *false*.
     *
     * @since 8.2.0
     */
    get shouldShowTorchControl(): boolean;
    set shouldShowTorchControl(value: boolean);
    /**
     * Updates the position of the torch control button.
     *
     * Default is {@link Anchor.TopLeft}.
     *
     * @since 8.2.0
     */
    get torchControlPosition(): Anchor;
    set torchControlPosition(value: Anchor);
    /**
     * Indicates whether the zoom control button should be shown to the user.
     *
     * @since 8.2.0
     */
    get shouldShowZoomControl(): boolean;
    set shouldShowZoomControl(value: boolean);
    /**
     * Updates the position of the zoom control button.
     *
     * Default is {@link Anchor.BottomRight}.
     *
     * @since 8.2.0
     */
    get zoomControlPosition(): Anchor;
    set zoomControlPosition(value: Anchor);
    /**
     * Indicates whether the camera switch control button should be shown to the user.
     *
     * @since 8.2.0
     */
    get shouldShowCameraSwitchControl(): boolean;
    set shouldShowCameraSwitchControl(value: boolean);
    /**
     * Updates the position of the camera switch control button.
     *
     * Default is {@link Anchor.TopRight}.
     *
     * @since 8.2.0
     */
    get cameraSwitchControlPosition(): Anchor;
    set cameraSwitchControlPosition(value: Anchor);
    /**
     * Indicates whether the macro mode control button should be shown to the user.
     *
     * @since 8.2.0
     */
    get shouldShowMacroModeControl(): boolean;
    set shouldShowMacroModeControl(value: boolean);
    /**
     * Updates the position of the macro mode control button.
     *
     * Default is {@link Anchor.TopRight}.
     *
     * @since 8.2.0
     */
    get macroModeControlPosition(): Anchor;
    set macroModeControlPosition(value: Anchor);
    /**
     * Sets the visual offset of the torch control button.
     *
     * Assign null to reset the offset to its default position.
     *
     * @since 8.6.0
     */
    get torchControlOffset(): PointWithUnit | null;
    set torchControlOffset(value: PointWithUnit | null);
    /**
     * Sets the visual offset of the zoom control button.
     *
     * Assign null to reset the offset to its default position.
     *
     * @since 8.6.0
     */
    get zoomControlOffset(): PointWithUnit | null;
    set zoomControlOffset(value: PointWithUnit | null);
    /**
     * Sets the visual offset of the camera switch control button.
     *
     * Assign null to reset the offset to its default position.
     *
     * @since 8.6.0
     */
    get cameraSwitchControlOffset(): PointWithUnit | null;
    set cameraSwitchControlOffset(value: PointWithUnit | null);
    /**
     * Sets the visual offset of the macro mode control button.
     *
     * Assign null to reset the offset to its default position.
     *
     * @since 8.6.0
     */
    get macroModeControlOffset(): PointWithUnit | null;
    set macroModeControlOffset(value: PointWithUnit | null);
    /**
     * The style of the logo, either the extended “Scanning By Scandit” or the minimal “Scandit”.
     *
     * Default is {@link LogoStyle.Extended}.
     *
     * @since 8.6.0
     */
    get logoStyle(): LogoStyle;
    set logoStyle(value: LogoStyle);
    /**
     * Sets the orientation of the zoom control button.
     *
     * Default is {@link ZoomSwitchOrientation.Default}.
     *
     * @since 8.6.0
     */
    get zoomControlOrientation(): ZoomSwitchOrientation;
    set zoomControlOrientation(value: ZoomSwitchOrientation);
    /**
     * The anchor point used to position the Scandit logo. To shift the logo relative to the anchor, use {@link BarcodeArView.logoOffset}.
     *
     * Default is {@link Anchor.BottomRight}.
     *
     * @since 8.6.0
     */
    get logoAnchor(): Anchor;
    set logoAnchor(value: Anchor);
    /**
     * The offset applied to the Scandit logo relative to the {@link BarcodeArView.logoAnchor|logo anchor}. When specified in pixels ({@link MeasureUnit.Pixel}) the offset is used as-is. When specified as a fraction ({@link MeasureUnit.Fraction}) the offset is computed relative to the view size minus the scan area margins.
     *
     * Default is a zero offset.
     *
     * @since 8.6.0
     */
    get logoOffset(): PointWithUnit;
    set logoOffset(value: PointWithUnit);
}



interface ScanditBarcodePluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}

declare class ScanditBarcodePluginImplementation implements ScanditBarcodePluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
declare const ScanditBarcodePlugin: ScanditBarcodePluginImplementation;

export { BarcodeArView, BarcodeCountView, BarcodeFindView, BarcodePickView, ScanditBarcodePlugin, ScanditBarcodePluginImplementation, SparkScanView, TrackedBarcodeView };
export type { BarcodeBatchAdvancedOverlayListener, Optional, ScanditBarcodePluginInterface };
export { BarcodeBatchAdvancedOverlay };
