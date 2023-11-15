import { CameraSettings } from '../../../../scandit-capacitor-datacapture-core/src/ts/Camera+Related';
import { Color } from '../../../../scandit-capacitor-datacapture-core/src/ts/Common';
import { Feedback } from '../../../../scandit-capacitor-datacapture-core/src/ts/Feedback';
import { SymbologyDescription, SymbologySettings, } from '../Barcode';
import { barcodeCountDefaultsFromJSON } from './BarcodeCountDefaults';
export const defaultsFromJSON = (json) => {
    const defaults = {
        SymbologySettings: Object.keys(json.SymbologySettings)
            .reduce((settings, identifier) => {
            settings[identifier] = SymbologySettings
                .fromJSON(JSON.parse(json.SymbologySettings[identifier]));
            return settings;
        }, {}),
        SymbologyDescriptions: json.SymbologyDescriptions.map(description => SymbologyDescription.fromJSON(JSON.parse(description))),
        CompositeTypeDescriptions: json.CompositeTypeDescriptions.map(description => JSON.parse(description)),
        BarcodeCapture: {
            BarcodeCaptureOverlay: {
                defaultStyle: json.BarcodeCapture.BarcodeCaptureOverlay.defaultStyle,
                DefaultBrush: {
                    fillColor: Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.fillColor),
                    strokeColor: Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeColor),
                    strokeWidth: json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeWidth,
                },
                Brushes: Object
                    .keys(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].strokeColor),
                                strokeWidth: json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].strokeWidth,
                            },
                        } });
                }, {}),
            },
            BarcodeCaptureSettings: {
                codeDuplicateFilter: json.BarcodeCapture.BarcodeCaptureSettings.codeDuplicateFilter,
            },
            RecommendedCameraSettings: CameraSettings
                .fromJSON(json.BarcodeCapture.RecommendedCameraSettings),
        },
        BarcodeTracking: {
            RecommendedCameraSettings: CameraSettings
                .fromJSON(json.BarcodeTracking.RecommendedCameraSettings),
            BarcodeTrackingBasicOverlay: {
                defaultStyle: json.BarcodeTracking.BarcodeTrackingBasicOverlay.defaultStyle,
                Brushes: Object
                    .keys(json.BarcodeTracking.BarcodeTrackingBasicOverlay.Brushes)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].strokeColor),
                                strokeWidth: json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].strokeWidth,
                            },
                        } });
                }, {}),
            },
        },
        BarcodeSelection: {
            RecommendedCameraSettings: CameraSettings
                .fromJSON(json.BarcodeSelection.RecommendedCameraSettings),
            Feedback: ({
                selection: Feedback
                    .fromJSON(JSON.parse(json.BarcodeSelection.Feedback).selection),
            }),
            BarcodeSelectionSettings: {
                codeDuplicateFilter: json.BarcodeSelection.BarcodeSelectionSettings.codeDuplicateFilter,
                singleBarcodeAutoDetection: json.BarcodeSelection.BarcodeSelectionSettings.singleBarcodeAutoDetection,
                selectionType: fromJSON => fromJSON(JSON.parse(json.BarcodeSelection.BarcodeSelectionSettings.selectionType)),
            },
            BarcodeSelectionTapSelection: {
                defaultFreezeBehavior: json.BarcodeSelection.BarcodeSelectionTapSelection
                    .defaultFreezeBehavior,
                defaultTapBehavior: json.BarcodeSelection.BarcodeSelectionTapSelection
                    .defaultTapBehavior,
            },
            BarcodeSelectionAimerSelection: {
                defaultSelectionStrategy: fromJSON => fromJSON(JSON.parse(json.BarcodeSelection.BarcodeSelectionAimerSelection.defaultSelectionStrategy)),
            },
            BarcodeSelectionBasicOverlay: {
                defaultStyle: json.BarcodeSelection
                    .BarcodeSelectionBasicOverlay.defaultStyle,
                styles: Object
                    .keys(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultTrackedBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.strokeWidth,
                            },
                            DefaultAimedBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.strokeWidth,
                            },
                            DefaultSelectedBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.strokeWidth,
                            },
                            DefaultSelectingBrush: {
                                fillColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.fillColor),
                                strokeColor: Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.strokeWidth,
                            },
                        } });
                }, {}),
            },
        },
        BarcodeCount: barcodeCountDefaultsFromJSON(json)
    };
    return defaults;
};
//# sourceMappingURL=Defaults.js.map