"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("../../types/app"));
const session_1 = require("../../utils/session");
const lodash_1 = require("lodash");
const token_1 = require("../../utils/token");
class UserSessionService extends app_1.default {
    constructor(props) {
        super(props);
    }
    createUserSession(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = yield this.models.User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if (!user.verified) {
                throw new Error('Please verify your email');
            }
            const isValid = yield user.validatePassword(password);
            if (!isValid) {
                throw new Error('Invalid email or password');
            }
            const accessToken = (0, session_1.signAccessToken)(user);
            const refreshToken = yield (0, session_1.signRefreshToken)({ userId: user._id });
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    refreshAccessToken(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const refreshToken = (0, lodash_1.get)(req, 'headers.x-refresh');
            const decoded = (0, token_1.verifyJwt)(refreshToken, 'refreshTokenPublicKey');
            if (!decoded) {
                throw new Error('Could not refresh access token');
            }
            const session = yield (0, session_1.findSessionById)(decoded.session);
            if (!session || !session.valid) {
                throw new Error('Could not refresh access token');
            }
            const user = yield this.models.User.findById(session.userId);
            if (!user) {
                return res.status(401).send('Could not refresh access token');
            }
            const accessToken = (0, session_1.signAccessToken)(user);
            return { accessToken };
        });
    }
}
exports.default = UserSessionService;
//# sourceMappingURL=session.js.map