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
    let view: TrackedBarcodeView.JSON?
    let trackedBarcodeID: Int
    let sessionFrameSequenceID: Int?

    enum CodingKeys: CodingKey {
        case view
        case trackedBarcodeID
        case sessionFrameSequenceID
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.view = try container.decodeIfPresent(TrackedBarcodeView.JSON.self, forKey: .view)
        self.trackedBarcodeID = try container.decode(Int.self, forKey: .trackedBarcodeID)
        if let frameSequenceId = try? container.decodeIfPresent(Int.self, forKey: .sessionFrameSequenceID) {
            self.sessionFrameSequenceID = frameSequenceId
        } else {
            self.sessionFrameSequenceID = nil
        }
    }
}

struct AnchorAndTrackedBarcodeJSON: CommandJSONArgument {
    let anchor: String?
    let trackedBarcodeID: String
    let sessionFrameSequenceID: String?
}

struct OffsetAndTrackedBarcodeJSON: CommandJSONArgument {
    let offset: String?
    let trackedBarcodeID: String
    let sessionFrameSequenceID: String?
}

struct SelectionIdentifierBarcodeJSON: CommandJSONArgument {
    let selectionIdentifier: String
}
