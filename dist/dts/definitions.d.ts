export { Barcode, Checksum, CompositeFlag, CompositeType, EncodingRange, LocalizedOnlyBarcode, Range, Symbology, SymbologyDescription, SymbologySettings, TrackedBarcode, TargetBarcode } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelection, BarcodeSelectionSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCapture, BarcodeCaptureSettings, BarcodeCaptureFeedback, BarcodeCaptureOverlay, BarcodeCaptureOverlayStyle, BarcodeCaptureSession } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionAimerSelection, BarcodeSelectionAutoSelectionStrategy, BarcodeSelectionBasicOverlay, BarcodeSelectionBasicOverlayStyle, BarcodeSelectionFeedback } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionFreezeBehavior, BarcodeSelectionManualSelectionStrategy, BarcodeSelectionSession, BarcodeSelectionTapBehavior, BarcodeSelectionTapSelection } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeTracking, BarcodeTrackingScenario, BarcodeTrackingSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeTrackingBasicOverlay, BarcodeTrackingBasicOverlayStyle, BarcodeTrackingSession } from 'scandit-datacapture-frameworks-barcode';
export { TrackedBarcodeView, } from './ts/TrackedBarcodeView';
export { BarcodeCount, BarcodeCountFeedback, BarcodeCountSession, BarcodeCountSettings, BarcodeCountViewStyle } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCountView } from './ts/BarcodeCountView';
export { BarcodeCountToolbarSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeCountCaptureList, BarcodeCountCaptureListSession } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeFilterSettings, BarcodeFilterHighlightType, BarcodeFilterHighlightSettingsBrush } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeTrackingBasicOverlayListener, BarcodeSelectionListener, BarcodeCountCaptureListListener } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeSelectionType, BarcodeCountListener, BarcodeCaptureListener, BarcodeFilterHighlightSettings } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeTrackingListener, BarcodeSelectionStrategy, StructuredAppendData } from 'scandit-datacapture-frameworks-barcode';
export { ArucoDictionary, ArucoDictionaryPreset, ArucoMarker } from 'scandit-datacapture-frameworks-barcode';
export { BarcodeTrackingAdvancedOverlayListener } from './ts/BarcodeTrackingAdvancedOverlayListener';
export { BarcodeTrackingAdvancedOverlay } from './ts/BarcodeTrackingAdvancedOverlay';
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
    finishBarcodeCountListenerOnScan(): Promise<void>;
    createView(data: any): Promise<void>;
    updateView(data: {
        View: any;
    }): Promise<void>;
    updateMode(data: {
        BarcodeCount: any;
    }): Promise<void>;
    setViewPositionAndSize(data: any): Promise<void>;
    showView(): Promise<void>;
    hideView(): Promise<void>;
    registerBarcodeCountListener(): Promise<void>;
    unregisterBarcodeCountListener(): Promise<void>;
    registerBarcodeCountViewListener(): Promise<void>;
    unregisterBarcodeCountViewListener(): Promise<void>;
    registerBarcodeCountViewUiListener(): Promise<void>;
    unregisterBarcodeCountViewUiListener(): Promise<void>;
    setBarcodeCountCaptureList(data: {
        TargetBarcodes: any[];
    }): Promise<void>;
    resetBarcodeCountSession(): Promise<void>;
    resetBarcodeCount(): Promise<void>;
    startScanningPhase(): Promise<void>;
    endScanningPhase(): Promise<void>;
    clearBarcodeCountViewHighlights(): Promise<void>;
    finishBarcodeCountViewListenerBrushForRecognizedBarcode(data: {
        brush: string | null;
        trackedBarcodeId: number;
    }): Promise<void>;
    finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList(data: {
        brush: string | null;
        trackedBarcodeId: number;
    }): Promise<void>;
    finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode(data: {
        brush: string | null;
        trackedBarcodeId: number;
    }): Promise<void>;
    getSpatialMap(): Promise<any>;
    getSpatialMapWithHints(data: {
        expectedNumberOfRows: number;
        expectedNumberOfColumns: number;
    }): Promise<any>;
    setBarcodeCountModeEnabledState(data: {
        enabled: boolean;
    }): void;
}
export interface ScanditBarcodeSelectionNativeInterface {
    selectAimedBarcode(): Promise<void>;
    unselectBarcodes(barcodesStr: string): Promise<void>;
    setSelectBarcodeEnabled(barcodeStr: string, _enabled: boolean): Promise<void>;
    increaseCountForBarcodes(barcodeStr: string): Promise<void>;
    subscribeBrushForAimedBarcode(): void;
    subscribeBrushForTrackedBarcode(): void;
    setBarcodeSelectionModeEnabledState(data: {
        enabled: boolean;
    }): void;
    getCountForBarcodeInBarcodeSelectionSession(data: {
        selectionIdentifier: string;
    }): Promise<{
        data: number;
    }>;
    resetBarcodeSelectionSession(): Promise<void>;
    subscribeBarcodeSelectionListener(): void;
    finishBarcodeSelectionDidSelect(data: {
        enabled: boolean;
    }): void;
    finishBarcodeSelectionDidUpdateSession(data: {
        enabled: boolean;
    }): void;
    unsubscribeBarcodeSelectionListener(): void;
    setTextForAimToSelectAutoHint(text: string): Promise<void>;
    removeAimedBarcodeBrushProvider(): Promise<void>;
    setAimedBarcodeBrushProvider(): Promise<void>;
    finishBrushForAimedBarcode(brushStr: string | null, selectionIdentifier: string): Promise<void>;
    removeTrackedBarcodeBrushProvider(): Promise<void>;
    setTrackedBarcodeBrushProvider(): Promise<void>;
    finishBrushForTrackedBarcode(brushStr: string | null, selectionIdentifier: string): Promise<void>;
}
