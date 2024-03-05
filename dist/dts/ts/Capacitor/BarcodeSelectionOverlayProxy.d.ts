import { BarcodeSelectionOverlayProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeSelectionOverlayProxy extends BaseNativeProxy implements BarcodeSelectionOverlayProxy {
    isModeEnabled: () => boolean;
    setTextForAimToSelectAutoHint(text: string): Promise<void>;
    removeAimedBarcodeBrushProvider(): Promise<void>;
    setAimedBarcodeBrushProvider(): Promise<void>;
    finishBrushForAimedBarcodeCallback(brushStr: string | null, selectionIdentifier: string): void;
    removeTrackedBarcodeBrushProvider(): Promise<void>;
    setTrackedBarcodeBrushProvider(): Promise<void>;
    finishBrushForTrackedBarcodeCallback(brushStr: string | null, selectionIdentifier: string): void;
    subscribeBrushForTrackedBarcode(): void;
    subscribeBrushForAimedBarcode(): void;
    private notifyListeners;
}
