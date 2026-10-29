/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.find;

import static com.scandit.capacitor.datacapture.core.utils.CapacitorExtensions.*;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo;
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread;
import com.scandit.datacapture.frameworks.core.utils.MainThread;
import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class BarcodeFindViewHandler {

  private final MainThread mainThread;
  private final Map<Integer, WeakReference<FrameLayout>> containers;
  private final Map<Integer, Boolean> containerVisibility;
  private WeakReference<View> webViewReference;
  private ResizeAndMoveInfo latestInfo;

  public BarcodeFindViewHandler() {
    this(DefaultMainThread.getInstance());
  }

  public BarcodeFindViewHandler(MainThread mainThread) {
    this.mainThread = mainThread;
    this.containers = new ConcurrentHashMap<>();
    this.containerVisibility = new ConcurrentHashMap<>();
    this.webViewReference = null;
    this.latestInfo = new ResizeAndMoveInfo(0f, 0f, 600f, 600f, false);
  }

  public void setResizeAndMoveInfo(ResizeAndMoveInfo info) {
    latestInfo = info;
    render();
  }

  private void render() {
    for (WeakReference<FrameLayout> containerRef : containers.values()) {
      FrameLayout container = containerRef.get();
      if (container != null) {
        Boolean visibility = true;
        for (Map.Entry<Integer, WeakReference<FrameLayout>> entry : containers.entrySet()) {
          if (entry.getValue().get() == container) {
            visibility = containerVisibility.get(entry.getKey());
            break;
          }
        }
        renderNoAnimate(container, visibility != null && visibility);
      }
    }
  }

  private View getWebView() {
    return webViewReference != null ? webViewReference.get() : null;
  }

  public FrameLayout prepareContainer(Context context) {
    return new FrameLayout(context);
  }

  public void addBarcodeFindViewContainer(
      int viewId, FrameLayout container, AppCompatActivity activity) {
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

    addContainer(viewId, container, activity);
  }

  public void attachWebView(View webView) {
    if (getWebView() != webView) {
      webViewReference = new WeakReference<>(webView);
      mainThread.runOnMainThread(
          () -> {
            webView.bringToFront();
            webView.setBackgroundColor(Color.TRANSPARENT);
          });
    }
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
      mainThread.runOnMainThread(() -> setWebViewVisible());
    }
  }

  private void addContainer(int viewId, FrameLayout container, AppCompatActivity activity) {
    mainThread.runOnMainThread(
        () -> {
          activity.addContentView(
              container,
              new ViewGroup.LayoutParams(
                  ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
          Boolean visibility = containerVisibility.get(viewId);
          renderNoAnimate(container, visibility != null && visibility);
        });
  }

  private void removeView(View view) {
    mainThread.runOnMainThread(() -> removeFromParent(view));
  }

  private void renderNoAnimate(FrameLayout container, boolean isVisible) {
    container.post(
        () -> {
          container.setVisibility(isVisible ? View.VISIBLE : View.GONE);
          container.setX(pxFromDp(latestInfo.getLeft()));
          container.setY(pxFromDp(latestInfo.getTop()));
          ViewGroup.LayoutParams params = container.getLayoutParams();
          params.width = (int) pxFromDp(latestInfo.getWidth());
          params.height = (int) pxFromDp(latestInfo.getHeight());

          View webView = getWebView();
          if (latestInfo.getShouldBeUnderWebView()) {
            if (webView != null) {
              webView.bringToFront();
              ((View) webView.getParent()).setTranslationZ(1F);
            }
          } else {
            if (isVisible) {
              container.bringToFront();
              if (webView != null) {
                ((View) webView.getParent()).setTranslationZ(-1F);
              }
            } else {
              setWebViewVisible();
            }
          }
          container.requestLayout();
        });
  }

  private void setWebViewVisible() {
    View webView = getWebView();
    if (webView != null) {
      webView.bringToFront();
      ((View) webView.getParent()).setTranslationZ(1F);
    }
  }

  private void setWebViewInvisible() {
    View webView = getWebView();
    if (webView != null) {
      ((View) webView.getParent()).setTranslationZ(-1F);
    }
  }
}
