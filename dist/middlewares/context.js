"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setContext = void 0;
const tslib_1 = require("tslib");
const token_1 = require("../utils/token");
const setContext = ({ req }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization || '';
        if (token) {
            const decoded = yield (0, token_1.verifyJwt)(token);
            const id = decoded._id;
            const user = { _id: id };
            return { user };
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.setContext = setContext;
//# sourceMappingURL=context.js.map