/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import ScanditBarcodeCapture
import ScanditCapacitorDatacaptureCore
import UIKit
import WebKit

class BarcodeFindViewHandler {
    let webView: WKWebView

    /// Container view that holds the BarcodeFindView.
    /// The handler positions this container, and the BarcodeFindView fills it.
    /// This allows the native view's internal layout to remain intact.
    private var containerView: UIView?

    var container: UIView {
        if let existing = containerView, existing.superview != nil {
            return existing
        }
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.backgroundColor = .clear
        webView.addSubview(view)
        containerView = view
        return view
    }

    var barcodeFindView: BarcodeFindView? {
        didSet {
            guard barcodeFindView != nil else { return }
            resetConstraints()
            update()
        }
    }

    private var top: NSLayoutConstraint?
    private var left: NSLayoutConstraint?
    private var width: NSLayoutConstraint?
    private var height: NSLayoutConstraint?

    private var position = CGPoint.zero
    private var size = CGSize.zero
    private var shouldBeUnderWebView = false

    private var constraints: [NSLayoutConstraint] {
        [top, left, width, height].compactMap({ $0 })
    }

    init(relativeTo webView: WKWebView) {
        self.webView = webView
    }

    /// Update the constraints that set the position and size of the barcode find view,
    /// based on a JSON passed in as the argument to a Capacitor command.
    ///
    /// If the view does not exist yet, the position and size are stored and will be applied to the view
    /// when it's created (and the constraints object is updated with the new view).
    ///
    /// - Parameter positionAndSizeJSON: The JSON passed to the Capacitor command
    func updatePositionAndSize(fromJSON positionAndSizeJSON: ViewPositionAndSizeJSON) {
        position = positionAndSizeJSON.position
        size = positionAndSizeJSON.size
        shouldBeUnderWebView = positionAndSizeJSON.shouldBeUnderWebView
        update()
    }

    private func update() {
        updateConstraints()
        updatePosition()
    }

    private func activate() {
        NSLayoutConstraint.activate(constraints)
    }

    private func resetConstraints() {
        top = nil
        left = nil
        width = nil
        height = nil
    }

    private func updateConstraints() {
        // Position the container, not the BarcodeFindView directly.
        // The BarcodeFindView fills the container via constraints set by the deserializer.
        let topConstant = position.y + webView.adjustedContentInset.top
        let leftConstant = position.x + webView.adjustedContentInset.left

        if let top = top {
            top.constant = topConstant
        } else {
            top = container.topAnchor.constraint(equalTo: webView.topAnchor, constant: topConstant)
            top?.isActive = true
        }

        if let left = left {
            left.constant = leftConstant
        } else {
            left = container.leadingAnchor.constraint(equalTo: webView.leadingAnchor, constant: leftConstant)
            left?.isActive = true
        }

        if let width = width {
            width.constant = size.width
        } else {
            width = container.widthAnchor.constraint(equalToConstant: size.width)
            width?.isActive = true
        }

        if let height = height {
            height.constant = size.height
        } else {
            height = container.heightAnchor.constraint(equalToConstant: size.height)
            height?.isActive = true
        }

        container.layoutIfNeeded()
    }

    private func updatePosition() {
        if shouldBeUnderWebView {
            webView.sendSubviewToBack(container)
        } else {
            webView.bringSubviewToFront(container)
        }
    }

    /// Clean up and remove the current BarcodeFind view.
    func disposeCurrentView() {
        // Deactivate constraints before removing the container
        NSLayoutConstraint.deactivate(constraints)
        resetConstraints()

        // Remove the BarcodeFindView from the container (it was added by the deserializer)
        barcodeFindView?.removeFromSuperview()
        barcodeFindView = nil

        // Remove the container from the webView and clear the reference
        containerView?.removeFromSuperview()
        containerView = nil
    }
}
