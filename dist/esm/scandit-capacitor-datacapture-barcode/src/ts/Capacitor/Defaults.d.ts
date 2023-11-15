import { CameraSettings } from '../../../../scandit-capacitor-datacapture-core/src/ts/Camera+Related';
import { CameraSettingsDefaultsJSON } from '../../../../scandit-capacitor-datacapture-core/src/ts/Capacitor/Defaults';
import { Color } from '../../../../scandit-capacitor-datacapture-core/src/ts/Common';
import { PrivateCompositeTypeDescription, SymbologyDescription, SymbologySettings } from '../Barcode';
import { BarcodeCountDefaults, BarcodeCountDefaultsJSON } from './BarcodeCountDefaults';
declare type BarcodeCaptureOverlayStyle = any;
declare type BarcodeTrackingBasicOverlayStyle = any;
declare type BarcodeSelectionFeedback = any;
declare type BarcodeSelectionFreezeBehavior = any;
declare type BarcodeSelectionTapBehavior = any;
declare type BarcodeSelectionStrategy = any;
declare type BarcodeSelectionType = any;
declare type BarcodeSelectionBasicOverlayStyle = any;
export interface Defaults {
    SymbologySettings: {
        [key: string]: SymbologySettings;
    };
    SymbologyDescriptions: SymbologyDescription[];
    CompositeTypeDescriptions: PrivateCompositeTypeDescription[];
    BarcodeCapture: {
        BarcodeCaptureOverlay: {
            defaultStyle: BarcodeCaptureOverlayStyle;
            Brushes: any;
            DefaultBrush: {
                fillColor: Color;
                strokeColor: Color;
                strokeWidth: number;
            };
        };
        BarcodeCaptureSettings: {
            codeDuplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettings;
    };
    BarcodeTracking: {
        RecommendedCameraSettings: CameraSettings;
        BarcodeTrackingBasicOverlay: {
            defaultStyle: BarcodeTrackingBasicOverlayStyle;
            Brushes: any;
        };
    };
    BarcodeSelection: {
        RecommendedCameraSettings: CameraSettings;
        Feedback: BarcodeSelectionFeedback;
        BarcodeSelectionSettings: {
            codeDuplicateFilter: number;
            singleBarcodeAutoDetection: boolean;
            selectionType: (fromJSON: Function) => BarcodeSelectionType;
        };
        BarcodeSelectionTapSelection: {
            defaultFreezeBehavior: BarcodeSelectionFreezeBehavior;
            defaultTapBehavior: BarcodeSelectionTapBehavior;
        };
        BarcodeSelectionAimerSelection: {
            defaultSelectionStrategy: (fromJSON: Function) => BarcodeSelectionStrategy;
        };
        BarcodeSelectionBasicOverlay: {
            defaultStyle: BarcodeSelectionBasicOverlayStyle;
            styles: any;
        };
    };
    BarcodeCount: BarcodeCountDefaults;
}
export interface DefaultsJSON {
    SymbologySettings: {
        [key: string]: string;
    };
    SymbologyDescriptions: string[];
    CompositeTypeDescriptions: string[];
    BarcodeCapture: {
        BarcodeCaptureOverlay: {
            defaultStyle: string;
            Brushes: any;
            DefaultBrush: {
                fillColor: string;
                strokeColor: string;
                strokeWidth: number;
            };
        };
        BarcodeCaptureSettings: {
            codeDuplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
    };
    BarcodeTracking: {
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
        BarcodeTrackingBasicOverlay: {
            defaultStyle: string;
            Brushes: any;
        };
    };
    BarcodeSelection: {
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
        Feedback: string;
        BarcodeSelectionSettings: {
            codeDuplicateFilter: number;
            singleBarcodeAutoDetection: boolean;
            selectionType: string;
        };
        BarcodeSelectionTapSelection: {
            defaultFreezeBehavior: string;
            defaultTapBehavior: string;
        };
        BarcodeSelectionAimerSelection: {
            defaultSelectionStrategy: string;
        };
        BarcodeSelectionBasicOverlay: {
            defaultStyle: string;
            styles: any;
        };
    };
    BarcodeCount: BarcodeCountDefaultsJSON;
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;
export {};
