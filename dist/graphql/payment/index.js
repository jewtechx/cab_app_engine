"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeDefs_1 = tslib_1.__importDefault(require("./typeDefs"));
const resolvers_1 = tslib_1.__importDefault(require("./resolvers"));
function paymentSchema(context) {
    return {
        typeDefs: typeDefs_1.default,
        resolvers: (0, resolvers_1.default)(context)
    };
}
exports.default = paymentSchema;
//# sourceMappingURL=index.js.map