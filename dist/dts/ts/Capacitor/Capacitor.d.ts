import { BarcodeDefaults } from 'scandit-datacapture-frameworks-barcode';
import { Optional } from '../../definitions';
export declare enum CapacitorFunction {
    GetDefaults = "getDefaults",
    SubscribeBarcodeCaptureListener = "subscribeBarcodeCaptureListener",
    FinishBarcodeCaptureDidScan = "finishBarcodeCaptureDidScan",
    FinishBarcodeCaptureDidUpdateSession = "finishBarcodeCaptureDidUpdateSession",
    SubscribeBarcodeTrackingListener = "subscribeBarcodeTrackingListener",
    UnsubscribeBarcodeTrackingListener = "unsubscribeBarcodeTrackingListener",
    FinishBarcodeTrackingDidUpdateSession = "finishBarcodeTrackingDidUpdateSession",
    SubscribeBarcodeTrackingBasicOverlayListener = "subscribeBarcodeTrackingBasicOverlayListener",
    UnsubscribeBarcodeTrackingBasicOverlayListener = "unsubscribeBarcodeTrackingBasicOverlayListener",
    SetBrushForTrackedBarcode = "setBrushForTrackedBarcode",
    ClearTrackedBarcodeBrushes = "clearTrackedBarcodeBrushes",
    SubscribeBarcodeTrackingAdvancedOverlayListener = "subscribeBarcodeTrackingAdvancedOverlayListener",
    UnsubscribeBarcodeTrackingAdvancedOverlayListener = "unsubscribeBarcodeTrackingAdvancedOverlayListener",
    SetViewForTrackedBarcode = "setViewForTrackedBarcode",
    SetAnchorForTrackedBarcode = "setAnchorForTrackedBarcode",
    SetOffsetForTrackedBarcode = "setOffsetForTrackedBarcode",
    ClearTrackedBarcodeViews = "clearTrackedBarcodeViews",
    SubscribeBarcodeSelectionListener = "subscribeBarcodeSelectionListener",
    GetCountForBarcodeInBarcodeSelectionSession = "getCountForBarcodeInBarcodeSelectionSession",
    ResetBarcodeCaptureSession = "resetBarcodeCaptureSession",
    ResetBarcodeTrackingSession = "resetBarcodeTrackingSession",
    ResetBarcodeSelectionSession = "resetBarcodeSelectionSession",
    ResetBarcodeSelection = "resetBarcodeSelection",
    UnfreezeCameraInBarcodeSelection = "unfreezeCameraInBarcodeSelection",
    SubscribeBarcodeCountListener = "registerBarcodeCountListener",
    UnsubscribeBarcodeCountListener = "unregisterBarcodeCountListener",
    ResetBarcodeCountSession = "resetBarcodeCountSession",
    StartBarcodeCountScanningPhase = "startScanningPhase",
    EndBarcodeCountScanningPhase = "endScanningPhase",
    SetBarcodeCountCaptureList = "setBarcodeCountCaptureList",
    SetBarcodeCaptureModeEnabledState = "setBarcodeCaptureModeEnabledState",
    SetBarcodeTrackingModeEnabledState = "setBarcodeTrackingModeEnabledState",
    UpdateBarcodeCaptureOverlay = "updateBarcodeCaptureOverlay",
    UpdateBarcodeCaptureMode = "updateBarcodeCaptureMode",
    ApplyBarcodeCaptureModeSettings = "applyBarcodeCaptureModeSettings",
    UpdateBarcodeTrackingBasicOverlay = "updateBarcodeTrackingBasicOverlay",
    UpdateBarcodeTrackingAdvancedOverlay = "updateBarcodeTrackingAdvancedOverlay",
    UpdateBarcodeTrackingMode = "updateBarcodeTrackingMode",
    ApplyBarcodeTrackingModeSettings = "applyBarcodeTrackingModeSettings"
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
