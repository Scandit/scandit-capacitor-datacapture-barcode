import { Anchor, DataCaptureOverlay, DataCaptureView, PointWithUnit } from 'scandit-datacapture-frameworks-core';
import { BarcodeBatch, TrackedBarcode } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeBatchAdvancedOverlayListener } from './BarcodeBatchAdvancedOverlayListener';
import { TrackedBarcodeView } from './TrackedBarcodeView';
export declare class BarcodeBatchAdvancedOverlay implements DataCaptureOverlay {
    private baseBarcodeBatchOverlay;
    private get type();
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    get listener(): BarcodeBatchAdvancedOverlayListener | null;
    set listener(listener: BarcodeBatchAdvancedOverlayListener | null);
    static withBarcodeBatchForView(barcodeBatch: BarcodeBatch, view: DataCaptureView | null): BarcodeBatchAdvancedOverlay;
    private constructor();
    setViewForTrackedBarcode(view: Promise<TrackedBarcodeView | null>, trackedBarcode: TrackedBarcode): Promise<void>;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcode: TrackedBarcode): Promise<void>;
    setOffsetForTrackedBarcode(offset: PointWithUnit, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    toJSON(): object;
}
