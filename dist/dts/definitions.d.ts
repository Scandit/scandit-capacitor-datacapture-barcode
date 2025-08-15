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
export { BarcodePick, BarcodePickActionCallback, BarcodePickActionListener, BarcodePickAsyncMapperProductProvider, BarcodePickAsyncMapperProductProviderCallback, BarcodePickProduct, BarcodePickProductProvider, BarcodePickProductProviderCallback, BarcodePickProductProviderCallbackItem } from 'scandit-datacapture-frameworks-barcode';
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
    setPickViewPositionAndSize(data: any): Promise<void>;
}
