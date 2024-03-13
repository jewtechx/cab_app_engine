"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resolvers_1 = tslib_1.__importDefault(require("./resolvers"));
const typeDefs_1 = tslib_1.__importDefault(require("./typeDefs"));
const bookingSchema = (context) => {
    return {
        typeDefs: typeDefs_1.default,
        resolvers: (0, resolvers_1.default)(context)
    };
};
exports.default = bookingSchema;
//# sourceMappingURL=index.js.map