"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../types/app"));
const query_1 = require("../utils/query");
class ApartmentService extends app_1.default {
    constructor(props) {
        super(props);
    }
    getAllApartments(GetAllApartmentsInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { filters, sort, pagination, search } = GetAllApartmentsInput;
            const { query, sortCriteria, limit, offset } = (0, query_1.generateQuery)(filters, sort, pagination, search);
            const apartments = yield this.models.Apartment.find(query).sort(sortCriteria).skip(offset).limit(limit);
            return apartments;
        });
    }
    getAllOwnerApartments(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const apartments = yield this.models.Apartment.find({ owner: userId }).exec();
                return apartments;
            }
            catch (e) {
                throw new Error(`Error getting owner apartments: ${e} `);
            }
        });
    }
    createApartment(CreateApartmentInput, userId, imageUrls) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authenticate_user(userId);
                if (user.type !== 'OWNER' && !CreateApartmentInput['reviews']) {
                    throw new Error(`Renters cannot create apartments`);
                }
                const apartment = yield this.models.Apartment.create(Object.assign({ owner: userId }, CreateApartmentInput));
                return apartment;
            }
            catch (e) {
                throw new Error(`Error creating apartment`);
            }
        });
    }
    uploadImages(useId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authenticate_user(userId);
                const apartment = yield this.authenticate_apartment(useId);
                // Images are from a standalone file upload engine
                const apartmentImages = yield this.models.Image.find({ useId }).limit(5);
                const images = [...apartmentImages].reverse();
                if (images) {
                    yield apartment.updateOne({
                        $set: { images }
                    }, { new: true, upsert: true });
                    yield apartment.save();
                    return 'images uploaded successfully';
                }
            }
            catch (e) {
                throw new Error(`Error uploading images: ${e}`);
            }
        });
    }
    updateApartment(UpdateApartmentInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authenticate_user(userId);
                if (user.type !== 'OWNER') {
                    throw new Error(`Cannot edit this apartment`);
                }
                const apartment = yield this.models.Apartment.findOneAndUpdate({ owner: userId }, { $set: Object.assign({ owner: userId }, UpdateApartmentInput) });
                return apartment;
            }
            catch (e) {
                throw new Error(`Error updating apartment: ${e}`);
            }
        });
    }
    deleteApartment(DeleteApartmentInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = DeleteApartmentInput;
                const apartment = yield this.authenticate_apartment(id);
                const owner = apartment.owner.toString();
                if (userId !== owner) {
                    throw new Error(`Apartment doesn't belong to user`);
                }
                yield apartment.deleteOne();
                return 'Apartment deleted successfully';
            }
            catch (e) {
                throw new Error(`Error deleting apartment: ${e}`);
            }
        });
    }
}
exports.default = ApartmentService;
//# sourceMappingURL=apartment.js.map