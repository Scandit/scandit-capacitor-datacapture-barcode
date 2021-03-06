/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.data

import com.scandit.datacapture.core.ui.style.Brush
import com.scandit.datacapture.core.ui.style.BrushDeserializer
import org.json.JSONObject

class SerializableFinishBasicOverlayCallbackData(val brush: Brush?) {

    companion object {
        private const val FIELD_BRUSH = "brush"

        fun fromJson(json: JSONObject?): SerializableFinishBasicOverlayCallbackData? {
            if (json == null) return null

            val brush: Brush? =
                json.optString(FIELD_BRUSH, "").takeIf { it.isNotBlank() }?.let { brushString ->
                    BrushDeserializer.fromJson(brushString)
                }
            return SerializableFinishBasicOverlayCallbackData(brush)
        }
    }
}
