package com.scandit.capacitor.datacapture.barcode.pick

import android.content.Context
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.children
import com.scandit.capacitor.datacapture.core.data.ResizeAndMoveInfo
import com.scandit.capacitor.datacapture.core.utils.pxFromDp
import com.scandit.capacitor.datacapture.core.utils.removeFromParent
import com.scandit.datacapture.barcode.pick.ui.BarcodePickView
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import java.lang.ref.WeakReference

class BarcodePickViewHandler(
    private val mainThread: MainThread = DefaultMainThread.getInstance()
) {
    private var latestInfo: ResizeAndMoveInfo = ResizeAndMoveInfo(0f, 0f, 600f, 600f, false)
    private var isVisible: Boolean = true
    private var barcodePickViewContainerReference: WeakReference<FrameLayout>? = null
    private var webViewReference: WeakReference<View>? = null

    val barcodePickViewContainer: FrameLayout?
        get() = barcodePickViewContainerReference?.get()

    private val webView: View?
        get() = webViewReference?.get()

    fun prepareContainer(context: Context): FrameLayout = FrameLayout(context)

    fun addBarcodePickViewContainer(container: FrameLayout, activity: AppCompatActivity) {
        if (this.barcodePickViewContainer != container) {
            disposeCurrentView()
            addContainer(container, activity)
        }
    }

    fun attachWebView(webView: View, @Suppress("UNUSED_PARAMETER") activity: AppCompatActivity) {
        if (this.webView != webView) {
            webViewReference = WeakReference(webView)
            webView.bringToFront()
            webView.setBackgroundColor(Color.TRANSPARENT)
        }
    }

    fun setVisible() {
        isVisible = true
        render()
    }

    fun setInvisible() {
        isVisible = false
        render()
    }

    fun setResizeAndMoveInfo(info: ResizeAndMoveInfo) {
        latestInfo = info
        render()
    }

    fun disposeCurrent() {
        disposeCurrentView()
        disposeCurrentWebView()
    }

    fun disposeCurrentView() {
        val view = barcodePickViewContainer ?: return
        removeBarcodePickViewContainer(view)
    }

    private fun disposeCurrentWebView() {
        webViewReference = null
    }

    private fun addContainer(
        barcodeFindViewContainer: FrameLayout,
        activity: AppCompatActivity
    ) {
        barcodePickViewContainerReference = WeakReference(barcodeFindViewContainer)

        mainThread.runOnMainThread {
            activity.addContentView(
                barcodePickViewContainer,
                ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            )
            render()
        }
    }

    private fun removeBarcodePickViewContainer(barcodePickViewContainer: FrameLayout) {
        barcodePickViewContainerReference = null
        removeView(barcodePickViewContainer) {
            (barcodePickViewContainer.children.firstOrNull() as? BarcodePickView)?.listener = null
            (barcodePickViewContainer.children.firstOrNull() as? BarcodePickView)?.uiListener = null
        }
    }

    private fun removeView(view: View, uiBlock: (() -> Unit)? = null) {
        mainThread.runOnMainThread {
            view.removeFromParent()
            uiBlock?.invoke()
        }
    }

    // Update the view visibility, position and size.
    fun render() {
        val view = barcodePickViewContainer ?: return
        renderNoAnimate(view)
    }

    private fun renderNoAnimate(barcodePickViewContainer: FrameLayout) {
        barcodePickViewContainer.post {
            barcodePickViewContainer.visibility = if (isVisible) View.VISIBLE else View.GONE
            barcodePickViewContainer.x = latestInfo.left.pxFromDp()
            barcodePickViewContainer.y = latestInfo.top.pxFromDp()
            barcodePickViewContainer.layoutParams.apply {
                width = ViewGroup.LayoutParams.MATCH_PARENT
                height = ViewGroup.LayoutParams.MATCH_PARENT
            }
            if (latestInfo.shouldBeUnderWebView) {
                webView?.bringToFront()
                (webView?.parent as View).translationZ = 1F
            } else {
                barcodePickViewContainer.bringToFront()
                (webView?.parent as View).translationZ = -1F
            }
            barcodePickViewContainer.requestLayout()
        }
    }
}
