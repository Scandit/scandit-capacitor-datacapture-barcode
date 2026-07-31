/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.count;

import static com.scandit.capacitor.datacapture.core.utils.CapacitorExtensions.*;

import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import androidx.appcompat.app.AppCompatActivity;
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo;
import com.scandit.datacapture.barcode.count.ui.view.BarcodeCountView;
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread;
import com.scandit.datacapture.frameworks.core.utils.MainThread;
import java.lang.ref.WeakReference;

public class BarcodeCountViewHandler {

  private final MainThread mainThread;
  private ResizeAndMoveInfo latestInfo;
  private WeakReference<BarcodeCountView> barcodeCountViewReference;
  private WeakReference<View> webViewReference;

  public BarcodeCountViewHandler() {
    this(DefaultMainThread.getInstance());
  }

  public BarcodeCountViewHandler(MainThread mainThread) {
    this.mainThread = mainThread;
    this.latestInfo = new ResizeAndMoveInfo(0f, 0f, 600f, 600f, false);
    this.barcodeCountViewReference = null;
    this.webViewReference = null;
  }

  public BarcodeCountView getCurrentBarcodeCountView() {
    return barcodeCountViewReference != null ? barcodeCountViewReference.get() : null;
  }

  private View getWebView() {
    return webViewReference != null ? webViewReference.get() : null;
  }

  public void attachBarcodeCountView(Object barcodeCountView, AppCompatActivity activity) {
    BarcodeCountView view = (BarcodeCountView) barcodeCountView;
    if (getCurrentBarcodeCountView() != view) {
      disposeCurrentView();
      addBarcodeCountView(view, activity);
    }
  }

  public void attachWebView(View webView) {
    if (getWebView() != webView) {
      webViewReference = new WeakReference<>(webView);
      webView.bringToFront();
      webView.setBackgroundColor(Color.TRANSPARENT);
    }
  }

  public void setResizeAndMoveInfo(ResizeAndMoveInfo info) {
    latestInfo = info;
    render();
  }

  public void disposeCurrentView() {
    BarcodeCountView view = getCurrentBarcodeCountView();
    if (view == null) {
      return;
    }
    removeBarcodeCountView(view);
  }

  private void addBarcodeCountView(BarcodeCountView barcodeCountView, AppCompatActivity activity) {
    barcodeCountViewReference = new WeakReference<>(barcodeCountView);

    mainThread.runOnMainThread(
        () -> {
          activity.addContentView(
              barcodeCountView,
              new ViewGroup.LayoutParams(
                  ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
          render();
        });
  }

  private void removeBarcodeCountView(BarcodeCountView barcodeCountView) {
    barcodeCountViewReference = null;
    removeView(
        barcodeCountView,
        () -> {
          barcodeCountView.setListener(null);
          barcodeCountView.setUiListener(null);
        });
  }

  private void removeView(View view, Runnable uiBlock) {
    mainThread.runOnMainThread(
        () -> {
          removeFromParent(view);
          if (uiBlock != null) {
            uiBlock.run();
          }
        });
  }

  // Update the view visibility, position and size.
  public void render() {
    BarcodeCountView view = getCurrentBarcodeCountView();
    if (view == null) {
      return;
    }
    renderNoAnimate(view);
  }

  private void renderNoAnimate(BarcodeCountView barcodeCountView) {
    barcodeCountView.post(
        () -> {
          barcodeCountView.setVisibility(View.VISIBLE);
          barcodeCountView.setX(pxFromDp(latestInfo.getLeft()));
          barcodeCountView.setY(pxFromDp(latestInfo.getTop()));
          ViewGroup.LayoutParams params = barcodeCountView.getLayoutParams();
          params.width = (int) pxFromDp(latestInfo.getWidth());
          params.height = (int) pxFromDp(latestInfo.getHeight());

          View webView = getWebView();
          if (latestInfo.getShouldBeUnderWebView()) {
            if (webView != null) {
              webView.bringToFront();
              ((View) webView.getParent()).setTranslationZ(1F);
            }
          } else {
            barcodeCountView.bringToFront();
            if (webView != null) {
              ((View) webView.getParent()).setTranslationZ(-1F);
            }
          }
          barcodeCountView.requestLayout();
        });
  }
}
