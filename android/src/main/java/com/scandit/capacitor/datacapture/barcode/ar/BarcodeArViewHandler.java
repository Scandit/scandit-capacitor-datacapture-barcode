/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.ar;

import static com.scandit.capacitor.datacapture.core.utils.CapacitorExtensions.*;

import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import com.getcapacitor.Bridge;
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo;
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread;
import com.scandit.datacapture.frameworks.core.utils.MainThread;
import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BarcodeArViewHandler {

  private final MainThread mainThread;
  private final Map<Integer, WeakReference<FrameLayout>> containers;
  private final Map<Integer, Boolean> containerVisibility;
  private ResizeAndMoveInfo latestInfo;
  private WeakReference<View> webViewReference;

  public BarcodeArViewHandler() {
    this(DefaultMainThread.getInstance());
  }

  public BarcodeArViewHandler(MainThread mainThread) {
    this.mainThread = mainThread;
    this.containers = new ConcurrentHashMap<>();
    this.containerVisibility = new ConcurrentHashMap<>();
    this.latestInfo = new ResizeAndMoveInfo(0f, 0f, 0f, 0f, false);
    this.webViewReference = new WeakReference<>(null);
  }

  public void addBarcodeArViewContainer(int viewId, FrameLayout container, Bridge bridge) {
    if (containers.containsKey(viewId)) {
      WeakReference<FrameLayout> existingRef = containers.remove(viewId);
      if (existingRef != null) {
        FrameLayout existingContainer = existingRef.get();
        if (existingContainer != null) {
          removeView(existingContainer);
        }
      }
    }

    containers.put(viewId, new WeakReference<>(container));
    containerVisibility.put(viewId, true);

    bridge.executeOnMainThread(
        () -> {
          ViewGroup parent = (ViewGroup) bridge.getWebView().getParent();
          ViewGroup.LayoutParams layoutParams =
              new ViewGroup.LayoutParams(
                  ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
          // Add container to the same parent of the WebView
          parent.addView(container, layoutParams);

          webViewReference = new WeakReference<>(bridge.getWebView());
        });
  }

  public void setResizeAndMoveInfo(ResizeAndMoveInfo info) {
    latestInfo = info;
    mainThread.runOnMainThread(
        () -> {
          // Re-render all containers with the new info
          for (Map.Entry<Integer, WeakReference<FrameLayout>> entry : containers.entrySet()) {
            int viewId = entry.getKey();
            WeakReference<FrameLayout> containerRef = entry.getValue();
            FrameLayout container = containerRef.get();
            if (container != null) {
              Boolean visibility = containerVisibility.get(viewId);
              renderNoAnimate(container, visibility != null && visibility);
            }
          }
        });
  }

  public void disposeContainer(int viewId) {
    mainThread.runOnMainThread(
        () -> {
          WeakReference<FrameLayout> containerRef = containers.remove(viewId);
          if (containerRef != null) {
            FrameLayout container = containerRef.get();
            if (container != null) {
              removeView(container);
            }
          }
        });

    containerVisibility.remove(viewId);

    if (containers.isEmpty()) {
      mainThread.runOnMainThread(() -> bringWebViewToFront());
    }
  }

  private void removeView(View view) {
    mainThread.runOnMainThread(() -> removeFromParent(view));
  }

  private void bringWebViewToFront() {
    View webView = webViewReference.get();
    if (webView != null) {
      webView.bringToFront();
    }
  }

  private void renderNoAnimate(FrameLayout container, boolean isVisible) {
    container.post(
        () -> {
          if (latestInfo.getWidth() == 0f || latestInfo.getHeight() == 0f) {
            container.setVisibility(View.GONE);
            return;
          }

          container.setVisibility(isVisible ? View.VISIBLE : View.GONE);
          container.setX(pxFromDp(latestInfo.getLeft()));
          container.setY(pxFromDp(latestInfo.getTop()));
          ViewGroup.LayoutParams params = container.getLayoutParams();
          params.width = (int) pxFromDp(latestInfo.getWidth());
          params.height = (int) pxFromDp(latestInfo.getHeight());

          View webView = webViewReference.get();
          if (latestInfo.getShouldBeUnderWebView()) {
            if (webView != null) {
              webView.bringToFront();
              ((View) webView.getParent()).setTranslationZ(1F);
            }
          } else {
            container.bringToFront();
            if (webView != null) {
              ((View) webView.getParent()).setTranslationZ(-1F);
            }
          }
          container.requestLayout();
        });
  }
}
