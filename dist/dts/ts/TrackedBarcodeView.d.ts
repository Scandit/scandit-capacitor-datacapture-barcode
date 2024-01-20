import { Size } from 'scandit-datacapture-frameworks-core';
import { DefaultSerializeable } from 'scandit-datacapture-frameworks-core';
import { Optional } from '../definitions';
export interface PrivateTrackedBarcodeView {
    data: string;
    toJSON(): string;
    getEncodedImageData(element: HTMLElement): string;
}
export interface TrackedBarcodeViewOptions {
    size?: Size;
    scale?: number;
}
export declare class TrackedBarcodeView extends DefaultSerializeable {
    private data;
    private options;
    static withHTMLElement(element: HTMLElement, options: Optional<TrackedBarcodeViewOptions>): Promise<TrackedBarcodeView>;
    static withBase64EncodedData(data: string, options: Optional<TrackedBarcodeViewOptions>): Promise<TrackedBarcodeView>;
    private static getEncodedImageData;
    private static getSize;
    private static getSVGDataForElement;
    private static getCanvasWithSize;
    private static getBase64DataForSVG;
    private constructor();
}
