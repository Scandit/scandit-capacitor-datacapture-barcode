/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */
package com.scandit.capacitor.datacapture.barcode;

import android.Manifest;
import android.graphics.Color;
import android.webkit.WebView;
import android.widget.FrameLayout;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginHandle;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.scandit.capacitor.datacapture.barcode.ar.BarcodeArViewHandler;
import com.scandit.capacitor.datacapture.barcode.count.BarcodeCountViewHandler;
import com.scandit.capacitor.datacapture.barcode.find.BarcodeFindViewHandler;
import com.scandit.capacitor.datacapture.barcode.pick.BarcodePickViewHandler;
import com.scandit.capacitor.datacapture.core.ScanditCaptureCoreNative;
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo;
import com.scandit.capacitor.datacapture.core.utils.CapacitorMethodCall;
import com.scandit.capacitor.datacapture.core.utils.CapacitorResult;
import com.scandit.datacapture.frameworks.barcode.BarcodeModule;
import com.scandit.datacapture.frameworks.barcode.ar.BarcodeArModule;
import com.scandit.datacapture.frameworks.barcode.batch.BarcodeBatchModule;
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule;
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule;
import com.scandit.datacapture.frameworks.barcode.find.BarcodeFindModule;
import com.scandit.datacapture.frameworks.barcode.generator.BarcodeGeneratorModule;
import com.scandit.datacapture.frameworks.barcode.pick.BarcodePickModule;
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule;
import com.scandit.datacapture.frameworks.barcode.spark.SparkScanModule;
import com.scandit.datacapture.frameworks.core.CoreModule;
import com.scandit.datacapture.frameworks.core.FrameworkModule;
import com.scandit.datacapture.frameworks.core.errors.ParameterNullError;
import com.scandit.datacapture.frameworks.core.events.Emitter;
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator;
import com.scandit.datacapture.frameworks.core.utils.DefaultFrameworksLog;
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread;
import com.scandit.datacapture.frameworks.core.utils.FrameworksLog;
import com.scandit.datacapture.frameworks.core.utils.MainThread;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(
    name = "ScanditBarcodeNative",
    permissions = {
      @Permission(
          strings = {Manifest.permission.CAMERA},
          alias = "camera")
    })
public class ScanditBarcodeNative extends Plugin implements Emitter {

  private static final String CORE_PLUGIN_NAME = "ScanditCaptureCoreNative";
  private static final String WRONG_INPUT = "Wrong input parameter";
  private static final String WEB_VIEW_NOT_ATTACHED = "WebView not attached yet";

  private final BarcodeModule barcodeModule;
  private final BarcodeCaptureModule barcodeCaptureModule;
  private final BarcodeBatchModule barcodeBatchModule;
  private final BarcodeSelectionModule barcodeSelectionModule;
  private final BarcodeCountModule barcodeCountModule;
  private final BarcodeFindModule barcodeFindModule;
  private final BarcodePickModule barcodePickModule;
  private final SparkScanModule sparkScanModule;
  private final BarcodeArModule barcodeArModule;
  private final BarcodeGeneratorModule barcodeGeneratorModule;

  private final BarcodeCountViewHandler barcodeCountViewHandler;
  private final BarcodeFindViewHandler barcodeFindViewHandler;
  private final BarcodePickViewHandler barcodePickViewHandler;
  private final BarcodeArViewHandler barcodeArViewHandler;

  private final FrameworksLog logger;
  private final MainThread mainThread;
  private final DefaultServiceLocator serviceLocator;

  public ScanditBarcodeNative() {
    this.barcodeModule = new BarcodeModule();
    this.barcodeCaptureModule = BarcodeCaptureModule.create(this);
    this.barcodeBatchModule = BarcodeBatchModule.create(this, null);
    this.barcodeSelectionModule = BarcodeSelectionModule.create(this);
    this.barcodeCountModule = BarcodeCountModule.create(this);
    this.barcodeFindModule = BarcodeFindModule.create(this);
    this.barcodePickModule = BarcodePickModule.create(this);
    this.sparkScanModule = SparkScanModule.create(this);
    this.barcodeArModule = BarcodeArModule.create(this);
    this.barcodeGeneratorModule = new BarcodeGeneratorModule();

    this.barcodeCountViewHandler = new BarcodeCountViewHandler();
    this.barcodeFindViewHandler = new BarcodeFindViewHandler();
    this.barcodePickViewHandler = new BarcodePickViewHandler();
    this.barcodeArViewHandler = new BarcodeArViewHandler();

    this.logger = DefaultFrameworksLog.getInstance();
    this.mainThread = DefaultMainThread.getInstance();
    this.serviceLocator = DefaultServiceLocator.getInstance();

    // Register modules with service locator
    serviceLocator.register(barcodeModule);
    serviceLocator.register(barcodeCaptureModule);
    serviceLocator.register(barcodeBatchModule);
    serviceLocator.register(barcodeSelectionModule);
    serviceLocator.register(barcodeCountModule);
    serviceLocator.register(barcodeFindModule);
    serviceLocator.register(barcodePickModule);
    serviceLocator.register(sparkScanModule);
    serviceLocator.register(barcodeGeneratorModule);
    serviceLocator.register(barcodeArModule);
  }

