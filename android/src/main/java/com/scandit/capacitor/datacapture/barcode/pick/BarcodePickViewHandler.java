package com.scandit.capacitor.datacapture.barcode.pick;

import static com.scandit.capacitor.datacapture.core.utils.CapacitorExtensions.*;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import androidx.appcompat.app.AppCompatActivity;
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo;
import com.scandit.datacapture.barcode.pick.ui.BarcodePickView;
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread;
import com.scandit.datacapture.frameworks.core.utils.MainThread;
import java.lang.ref.WeakReference;

public class BarcodePickViewHandler {

  private final MainThread mainThread;
  private ResizeAndMoveInfo latestInfo;
  private WeakReference<FrameLayout> barcodePickViewContainerReference;
  private WeakReference<View> webViewReference;

  public BarcodePickViewHandler() {
    this(DefaultMainThread.getInstance());
  }

  public BarcodePickViewHandler(MainThread mainThread) {
    this.mainThread = mainThread;
    this.latestInfo = new ResizeAndMoveInfo(0f, 0f, 600f, 600f, false);
    this.barcodePickViewContainerReference = null;
    this.webViewReference = null;
  }

  public FrameLayout getBarcodePickViewContainer() {
    return barcodePickViewContainerReference != null
        ? barcodePickViewContainerReference.get()
        : null;
  }

  private View getWebView() {
    return webViewReference != null ? webViewReference.get() : null;
  }

  public FrameLayout prepareContainer(Context context) {
    return new FrameLayout(context);
  }

  public void addBarcodePickViewContainer(FrameLayout container, AppCompatActivity activity) {
    if (getBarcodePickViewContainer() != container) {
      disposeCurrentView();
      addContainer(container, activity);
    }
  }

  public void attachWebView(View webView, AppCompatActivity activity) {
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
    FrameLayout view = getBarcodePickViewContainer();
    if (view == null) {
      return;
    }
    removeBarcodePickViewContainer(view);
  }

  private void addContainer(FrameLayout barcodePickViewContainer, AppCompatActivity activity) {
    barcodePickViewContainerReference = new WeakReference<>(barcodePickViewContainer);

    mainThread.runOnMainThread(
        () -> {
          activity.addContentView(
              barcodePickViewContainer,
              new ViewGroup.LayoutParams(
                  ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
          render();
        });
  }

  private void removeBarcodePickViewContainer(FrameLayout barcodePickViewContainer) {
    barcodePickViewContainerReference = null;
    removeView(
        barcodePickViewContainer,
        () -> {
          // Find the first child that is a BarcodePickView and clear its listeners
          for (int i = 0; i < barcodePickViewContainer.getChildCount(); i++) {
            View child = barcodePickViewContainer.getChildAt(i);
            if (child instanceof BarcodePickView) {
              BarcodePickView pickView = (BarcodePickView) child;
              pickView.setListener(null);
              pickView.setUiListener(null);
              break;
            }
          }
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
    FrameLayout view = getBarcodePickViewContainer();
    if (view == null) {
      return;
    }
    renderNoAnimate(view);
  }

  private void renderNoAnimate(FrameLayout barcodePickViewContainer) {
    barcodePickViewContainer.post(
        () -> {
          barcodePickViewContainer.setVisibility(View.VISIBLE);
          barcodePickViewContainer.setX(pxFromDp(latestInfo.getLeft()));
          barcodePickViewContainer.setY(pxFromDp(latestInfo.getTop()));
          ViewGroup.LayoutParams params = barcodePickViewContainer.getLayoutParams();
          params.width = (int) pxFromDp(latestInfo.getWidth());
          params.height = (int) pxFromDp(latestInfo.getHeight());

          View webView = getWebView();
          if (latestInfo.getShouldBeUnderWebView()) {
            if (webView != null) {
              webView.bringToFront();
              ((View) webView.getParent()).setTranslationZ(1F);
            }
          } else {
            barcodePickViewContainer.bringToFront();
            if (webView != null) {
              ((View) webView.getParent()).setTranslationZ(-1F);
            }
          }
          barcodePickViewContainer.requestLayout();
        });
  }
}
