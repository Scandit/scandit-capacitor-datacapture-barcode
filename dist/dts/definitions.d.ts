export { Barcode, Checksum, CompositeFlag, CompositeType, EncodingRange, LocalizedOnlyBarcode, Range, Symbology, SymbologyDescription, SymbologySettings, TrackedBarcode, TargetBarcode } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelection, BarcodeSelectionSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCapture, BarcodeCaptureSettings, BarcodeCaptureFeedback, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureSession } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionTapBehavior, BarcodeSelectionTapSelection } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeBatch, BarcodeBatchScenario, BarcodeBatchSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeBatchBasicOverlay, BarcodeBatchBasicOverlayStyle, BarcodeBatchSession } from 'scandit-datacapture-frameworks-barcode';
export { TrackedBarcodeView, } from './ts/TrackedBarcodeView';
export { BarcodeCount, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountViewStyle } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCountView } from './ts/BarcodeCountView';
export { BarcodeCountToolbarSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCountCaptureList, BarcodeCountCaptureListSession } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeFilterSettings, BarcodeFilterHighlightType, BarcodeFilterHighlightSettingsBrush } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeBatchBasicOverlayListener, BarcodeSelectionListener, BarcodeCountCaptureListListener, BarcodeCountNotInListActionSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionType, BarcodeCountListener, BarcodeCaptureListener, BarcodeFilterHighlightSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeBatchListener, BarcodeSelectionStrategy, StructuredAppendData } from 'scandit-datacapture-frameworks-barcode';
export { ArucoDictionary, ArucoDictionaryPreset, ArucoMarker } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeBatchAdvancedOverlayListener } from './ts/BarcodeBatchAdvancedOverlayListener';
export { BarcodeBatchAdvancedOverlay } from './ts/BarcodeBatchAdvancedOverlay';
export { BarcodeFind, BarcodeFindFeedback, BarcodeFindItem, BarcodeFindItemContent, BarcodeFindItemSearchOptions } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeFindListener, BarcodeFindSettings, BarcodeFindViewSettings, BarcodeFindViewUiListener, BarcodeFindTransformer } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeFindView } from './ts/BarcodeFindView';
export { SparkScan, SparkScanListener, SparkScanPreviewBehavior, SparkScanScanningBehavior, SparkScanScanningMode, SparkScanScanningModeDefault, SparkScanScanningModeTarget } from 'scandit-datacapture-frameworks-barcode';
export { SparkScanSettings, SparkScanViewState, SparkScanViewSettings, SparkScanSession, SparkScanToastSettings, BatterySavingMode, SparkScanMiniPreviewSize } from 'scandit-datacapture-frameworks-barcode';
export { SparkScanBarcodeFeedback, SparkScanBarcodeSuccessFeedback, SparkScanBarcodeErrorFeedback, SparkScanFeedbackDelegate, SparkScanViewUiListener } from 'scandit-datacapture-frameworks-barcode';
export { SparkScanView } from './ts/SparkScanView';
export { BarcodePickView } from './ts/BarcodePickView';
export { BarcodePick, BarcodePickActionCallback, BarcodePickActionListener, BarcodePickAsyncMapperProductProvider, BarcodePickAsyncMapperProductProviderCallback, BarcodePickIconStyle, BarcodePickProduct, BarcodePickProductProvider, BarcodePickProductProviderCallback, BarcodePickProductProviderCallbackItem } from 'scandit-datacapture-frameworks-barcode';
export { BarcodePickScanningListener, BarcodePickScanningSession, BarcodePickSettings, BarcodePickState, BarcodePickViewHighlightStyle, BarcodePickViewListener, BarcodePickViewSettings, BarcodePickViewUiListener } from 'scandit-datacapture-frameworks-barcode';
export { Dot, DotWithIcons, Rectangular, RectangularWithIcons, BarcodePickStatusIconSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeGenerator, BarcodeGeneratorBuilder, Code39BarcodeGeneratorBuilder, Code128BarcodeGeneratorBuilder, Ean13BarcodeGeneratorBuilder } from 'scandit-datacapture-frameworks-barcode';
export { UpcaBarcodeGeneratorBuilder, InterleavedTwoOfFiveBarcodeGeneratorBuilder, QrCodeBarcodeGeneratorBuilder, DataMatrixBarcodeGeneratorBuilder, QrCodeErrorCorrectionLevel, AztecBarcodeGeneratorBuilder } from 'scandit-datacapture-frameworks-barcode';
export type Optional<T> = T | null;
export interface SymbologySettingsJSON {
    enabled: boolean;
    colorInvertedEnabled: boolean;
    activeSymbolCounts: number[];
    checksums: string[];
    extensions: string[];
}
export interface RangeJSON {
    minimum: number;
    maximum: number;
    step: number;
}
export interface SymbologyDescriptionJSON {
    identifier: string;
    readableName: string;
    isAvailable: boolean;
    isColorInvertible: boolean;
    activeSymbolCountRange: RangeJSON;
    defaultSymbolCountRange: RangeJSON;
    supportedExtensions: string[];
}
export interface SymbologySettingsDefaults {
    [key: string]: SymbologySettingsJSON;
}
export type SymbologyDescriptions = SymbologyDescriptionJSON[];
export interface ScanditBarcodePluginInterface {
    initialize(coreDefaults: any): Promise<any>;
}
export interface ScanditBarcodeCountNativeInterface {
    barcodeCountViewEnableHardwareTrigger({ hardwareTriggerKeyCode }: {
        hardwareTriggerKeyCode: number | null;
    }): Promise<void>;
}
export interface ScanditBarcodeFindNativeInterface {
    updateFindMode(data: {
        BarcodeFind: string;
    }): Promise<void>;
    barcodeFindModeStart(): Promise<void>;
    barcodeFindModePause(): Promise<void>;
    barcodeFindModeStop(): Promise<void>;
    registerBarcodeFindListener(): Promise<void>;
    unregisterBarcodeFindListener(): Promise<void>;
    setBarcodeFindModeEnabledState(data: {
        enabled: boolean;
    }): void;
    registerBarcodeFindViewListener(): Promise<void>;
    unregisterBarcodeFindViewListener(): Promise<void>;
    barcodeFindViewStartSearching(): Promise<void>;
    barcodeFindViewStopSearching(): Promise<void>;
    barcodeFindViewPauseSearching(): Promise<void>;
    barcodeFindSetItemList(data: {
        BarcodeFindItemList: string;
    }): Promise<void>;
    createFindView(viewJson: object): Promise<void>;
    updateFindView(barcodeFindViewJson: {
        BarcodeFindView: string;
    }): Promise<void>;
    removeFindView(): Promise<void>;
    showFindView(): Promise<void>;
    hideFindView(): Promise<void>;
    setBarcodeTransformer(): Promise<void>;
    submitBarcodeFindTransformerResult(data: {
        transformedBarcode: string | null;
    }): Promise<void>;
    updateBarcodeFindFeedback(data: {
        feedbackJson: string;
    }): Promise<void>;
}
export interface ScanditBarcodePickNativeInterface {
    finishOnProductIdentifierForItems(data: {
        itemsJson: string;
    }): Promise<void>;
    viewStart(): Promise<void>;
    viewFreeze(): Promise<void>;
    pickViewStop(): Promise<void>;
    registerBarcodePickViewUiListener(): Promise<void>;
    unregisterBarcodePickViewUiListener(): Promise<void>;
    addActionListener(): Promise<void>;
    removeActionListener(): Promise<void>;
    addScanningListener(): Promise<void>;
    removeScanningListener(): Promise<void>;
    addViewListener(): Promise<void>;
    removeViewListener(): Promise<void>;
    finishPickAction(data: {
        code: string;
        result: boolean;
    }): Promise<void>;
    findNodeHandle(data: {
        data: {
            view?: string | undefined;
        };
    }): Promise<{
        data: number;
    }>;
    createPickView(data: {
        json: string;
    }): Promise<void>;
    removePickView(): Promise<void>;
    updatePickView(data: {
        json: string;
    }): Promise<void>;
    setPickViewPositionAndSize(data: any): Promise<void>;
}
export interface ScanditSparkScantNativeInterface {
    unregisterSparkScanViewListenerEvents(): Promise<void>;
    registerSparkScanViewListenerEvents(): Promise<void>;
    prepareSparkScanViewScanning(): Promise<void>;
    startSparkScanViewScanning(): Promise<void>;
    pauseSparkScanViewScanning(): Promise<void>;
    stopSparkScanViewScanning(): Promise<void>;
    finishSparkScanDidUpdateSessionCallback(data: {
        enabled: boolean;
    }): Promise<void>;
    finishSparkScanDidScanCallback(data: {
        enabled: boolean;
    }): Promise<void>;
    registerSparkScanListenerForEvents(): void;
    unregisterSparkScanListenerForEvents(): unknown;
    setSparkScanModeEnabledState(data: {
        enabled: boolean;
    }): void;
    updatSparkScanMode(data: {
        sparkScanJson: string;
    }): Promise<void>;
    resetSession(): Promise<void>;
    createSparkScanView(data: {
        viewJson: string;
    }): Promise<void>;
    disposeSparkScanView(): Promise<void>;
    updateSparkScanView(data: {
        View: any;
    }): Promise<void>;
    updateSparkScanMode(data: {
        SparkScan: any;
    }): Promise<void>;
    showSparkScanView(): Promise<void>;
    hideSparkScanView(): Promise<void>;
    addSparkScanFeedbackDelegate(): Promise<void>;
    removeSparkScanFeedbackDelegate(): Promise<void>;
    submitSparkScanFeedbackForBarcode(data: {
        feedbackJson: string;
    }): Promise<void>;
    showToast(data: {
        text: string;
    }): Promise<void>;
}