  @Override
  public void load() {
    super.load();

    // We need to register the plugin with its Core dependency for serializers to load.
    PluginHandle corePlugin = getBridge().getPlugin(CORE_PLUGIN_NAME);
    if (corePlugin != null) {
      ((ScanditCaptureCoreNative) corePlugin.getInstance())
          .registerPluginInstance(getPluginHandle().getInstance());
    } else {
      logger.error("Core not found");
    }

    mainThread.runOnMainThread(
        () -> {
          barcodeCountViewHandler.attachWebView(getBridge().getWebView());
          barcodeFindViewHandler.attachWebView(getBridge().getWebView());
          barcodePickViewHandler.attachWebView(getBridge().getWebView(), getBridge().getActivity());
        });

    barcodeModule.onCreate(getContext());
    barcodeCaptureModule.onCreate(getContext());
    barcodeBatchModule.onCreate(getContext());
    barcodeSelectionModule.onCreate(getContext());
    barcodeCountModule.onCreate(getContext());
    barcodeFindModule.onCreate(getContext());
    barcodePickModule.onCreate(getContext());
    sparkScanModule.onCreate(getContext());
    barcodeGeneratorModule.onCreate(getContext());
    barcodeArModule.onCreate(getContext());
  }

  @Override
  protected void handleOnDestroy() {
    barcodeModule.onDestroy();
    barcodeCaptureModule.onDestroy();
    barcodeBatchModule.onDestroy();
    barcodeSelectionModule.onDestroy();
    barcodeCountModule.onDestroy();
    barcodeFindModule.onDestroy();
    barcodePickModule.onDestroy();
    sparkScanModule.onDestroy();
    barcodeGeneratorModule.onDestroy();
    barcodeArModule.onDestroy();
  }

  private boolean checkCameraPermission() {
    return getPermissionState("camera") == PermissionState.GRANTED;
  }

  private void checkOrRequestCameraPermissions(PluginCall call) {
    if (!checkCameraPermission()) {
      requestPermissionForAlias("camera", call, "onCameraPermissionResult");
    } else {
      onCameraPermissionResult(call);
    }
  }

  @SuppressWarnings("unused")
  @PermissionCallback
  private void onCameraPermissionResult(PluginCall call) {
    if (checkCameraPermission()) {
      call.resolve();
      return;
    }

    call.reject("Camera permissions not granted.");
  }

  @Override
  public void emit(@NonNull String eventName, @NonNull Map<String, Object> payload) {
    JSObject capacitorPayload = new JSObject();
    capacitorPayload.put("name", eventName);
    capacitorPayload.put("data", new JSONObject(payload).toString());

    notifyListeners(eventName, capacitorPayload);
  }

  @Override
  public boolean hasListenersForEvent(@NonNull String eventName) {
    return this.hasListeners(eventName);
  }

  @Override
  public boolean hasViewSpecificListenersForEvent(int viewId, @NonNull String eventName) {
    return this.hasListenersForEvent(eventName);
  }

  @Override
  public boolean hasModeSpecificListenersForEvent(int modeId, @NonNull String eventName) {
    return this.hasListenersForEvent(eventName);
  }

  @PluginMethod
  public void getDefaults(PluginCall call) {
    try {
      JSObject defaults = JSObject.fromJSONObject(new JSONObject(barcodeModule.getDefaults()));
      call.resolve(defaults);
    } catch (JSONException e) {
      call.reject("Failed to get defaults: " + e.getMessage());
    }
  }

  // region BarcodeCount

  @PluginMethod
  public void createBarcodeCountView(PluginCall call) {
    String viewJson = call.getData().getString("viewJson");
    if (viewJson == null) {
      call.reject(WRONG_INPUT, "Missing or invalid viewJson");
      return;
    }

    Object barcodeCountView = barcodeCountModule.getViewFromJson(viewJson);
    if (barcodeCountView == null) {
      call.reject("Unable to create the BarcodeCountView from the given json=" + viewJson);
      return;
    }

    mainThread.runOnMainThread(
        () -> {
          barcodeCountViewHandler.attachBarcodeCountView(
              barcodeCountView, getBridge().getActivity());
          barcodeCountViewHandler.render();
          call.resolve();
        });
  }

