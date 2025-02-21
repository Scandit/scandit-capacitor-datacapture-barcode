/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(ScanditCapacitorBarcode, "ScanditBarcodeNative",
           CAP_PLUGIN_METHOD(getDefaults, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBarcodeCaptureListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCaptureDidScan, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCaptureDidUpdateSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBarcodeBatchListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unsubscribeBarcodeBatchListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeBatchDidUpdateSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBarcodeBatchBasicOverlayListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unsubscribeBarcodeBatchBasicOverlayListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBarcodeBatchAdvancedOverlayListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unsubscribeBarcodeBatchAdvancedOverlayListener,
                             CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishCallback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBrushForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearTrackedBarcodeBrushes, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setViewForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setAnchorForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setOffsetForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearTrackedBarcodeViews, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBarcodeSelectionListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unsubscribeBarcodeSelectionListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeSelection, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeCaptureSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeBatchSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeSelectionSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unfreezeCameraInBarcodeSelection, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeSelectionDidSelect, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeSelectionDidUpdateSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getCountForBarcodeInBarcodeSelectionSession, CAPPluginReturnPromise);
           // Barcode Count
           CAP_PLUGIN_METHOD(registerBarcodeCountListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerBarcodeCountViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerBarcodeCountViewUiListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unegisterBarcodeCountListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterBarcodeCountViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterBarcodeCountViewUiListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setViewPositionAndSize, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hideView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeCount, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetBarcodeCountSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startScanningPhase, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(endScanningPhase, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearBarcodeCountViewHighlights, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeCountCaptureList, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCountListenerOnScan, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCountViewListenerBrushForRecognizedBarcode,
                             CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList,
                             CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCountViewListenerOnBrushForAcceptedBarcode,
                             CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBarcodeCountViewListenerOnBrushForRejectedBarcode,
                             CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeFindModeEnabledState, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeCountModeEnabledState, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeCountFeedback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeBatchModeEnabledState, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeSelectionModeEnabledState, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeCaptureModeEnabledState, CAPPluginReturnPromise);
           // Barcode Find
           CAP_PLUGIN_METHOD(createFindView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeFindView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateFindView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateFindMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerBarcodeFindListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterBarcodeFindListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerBarcodeFindViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterBarcodeFindViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindViewOnPause, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindViewOnResume, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindSetItemList, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindViewStopSearching, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindViewStartSearching, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindViewPauseSearching, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindModeStart, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindModePause, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(barcodeFindModeStop, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showFindView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hideFindView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setTextForAimToSelectAutoHint, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeAimedBarcodeBrushProvider, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setAimedBarcodeBrushProvider, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBrushForAimedBarcodeCallback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeTrackedBarcodeBrushProvider, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setTrackedBarcodeBrushProvider, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishBrushForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(selectAimedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unselectBarcodes, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setSelectBarcodeEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(increaseCountForBarcodes, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBrushForAimedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeBrushForTrackedBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getSpatialMap, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getSpatialMapWithHints, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setBarcodeTransformer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(submitBarcodeFindTransformerResult, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeFindFeedback, CAPPluginReturnPromise);
           // Barcode Pick
           CAP_PLUGIN_METHOD(createPickView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updatePickView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removePickView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addActionListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeActionListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addScanningListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeScanningListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeViewListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerBarcodePickViewUiListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterBarcodePickViewUiListener, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishOnProductIdentifierForItems, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setPickViewPositionAndSize, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(viewStop, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(viewStart, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(viewFreeze, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishPickAction, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(findNodeHandle, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showPickView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hidePickView, CAPPluginReturnPromise);
           // new deserialization architecture
           CAP_PLUGIN_METHOD(updateBarcodeCaptureOverlay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeCaptureMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(applyBarcodeCaptureModeSettings, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeSelectionBasicOverlay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeSelectionMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(applyBarcodeSelectionModeSettings, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeSelectionFeedback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeBatchBasicOverlay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeBatchAdvancedOverlay, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateBarcodeBatchMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(applyBarcodeBatchModeSettings, CAPPluginReturnPromise);
           // SparkScan
           CAP_PLUGIN_METHOD(createSparkScanView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disposeSparkScanView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateSparkScanView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateSparkScanMode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showSparkScanView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hideSparkScanView, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerSparkScanListenerForEvents, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterSparkScanListenerForEvents, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setSparkScanModeEnabledState, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishSparkScanDidUpdateSessionCallback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(finishSparkScanDidScanCallback, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(registerSparkScanViewListenerEvents, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unregisterSparkScanViewListenerEvents, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(prepareSparkScanViewScanning, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startSparkScanViewScanning, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(pauseSparkScanViewScanning, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(stopSparkScanViewScanning, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addSparkScanFeedbackDelegate, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeSparkScanFeedbackDelegate, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(submitSparkScanFeedbackForBarcode, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(showToast, CAPPluginReturnPromise);
           // Generator
           CAP_PLUGIN_METHOD(createBarcodeGenerator, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(generateFromBase64EncodedData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(generateFromString, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disposeBarcodeGenerator, CAPPluginReturnPromise);)
