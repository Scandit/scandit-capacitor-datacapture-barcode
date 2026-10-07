import { BarcodeDefaults } from 'scandit-datacapture-frameworks-barcode';
import { Optional } from '../../definitions';
export declare const Capacitor: {
    pluginName: string;
    defaults: BarcodeDefaults;
    exec: (success: Optional<Function>, error: Optional<Function>, functionName: string, args: Optional<[
        any
    ]>) => void;
};
export interface CapacitorWindow extends Window {
    Scandit: any;
    Capacitor: any;
}
export declare const getDefaults: () => Promise<BarcodeDefaults>;
