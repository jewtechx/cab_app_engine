"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    apartment: { type: mongoose_1.Schema.Types.ObjectId, ref: "apartment", required: true },
    transactionId: { type: String },
    reference: { type: String },
    amount: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['CONFIRMED', 'PENDING', 'CANCELED'], default: 'PENDING' },
    notes: String,
});
const ApartmentBooking = (0, mongoose_1.model)('apartment_booking', bookingSchema);
exports.default = ApartmentBooking;
//# sourceMappingURL=booking.js.map