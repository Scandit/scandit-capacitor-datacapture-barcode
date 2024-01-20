import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
import { Anchor } from 'scandit-datacapture-frameworks-core';
import { BarcodeTrackingAdvancedOverlayProxy } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeTrackingAdvancedOverlayView } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeTrackingAdvancedOverlayProxy extends BaseNativeProxy implements BarcodeTrackingAdvancedOverlayProxy {
    private static capacitorExec;
    isModeEnabled: () => boolean;
    constructor();
    setBrushForTrackedBarcode(brushJson: string, trackedBarcodeIdentifer: number, sessionFrameSequenceId: number): Promise<void>;
    setViewForTrackedBarcode(viewJson: string | null, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number): Promise<void>;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number): Promise<void>;
    setOffsetForTrackedBarcode(offsetJson: string, trackedBarcodeIdentifer: number, sessionFrameSequenceID: number): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    registerListenerForAdvancedOverlayEvents(): void;
    unregisterListenerForAdvancedOverlayEvents(): void;
    subscribeViewForTrackedBarcode(): void;
    subscribeAnchorForTrackedBarcode(): void;
    subscribeOffsetForTrackedBarcode(): void;
    subscribeDidTapViewForTrackedBarcode(): void;
    getJSONStringForView(view: BarcodeTrackingAdvancedOverlayView | null): object | string | null;
    private notifyListeners;
}
