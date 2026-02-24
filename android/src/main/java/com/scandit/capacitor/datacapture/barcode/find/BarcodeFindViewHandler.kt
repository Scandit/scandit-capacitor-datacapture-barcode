/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.find

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
import com.scandit.datacapture.barcode.find.ui.BarcodeFindView
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import java.lang.ref.WeakReference

class BarcodeFindViewHandler(
    private val mainThread: MainThread = DefaultMainThread.getInstance()
) {
    private var latestInfo: ResizeAndMoveInfo = ResizeAndMoveInfo(0, 0, 600, 600, false)
    private var isVisible: Boolean = true
    private var barcodeFindViewContainerReference: WeakReference<FrameLayout>? = null
    private var webViewReference: WeakReference<View>? = null

    val barcodeFindViewContainer: FrameLayout?
    get() = barcodeFindViewContainerReference?.get()

    private val webView: View?
    get() = webViewReference?.get()


    fun prepareContainer(context: Context) : FrameLayout {
        return FrameLayout(context)
    }

    fun addBarcodeFindViewContainer(container: FrameLayout, activity: AppCompatActivity) {
        if (this.barcodeFindViewContainer != container) {
            disposeCurrentView()
            addContainer(container, activity)
        }
    }

    fun attachWebView(webView: View) {
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
        val view = barcodeFindViewContainer ?: return
        removeView(view)
    }

    private fun disposeCurrentWebView() {
        webViewReference = null
    }

    private fun addContainer(
        barcodeFindViewContainer: FrameLayout,
        activity: AppCompatActivity
    ) {
        barcodeFindViewContainerReference = WeakReference(barcodeFindViewContainer)

        mainThread.runOnMainThread {
            activity.addContentView(
                barcodeFindViewContainer,
                ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            )
            render()
        }
    }

    private fun removeBarcodeFindViewContainer(barcodeFindViewContainer: FrameLayout) {
        barcodeFindViewContainerReference = null
        removeView(barcodeFindViewContainer) {
            (barcodeFindViewContainer.children.firstOrNull() as? BarcodeFindView)?.setListener(null)
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
        val view = barcodeFindViewContainer ?: return
        renderNoAnimate(view)
    }

    private fun renderNoAnimate(barcodeFindViewContainer: FrameLayout) {
        barcodeFindViewContainer.post {
            barcodeFindViewContainer.visibility = if (isVisible) View.VISIBLE else View.GONE
            barcodeFindViewContainer.x = latestInfo.left.pxFromDp()
            barcodeFindViewContainer.y = latestInfo.top.pxFromDp()
            barcodeFindViewContainer.layoutParams.apply {
                width = ViewGroup.LayoutParams.MATCH_PARENT
                height = ViewGroup.LayoutParams.MATCH_PARENT
            }
            if (latestInfo.shouldBeUnderWebView) {
                webView?.bringToFront()
                (webView?.parent as View).translationZ = 1F
            } else {
                barcodeFindViewContainer.bringToFront()
                (webView?.parent as View).translationZ = -1F
            }
            barcodeFindViewContainer.requestLayout()
        }
    }
}
