import { TrackedBarcode } from 'scandit-datacapture-frameworks-barcode';
import { TrackedBarcodeView } from './TrackedBarcodeView';
import { Anchor, PointWithUnit } from 'scandit-capacitor-datacapture-core';
import { BarcodeTrackingAdvancedOverlay } from './BarcodeTrackingAdvancedOverlay';
export interface BarcodeTrackingAdvancedOverlayListener {
    didTapViewForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): void;
    viewForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): Promise<TrackedBarcodeView | null>;
    anchorForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): Anchor;
    offsetForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): PointWithUnit;
}
