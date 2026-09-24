import { Anchor, DataCaptureOverlay, PointWithUnit } from 'scandit-datacapture-frameworks-core';
import { BarcodeBatch, TrackedBarcode } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeBatchAdvancedOverlayListener } from './BarcodeBatchAdvancedOverlayListener';
import { TrackedBarcodeView } from './TrackedBarcodeView';
import { DataCaptureView } from 'scandit-capacitor-datacapture-core';
export declare class BarcodeBatchAdvancedOverlay implements DataCaptureOverlay {
    private baseBarcodeBatchOverlay;
    private get type();
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    get listener(): BarcodeBatchAdvancedOverlayListener | null;
    set listener(listener: BarcodeBatchAdvancedOverlayListener | null);
    /**
     * @deprecated Since 7.6. This factory will be removed in 8.0.
     * Create the overlay and add it to the view manually instead:
     * ```ts
     * const overlay = new BarcodeBatchAdvancedOverlay();
     * view.addOverlay(overlay);
     * ```
     */
    static withBarcodeBatchForView(barcodeBatch: BarcodeBatch, view: DataCaptureView | null): BarcodeBatchAdvancedOverlay;
    constructor(mode: BarcodeBatch);
    setViewForTrackedBarcode(view: Promise<TrackedBarcodeView | null>, trackedBarcode: TrackedBarcode): Promise<void>;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcode: TrackedBarcode): Promise<void>;
    setOffsetForTrackedBarcode(offset: PointWithUnit, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    toJSON(): object;
}
