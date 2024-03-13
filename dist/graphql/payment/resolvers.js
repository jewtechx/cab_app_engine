"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function default_1(appContext) {
    return {
        Query: {},
        Mutation: {
            initiateTransaction: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const response = yield appContext.services.PaymentService.initiateTransaction(args.InitiateTransactionInput, context.user._id);
                    return response;
                });
            },
            verifyTransaction: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const response = yield appContext.services.PaymentService.verifyTransaction(args.Reference, context.user._id);
                    return response;
                });
            },
            makePaymentToOwner: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const response = yield appContext.services.PaymentService.makePaymentToOwner(args.bookingId, context.user._id);
                    return response;
                });
            }
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map