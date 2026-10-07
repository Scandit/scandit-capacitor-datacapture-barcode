import { TrackedBarcode } from 'scandit-datacapture-frameworks-barcode';
import { TrackedBarcodeView } from './TrackedBarcodeView';
import { Anchor, PointWithUnit } from 'scandit-capacitor-datacapture-core';
import { BarcodeBatchAdvancedOverlay } from './BarcodeBatchAdvancedOverlay';
export interface BarcodeBatchAdvancedOverlayListener {
    didTapViewForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): void;
    viewForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): Promise<TrackedBarcodeView | null>;
    anchorForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): Anchor;
    offsetForTrackedBarcode?(overlay: BarcodeBatchAdvancedOverlay, trackedBarcode: TrackedBarcode): PointWithUnit;
}
