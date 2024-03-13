"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const apartmentSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [String],
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    reviews: [{
            rating: { type: Number, min: 0, max: 5 },
            comment: String,
        }],
    images: [
        {
            useId: { type: mongoose_1.Schema.Types.ObjectId },
            filename: { type: String, required: true },
            path: { type: String, required: true }
        }
    ],
}, { timestamps: true });
const Apartment = (0, mongoose_1.model)('apartment', apartmentSchema);
exports.default = Apartment;
//# sourceMappingURL=apartment.js.map