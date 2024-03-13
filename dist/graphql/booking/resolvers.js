"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resolvers = (appContext) => {
    return {
        Booking: {
            __resolveReference: function (_) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return appContext.models.ApartmentBooking.find(_._id);
                });
            },
        },
        Query: {
            getApartmentBooking: function (_, { GetApartmentBookingInput }, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const bookings = appContext.services.ApartmentBookingService.getApartmentBooking(GetApartmentBookingInput, context.user._id);
                    return bookings;
                });
            },
        },
        Mutation: {
            createApartmentBooking: function (_, { CreateApartmentBookingInput }, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const booking = appContext.services.ApartmentBookingService.createApartmentBooking(CreateApartmentBookingInput, context.user._id);
                    return booking;
                });
            },
            updateApartmentBooking: function (_, { UpdateApartmentBookingInput }, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const booking = appContext.services.ApartmentBookingService.createApartmentBooking(UpdateApartmentBookingInput, context.user._id);
                    return booking;
                });
            },
            deleteApartmentBooking: function (_, { DeleteApartmentBookingInput }, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const message = appContext.services.ApartmentBookingService.createApartmentBooking(DeleteApartmentBookingInput.apartmentId, context.user._id);
                    return message;
                });
            },
        },
    };
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map