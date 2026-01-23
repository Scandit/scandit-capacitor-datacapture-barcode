/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
 */

import ScanditCaptureCore
import ScanditCapacitorDatacaptureCore

struct BrushAndTrackedBarcodeJSON: CommandJSONArgument {
    enum CodingKeys: String, CodingKey {
        case trackedBarcodeID
        case sessionFrameSequenceID
        case brushJSONString = "brush"
    }

    let brushJSONString: String?
    let trackedBarcodeID: String
    let sessionFrameSequenceID: String?

    var brush: Brush? {
        guard let jsonString = brushJSONString else {
            return nil
        }

        return Brush(jsonString: jsonString)
    }
}

struct ViewAndTrackedBarcodeJSON: CommandJSONArgument {
    let viewJson: TrackedBarcodeView.JSON?
    let trackedBarcodeIdentifier: Int
    let sessionFrameSequenceID: Int?
    let dataCaptureViewId: Int

    enum CodingKeys: CodingKey {
        case viewJson
        case trackedBarcodeIdentifier
        case sessionFrameSequenceID
        case dataCaptureViewId
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.viewJson = try container.decodeIfPresent(TrackedBarcodeView.JSON.self, forKey: .viewJson)
        self.trackedBarcodeIdentifier = try container.decode(Int.self, forKey: .trackedBarcodeIdentifier)
        if let frameSequenceId = try? container.decodeIfPresent(Int.self, forKey: .sessionFrameSequenceID) {
            self.sessionFrameSequenceID = frameSequenceId
        } else {
            self.sessionFrameSequenceID = nil
        }
        self.dataCaptureViewId = try container.decode(Int.self, forKey: .dataCaptureViewId)
    }
}

struct AnchorAndTrackedBarcodeJSON: CommandJSONArgument {
    let anchor: String?
    let trackedBarcodeIdentifier: String
    let sessionFrameSequenceID: String?
}

struct OffsetAndTrackedBarcodeJSON: CommandJSONArgument {
    let offsetJson: String?
    let trackedBarcodeIdentifier: String
    let sessionFrameSequenceID: String?
}

struct SelectionIdentifierBarcodeJSON: CommandJSONArgument {
    let selectionIdentifier: String
}
