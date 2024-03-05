import { BarcodeSelectionProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeSelectionProxy implements BarcodeSelectionProxy {
    private static exec;
    unfreezeCamera(): Promise<void>;
    resetMode(): Promise<void>;
    selectAimedBarcode(): Promise<void>;
    unselectBarcodes(barcodesStr: string): Promise<void>;
    setSelectBarcodeEnabled(barcodeStr: string, enabled: boolean): Promise<void>;
    increaseCountForBarcodes(barcodeStr: string): Promise<void>;
    setModeEnabledState(enabled: boolean): void;
}
