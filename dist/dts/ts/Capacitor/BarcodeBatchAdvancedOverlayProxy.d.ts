import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
import { Anchor } from 'scandit-datacapture-frameworks-core';
import { BarcodeBatchAdvancedOverlayProxy } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeBatchAdvancedOverlayView } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeBatchAdvancedOverlayProxy extends BaseNativeProxy implements BarcodeBatchAdvancedOverlayProxy {
    private static capacitorExec;
    isModeEnabled: () => boolean;
    constructor();
    setBrushForTrackedBarcode(brushJson: string, trackedBarcodeIdentifer: number, sessionFrameSequenceId: number | null): Promise<void>;
    setViewForTrackedBarcode(viewJson: string | null, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number | null): Promise<void>;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number | null): Promise<void>;
    setOffsetForTrackedBarcode(offsetJson: string, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number | null): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    updateBarcodeBatchAdvancedOverlay(overlayJson: string): Promise<void>;
    registerListenerForAdvancedOverlayEvents(): void;
    unregisterListenerForAdvancedOverlayEvents(): void;
    subscribeViewForTrackedBarcode(): void;
    subscribeAnchorForTrackedBarcode(): void;
    subscribeOffsetForTrackedBarcode(): void;
    subscribeDidTapViewForTrackedBarcode(): void;
    getJSONStringForView(view: BarcodeBatchAdvancedOverlayView | null): object | string | null;
    private notifyListeners;
}
