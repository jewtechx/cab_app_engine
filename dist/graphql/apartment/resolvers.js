"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function default_1(appContext) {
    return {
        Apartment: {
            __resolveReference: function (_) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return appContext.models.Apartment.findById(_._id);
                });
            },
        },
        Query: {
            getApartment: function (_, { apartmentId }, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield appContext.models.Apartment.findById(apartmentId);
                });
            },
            getAllOwnerApartments: function (_, {}, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const apartments = yield appContext.services.ApartmentService.getAllOwnerApartments(context.user._id);
                    return apartments;
                });
            },
            getAllApartments: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const apartments = yield appContext.services.ApartmentService.getAllApartments(args.GetAllApartmentsInput);
                    return apartments;
                });
            }
        },
        Mutation: {
            createApartment: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const apartment = yield appContext.services.ApartmentService.createApartment(args.CreateApartmentInput, context.user._id);
                    return apartment;
                });
            },
            uploadImages: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const message = yield appContext.services.ApartmentService.uploadImages(args.useId, context.user._id);
                    return message;
                });
            },
            updateApartment: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const apartment = yield appContext.services.ApartmentService.updateApartment(args.UpdateApartmentInput, context.user._id);
                    return apartment;
                });
            },
            deleteApartment: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const apartment = yield appContext.services.ApartmentService.deleteApartment(args.DeleteApartmentInput, context.user._id);
                    return apartment;
                });
            }
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map