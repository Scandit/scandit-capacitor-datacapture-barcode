import { BarcodeDefaults } from 'scandit-datacapture-frameworks-barcode';
import { Optional } from '../../definitions';
import { CapacitorNativeCaller } from 'scandit-capacitor-datacapture-core';
export declare enum CapacitorFunction {
    GetDefaults = "getDefaults",
    SubscribeBarcodeBatchListener = "subscribeBarcodeBatchListener",
    UnsubscribeBarcodeBatchListener = "unsubscribeBarcodeBatchListener",
    FinishBarcodeBatchDidUpdateSession = "finishBarcodeBatchDidUpdateSession",
    SubscribeBarcodeBatchBasicOverlayListener = "subscribeBarcodeBatchBasicOverlayListener",
    UnsubscribeBarcodeBatchBasicOverlayListener = "unsubscribeBarcodeBatchBasicOverlayListener",
    SetBrushForTrackedBarcode = "setBrushForTrackedBarcode",
    ClearTrackedBarcodeBrushes = "clearTrackedBarcodeBrushes",
    SubscribeBarcodeBatchAdvancedOverlayListener = "subscribeBarcodeBatchAdvancedOverlayListener",
    UnsubscribeBarcodeBatchAdvancedOverlayListener = "unsubscribeBarcodeBatchAdvancedOverlayListener",
    SetViewForTrackedBarcode = "setViewForTrackedBarcode",
    SetAnchorForTrackedBarcode = "setAnchorForTrackedBarcode",
    SetOffsetForTrackedBarcode = "setOffsetForTrackedBarcode",
    ClearTrackedBarcodeViews = "clearTrackedBarcodeViews",
    ResetBarcodeBatchSession = "resetBarcodeBatchSession",
    SubscribeBarcodeCountListener = "registerBarcodeCountListener",
    UnsubscribeBarcodeCountListener = "unregisterBarcodeCountListener",
    ResetBarcodeCountSession = "resetBarcodeCountSession",
    StartBarcodeCountScanningPhase = "startScanningPhase",
    EndBarcodeCountScanningPhase = "endScanningPhase",
    SetBarcodeCountCaptureList = "setBarcodeCountCaptureList",
    SetBarcodeCaptureModeEnabledState = "setBarcodeCaptureModeEnabledState",
    SetBarcodeBatchModeEnabledState = "setBarcodeBatchModeEnabledState",
    UpdateBarcodeCaptureOverlay = "updateBarcodeCaptureOverlay",
    UpdateBarcodeCaptureMode = "updateBarcodeCaptureMode",
    ApplyBarcodeCaptureModeSettings = "applyBarcodeCaptureModeSettings",
    UpdateBarcodeBatchBasicOverlay = "updateBarcodeBatchBasicOverlay",
    UpdateBarcodeBatchAdvancedOverlay = "updateBarcodeBatchAdvancedOverlay",
    UpdateBarcodeBatchMode = "updateBarcodeBatchMode",
    ApplyBarcodeBatchModeSettings = "applyBarcodeBatchModeSettings",
    CreateBarcodeGenerator = "createBarcodeGenerator",
    DisposeBarcodeGenerator = "disposeBarcodeGenerator",
    GenerateFromBase64EncodedData = "generateFromBase64EncodedData",
    GenerateFromString = "generateFromString"
}
export declare const Capacitor: {
    pluginName: string;
    defaults: BarcodeDefaults;
    exec: (success: Optional<Function>, error: Optional<Function>, functionName: string, args: Optional<[
        any
    ]>) => void;
};
export interface CapacitorWindow extends Window {
    Scandit: any;
    Capacitor: any;
}
export declare const getDefaults: () => Promise<BarcodeDefaults>;
export declare const capacitorBarcodeNativeCaller: CapacitorNativeCaller;