  @PluginMethod
  public void removeBarcodeCountView(PluginCall call) {
    mainThread.runOnMainThread(
        () -> {
          barcodeCountModule.viewDisposed(getViewId(call));
          barcodeCountViewHandler.disposeCurrentView();
        });
    call.resolve();
  }

  @PluginMethod
  public void setBarcodeCountViewPositionAndSize(PluginCall call) {
    Double top = call.getDouble("top");
    if (top == null) {
      call.reject("Missing top position");
      return;
    }

    Double left = call.getDouble("left");
    if (left == null) {
      call.reject("Missing left position");
      return;
    }

    Double width = call.getDouble("width");
    if (width == null) {
      call.reject("Missing width");
      return;
    }

    Double height = call.getDouble("height");
    if (height == null) {
      call.reject("Missing height");
      return;
    }

    Boolean shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView");
    if (shouldBeUnderWebView == null) {
      shouldBeUnderWebView = false;
    }

    barcodeCountViewHandler.setResizeAndMoveInfo(
        new ResizeAndMoveInfo(
            top.floatValue(),
            left.floatValue(),
            width.floatValue(),
            height.floatValue(),
            shouldBeUnderWebView));
    call.resolve();
  }

  // endregion

  // region Barcode Find

  @PluginMethod
  public void createFindView(PluginCall call) {
    String viewJson = call.getData().getString("json");
    if (viewJson == null) {
      call.reject("missing parameter for createFindView()");
      return;
    }

    FrameLayout container = barcodeFindViewHandler.prepareContainer(getContext());

    mainThread.runOnMainThread(
        () -> {
          barcodeFindModule.addViewToContainer(container, viewJson, new CapacitorResult(call));
          barcodeFindViewHandler.addBarcodeFindViewContainer(
              getViewId(call), container, getBridge().getActivity());
        });
  }

  @PluginMethod
  public void removeFindView(PluginCall call) {
    int viewId = getViewId(call);
    barcodeFindModule.viewDisposed(viewId);
    barcodeFindViewHandler.disposeContainer(viewId);
    call.resolve();
  }

  @PluginMethod
  public void setFindViewPositionAndSize(PluginCall call) {
    Double top = call.getDouble("top");
    if (top == null) {
      call.reject("Missing top position");
      return;
    }

    Double left = call.getDouble("left");
    if (left == null) {
      call.reject("Missing left position");
      return;
    }

    Double width = call.getDouble("width");
    if (width == null) {
      call.reject("Missing width");
      return;
    }

    Double height = call.getDouble("height");
    if (height == null) {
      call.reject("Missing height");
      return;
    }

    Boolean shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView");
    if (shouldBeUnderWebView == null) {
      shouldBeUnderWebView = false;
    }

    barcodeFindViewHandler.setResizeAndMoveInfo(
        new ResizeAndMoveInfo(
            top.floatValue(),
            left.floatValue(),
            width.floatValue(),
            height.floatValue(),
            shouldBeUnderWebView));
    call.resolve();
  }

  // endregion

  // region BarcodePick

  @PluginMethod
  public void createPickView(PluginCall call) {
    String viewJson = call.getString("json");

    if (viewJson != null) {
      FrameLayout container = barcodePickViewHandler.prepareContainer(getContext());

      mainThread.runOnMainThread(
          () -> {
            barcodePickModule.addViewToContainer(container, viewJson, new CapacitorResult(call));
            barcodePickViewHandler.addBarcodePickViewContainer(
                container, getBridge().getActivity());
            barcodePickViewHandler.render();
          });
      call.resolve();
    } else {
      call.reject("missing parameter for createPickView()");
    }
  }

  @PluginMethod
  public void removePickView(PluginCall call) {
    barcodePickModule.pickViewRelease(getViewId(call), new CapacitorResult(call));
    barcodePickViewHandler.disposeCurrentView();
  }

  @PluginMethod
  public void setPickViewPositionAndSize(PluginCall call) {
    Double top = call.getDouble("top");
    if (top == null) {
      call.reject("Missing top position");
      return;
    }

    Double left = call.getDouble("left");
    if (left == null) {
      call.reject("Missing left position");
      return;
    }

    Double width = call.getDouble("width");
    if (width == null) {
      call.reject("Missing width");
      return;
    }

    Double height = call.getDouble("height");
    if (height == null) {
      call.reject("Missing height");
      return;
    }

    Boolean shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView");
    if (shouldBeUnderWebView == null) {
      shouldBeUnderWebView = false;
    }

    barcodePickViewHandler.setResizeAndMoveInfo(
        new ResizeAndMoveInfo(
            top.floatValue(),
            left.floatValue(),
            width.floatValue(),
            height.floatValue(),
            shouldBeUnderWebView));
    call.resolve();
  }

