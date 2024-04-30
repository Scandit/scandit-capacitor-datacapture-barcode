import { BarcodePick, BarcodePickViewSettings, BarcodePickActionListener } from 'scandit-datacapture-frameworks-barcode';
import { CameraSettings, DataCaptureContext, DefaultSerializeable } from 'scandit-datacapture-frameworks-core';
interface BarcodePickViewProps {
    context: DataCaptureContext;
    barcodePick: BarcodePick;
    settings: BarcodePickViewSettings;
    cameraSettings: CameraSettings;
    style: any;
}
export declare class BarcodePickView extends DefaultSerializeable {
    private baseBarcodePickView;
    private viewProxy;
    private htmlElement;
    private _htmlElementState;
    private domObserver;
    private scrollListener;
    constructor(props: BarcodePickViewProps);
    private orientationChangeListener;
    private set htmlElementState(value);
    private get htmlElementState();
    connectToElement(element: HTMLElement): void;
    detachFromElement(): void;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    start(): void;
    pause(): void;
    addActionListener(listener: BarcodePickActionListener): void;
    removeActionListener(listener: BarcodePickActionListener): void;
}
export {};
