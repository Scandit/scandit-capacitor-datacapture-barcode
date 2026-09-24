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
import com.scandit.capacitor.datacapture.core.utils.removeFromParent
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap

class BarcodeFindViewHandler(
    private val mainThread: MainThread = DefaultMainThread.getInstance()
) {
    private val containers: MutableMap<Int, WeakReference<FrameLayout>> = ConcurrentHashMap()
    private val containerVisibility: MutableMap<Int, Boolean> = ConcurrentHashMap()

    private var webViewReference: WeakReference<View>? = null

    private val webView: View?
        get() = webViewReference?.get()

    fun prepareContainer(context: Context): FrameLayout {
        return FrameLayout(
            context
        )
    }

    fun addBarcodeFindViewContainer(viewId: Int, container: FrameLayout, activity: AppCompatActivity) {
        if (containers.containsKey(viewId)) {
            val existingContainer = containers.remove(viewId)?.get()
            if (existingContainer != null) {
                removeView(existingContainer)
            }
        }

        containers[viewId] = WeakReference(container)
        containerVisibility[viewId] = true

        addContainer(
            viewId,
            container,
            activity
        )
    }

    fun attachWebView(webView: View) {
        if (this.webView != webView) {
            webViewReference = WeakReference(webView)
            mainThread.runOnMainThread {
                webView.bringToFront()
                webView.setBackgroundColor(Color.TRANSPARENT)
            }
        }
    }

    fun setVisible(viewId: Int) {
        mainThread.runOnMainThread {
            containerVisibility[viewId] = true
            renderNoAnimate(
                containers[viewId]?.get() ?: return@runOnMainThread,
                containerVisibility[viewId] == true
            )
        }
    }

    fun setInvisible(viewId: Int) {
        mainThread.runOnMainThread {
            containerVisibility[viewId] = false
            renderNoAnimate(
                containers[viewId]?.get() ?: return@runOnMainThread,
                containerVisibility[viewId] == true
            )
        }
    }

    fun disposeContainer(viewId: Int) {
        mainThread.runOnMainThread {
            containers.remove(viewId)?.get()?.also {
                removeView(it)
            }
        }

        containerVisibility.remove(viewId)

        if (containers.isEmpty()) {
            mainThread.runOnMainThread {
                setWebViewVisible()
            }
        }
    }

    fun disposeAll() {
        mainThread.runOnMainThread {
            for (viewId in containers.keys) {
                disposeContainer(viewId)
            }

            disposeCurrentWebView()
        }
    }

    private fun disposeCurrentWebView() {
        webViewReference = null
    }

    private fun addContainer(
        viewId: Int,
        container: FrameLayout,
        activity: AppCompatActivity
    ) {
        mainThread.runOnMainThread {
            activity.addContentView(
                container,
                ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            )
            renderNoAnimate(container, containerVisibility[viewId] == true)
        }
    }

    private fun removeView(view: View) {
        mainThread.runOnMainThread {
            view.removeFromParent()
        }
    }

    private fun renderNoAnimate(container: FrameLayout, isVisible: Boolean) {
        container.visibility = if (isVisible) View.VISIBLE else View.GONE
        container.layoutParams.apply {
            width = ViewGroup.LayoutParams.MATCH_PARENT
            height = ViewGroup.LayoutParams.MATCH_PARENT
        }
        if (isVisible) {
            container.bringToFront()
            setWebViewInvisible()
        } else {
            setWebViewVisible()
        }
        container.requestLayout()

    }

    private fun setWebViewVisible() {
        webView?.bringToFront()
        (webView?.parent as View).translationZ = 1F
    }

    private fun setWebViewInvisible() {
        (webView?.parent as View).translationZ = -1F
    }
}