  // endregion

  @PluginMethod
  public void createSparkScanView(PluginCall call) {
    WebView container = getBridge().getWebView();
    if (container == null) {
      call.reject(WEB_VIEW_NOT_ATTACHED);
      return;
    }

    String viewJson = call.getData().getString("viewJson");
    if (viewJson == null) {
      viewJson = "";
    }

    final String finalViewJson = viewJson;
    container.post(
        () ->
            sparkScanModule.addViewToContainer(
                container, finalViewJson, new CapacitorResult(call)));

    checkOrRequestCameraPermissions(call);
  }

  // region BarcodeAr

  @PluginMethod
  public void createBarcodeArView(PluginCall call) {
    String viewJson = call.getData().getString("viewJson");
    if (viewJson == null) {
      call.reject(WRONG_INPUT, "Missing or invalid viewJson");
      return;
    }

    final String finalViewJson = viewJson;
    mainThread.runOnMainThread(
        () -> {
          FrameLayout container = new FrameLayout(getBridge().getContext());
          container.setMinimumHeight(getBridge().getWebView().getHeight());
          container.setMinimumWidth(getBridge().getWebView().getWidth());
          container.setBackgroundColor(Color.TRANSPARENT);

          barcodeArModule.addViewToContainer(container, finalViewJson, new CapacitorResult(call));

          // Assume the view was added successfully - the container should have children now
          if (container.getChildCount() > 0) {
            android.view.View nativeView = container.getChildAt(0);
            Object tag = nativeView.getTag();
            int viewId = (tag instanceof Integer) ? (Integer) tag : 0;

            barcodeArViewHandler.addBarcodeArViewContainer(viewId, container, getBridge());

            call.resolve();
          } else {
            call.reject("Unable to create the native BarcodeArModule");
          }
        });
  }

  @PluginMethod
  public void removeBarcodeArView(PluginCall call) {
    int viewId = getViewId(call);
    mainThread.runOnMainThread(
        () -> {
          barcodeArModule.viewDisposed(viewId);
          barcodeArViewHandler.disposeContainer(viewId);
        });
    call.resolve();
  }

  @PluginMethod
  public void setArViewPositionAndSize(PluginCall call) {
    Double top = call.getDouble("top");
    if (top == null) {
      call.reject("Missing top position");
      return;
    }

    Double left = call.getDouble("left");
    if (left == null) {
      call.reject("Missing left position");
      return;
    }

    Double width = call.getDouble("width");
    if (width == null) {
      call.reject("Missing width");
      return;
    }

    Double height = call.getDouble("height");
    if (height == null) {
      call.reject("Missing height");
      return;
    }

    Boolean shouldBeUnderWebView = call.getBoolean("shouldBeUnderWebView");
    if (shouldBeUnderWebView == null) {
      shouldBeUnderWebView = false;
    }

    barcodeArViewHandler.setResizeAndMoveInfo(
        new ResizeAndMoveInfo(
            top.floatValue(),
            left.floatValue(),
            width.floatValue(),
            height.floatValue(),
            shouldBeUnderWebView));
    call.resolve();
  }

  // endregion

  private int getViewId(PluginCall call) {
    try {
      return call.getData().getInt("viewId");
    } catch (JSONException e) {
      return 0;
    }
  }

  @PluginMethod
  public void executeBarcode(PluginCall call) {
    String moduleName = call.getData().getString("moduleName");
    if (moduleName == null) {
      call.reject(new ParameterNullError("moduleName").getMessage());
      return;
    }

    CoreModule coreModule = (CoreModule) serviceLocator.resolve(CoreModule.class.getSimpleName());
    if (coreModule == null) {
      call.reject("Unable to retrieve the CoreModule from the locator.");
      return;
    }

    FrameworkModule targetModule = serviceLocator.resolve(moduleName);
    if (targetModule == null) {
      call.reject("Unable to retrieve the " + moduleName + " from the locator.");
      return;
    }

    boolean result =
        coreModule.execute(new CapacitorMethodCall(call), new CapacitorResult(call), targetModule);

    if (!result) {
      String methodName = call.getData().getString("methodName");
      if (methodName == null) {
        methodName = "unknown";
      }
      call.reject("Unknown method: " + methodName);
    }
  }
}
