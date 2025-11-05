import { BarcodeCountViewProxy } from 'scandit-datacapture-frameworks-barcode';
import { AdvancedNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeCountViewProxy extends AdvancedNativeProxy implements Partial<BarcodeCountViewProxy> {
    $enableBarcodeCountHardwareTrigger({ hardwareTriggerKeyCode }: {
        hardwareTriggerKeyCode: number | null;
    }): Promise<void>;
}
