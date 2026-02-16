import { BarcodeNativeCallerProvider, BarcodeProxyType } from 'scandit-datacapture-frameworks-barcode';
import { NativeCaller } from 'scandit-datacapture-frameworks-core';
export declare class CapacitorBarcodeNativeCallerProvider implements BarcodeNativeCallerProvider {
    getNativeCaller(_proxyType: BarcodeProxyType): NativeCaller;
}
