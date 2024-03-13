"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../types/app"));
class ApartmentBookingService extends app_1.default {
    constructor(props) {
        super(props);
    }
    getApartmentBooking(GetApartmentBookingInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate_user(userId);
                const { apartment } = GetApartmentBookingInput;
                const booking = yield this.models.ApartmentBooking.findOne({ apartment });
                return booking;
            }
            catch (e) {
                throw new Error(`Error getting user's aparment booking: ${e}`);
            }
        });
    }
    createApartmentBooking(CreateApartmentBookingInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate_user(userId);
                const { apartment } = CreateApartmentBookingInput;
                yield this.authenticate_apartment(apartment);
                const booking = yield this.models.ApartmentBooking.create(Object.assign({ user: userId }, CreateApartmentBookingInput));
                return booking;
            }
            catch (e) {
                throw new Error(`Error creating booking: ${e}`);
            }
        });
    }
    updateApartmentBooking(UpdateApartmentBookingInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate_user(userId);
                const { booking } = UpdateApartmentBookingInput;
                const _booking = yield this.authenticate_booking(booking);
                _booking.updateOne({ $set: Object.assign({}, UpdateApartmentBookingInput) });
                return _booking;
            }
            catch (e) {
                throw new Error(`Error updating booking`);
            }
        });
    }
    deleteApartmentBooking(bookingId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate_user(userId);
                const _booking = yield this.authenticate_booking(bookingId);
                yield _booking.deleteOne();
                return 'deleted booking successfully';
            }
            catch (e) {
                throw new Error(`Error deleting user: ${e}`);
            }
        });
    }
}
exports.default = ApartmentBookingService;
//# sourceMappingURL=booking.js.map