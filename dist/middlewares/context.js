"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const token_1 = require("../utils/token");
function setContext(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization || '';
            if (token) {
                const decoded = yield (0, token_1.verifyJwt)(token.split(' ')[1]);
                const id = decoded._id;
                const user = { _id: id };
                req.user = user;
                next();
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = setContext;
;
//# sourceMappingURL=context.js.map