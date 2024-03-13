"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class IService {
    constructor(context) {
        this.models = context.models;
        this.context = context;
    }
    authenticate_user(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.context.models.User.findOne({ _id: userId });
            if (!user) {
                throw new Error('User not authenticated');
            }
            return user;
        });
    }
    authenticate_apartment(apartment) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _apartment = yield this.models.Apartment.findOne({ _id: apartment });
            if (!_apartment) {
                throw new Error('Apartment not found');
            }
            return _apartment;
        });
    }
    authenticate_booking(booking) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _booking = yield this.models.ApartmentBooking.findOne({ _id: booking });
            if (!booking) {
                throw new Error('Booking not found');
            }
            return _booking;
        });
    }
}
exports.default = IService;
//# sourceMappingURL=app.js.map