/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.errors

import com.scandit.capacitor.datacapture.core.errors.ActionError

class ErrorTrackedBarcodeNotFound : ActionError(
    ERROR_CODE, "Passed tracked barcode not found in current session"
) {

    companion object {
        private const val ERROR_CODE = 10051
    }
}
