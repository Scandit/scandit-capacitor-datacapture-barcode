/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import ScanditCapacitorDatacaptureCore
import ScanditFrameworksCore
import UIKit
import WebKit

class BarcodeArViewHandler {
    private weak var webView: WKWebView?
    private weak var containerView: UIView?

    private var top: NSLayoutConstraint?
    private var left: NSLayoutConstraint?
    private var width: NSLayoutConstraint?
    private var height: NSLayoutConstraint?

    private var position = CGPoint.zero
    private var size = CGSize.zero
    private var shouldBeUnderWebView = false

    private var constraints: [NSLayoutConstraint] {
        [top, left, width, height].compactMap { $0 }
    }

    init(relativeTo webView: WKWebView) {
        self.webView = webView
    }

    /// Add the BarcodeAr view container to the view hierarchy.
    ///
    /// - Parameter container: The container view to add
    func addBarcodeArViewContainer(_ container: UIView) {
        guard let webView = webView else { return }

        self.containerView = container
        container.translatesAutoresizingMaskIntoConstraints = false

        // Add container as a subview of the webView's superview
        if let parent = webView.superview {
            parent.addSubview(container)
        }

        // Bring webView to front and make it transparent
        webView.superview?.bringSubviewToFront(webView)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear

        resetConstraints()
        update()
    }

    /// Update the position and size of the BarcodeAr view container.
    ///
    /// - Parameter positionAndSizeJSON: The position and size information
    func updatePositionAndSize(fromJSON positionAndSizeJSON: ViewPositionAndSizeJSON) {
        position = positionAndSizeJSON.position
        size = positionAndSizeJSON.size
        shouldBeUnderWebView = positionAndSizeJSON.shouldBeUnderWebView
        update()
    }

    /// Clean up and remove the container view.
    func disposeCurrentView() {
        containerView?.removeFromSuperview()
        containerView = nil

        // Restore webView opacity
        webView?.isOpaque = true
        webView?.backgroundColor = nil
        webView?.scrollView.backgroundColor = nil
    }

    // MARK: - Private Methods

    private func update() {
        updateConstraints()
        updateLayering()
    }

    private func resetConstraints() {
        top = nil
        left = nil
        width = nil
        height = nil
    }

    private func updateConstraints() {
        guard let containerView = containerView, let webView = self.webView
        else {
            assert(true, "barcodeArView or containerView is not set")
            return
        }

        if size.width == 0 || size.height == 0 {
            containerView.isHidden = true
            return
        }

        containerView.isHidden = false

        let topConstant = position.y + webView.adjustedContentInset.top
        let leftConstant = position.x + webView.adjustedContentInset.left

        if let top = top {
            top.constant = topConstant
        } else {
            top = containerView.topAnchor.constraint(equalTo: webView.topAnchor, constant: topConstant)
            top?.isActive = true
        }

        if let left = left {
            left.constant = leftConstant
        } else {
            left = containerView.leadingAnchor.constraint(equalTo: webView.leadingAnchor, constant: leftConstant)
            left?.isActive = true
        }

        width?.isActive = false
        self.width = containerView.widthAnchor.constraint(equalToConstant: size.width)
        self.width?.isActive = true

        height?.isActive = false
        self.height = containerView.heightAnchor.constraint(equalToConstant: size.height)
        self.height?.isActive = true

        containerView.superview?.layoutIfNeeded()
    }

    private func updateLayering() {
        guard let containerView = containerView else { return }
        guard let webView = webView else { return }
        guard let parent = webView.superview else { return }

        if shouldBeUnderWebView {
            parent.sendSubviewToBack(containerView)
            parent.bringSubviewToFront(webView)
        } else {
            parent.bringSubviewToFront(containerView)
        }
    }
}
