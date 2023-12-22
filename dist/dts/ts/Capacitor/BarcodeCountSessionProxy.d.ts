import { BarcodeCountSessionProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeCountSessionProxy implements BarcodeCountSessionProxy {
    getSpatialMap(): Promise<string | null>;
    getSpatialMapWithHints(expectedNumberOfRows: number, expectedNumberOfColumns: number): Promise<string | null>;
    resetSession(): Promise<void>;
}
export interface SpatialDataResult {
    data: string | null;
}
