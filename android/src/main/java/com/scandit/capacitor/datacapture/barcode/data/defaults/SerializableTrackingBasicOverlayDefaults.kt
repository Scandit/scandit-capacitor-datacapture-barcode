/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.capacitor.datacapture.barcode.data.defaults

import com.scandit.capacitor.datacapture.core.data.SerializableData
import com.scandit.capacitor.datacapture.core.data.defaults.SerializableBrushDefaults
import org.json.JSONObject

class SerializableTrackingBasicOverlayDefaults(
    private val defaultBrush: SerializableBrushDefaults
) : SerializableData {

    override fun toJson(): JSONObject = JSONObject(
            mapOf(
                    FIELD_BRUSH to defaultBrush.toJson()
            )
    )

    companion object {
        private const val FIELD_BRUSH = "DefaultBrush"
    }
}
