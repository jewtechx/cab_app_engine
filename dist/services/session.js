"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const token_1 = require("../utils/token");
const session_1 = require("../utils/session");
const app_1 = tslib_1.__importDefault(require("../types/app"));
class UserSessionService extends app_1.default {
    constructor(props) {
        super(props);
    }
    // creates access tokens
    createUserSession(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email } = input;
            const user = yield this.models.User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if (!user.verified) {
                throw new Error('Please verify your email');
            }
            const accessToken = (0, session_1.signAccessToken)(user);
            const refreshToken = yield (0, session_1.signRefreshToken)({ userId: user._id });
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    // refreshes access tokens
    refreshAccessToken(refreshToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const decoded = yield (0, token_1.verifyJwt)(refreshToken);
            if (!decoded) {
                throw new Error('Could not refresh access token');
            }
            const session = yield (0, session_1.findSessionById)(decoded.session);
            if (!session || !session.valid) {
                throw new Error('Could not refresh access token');
            }
            const user = yield this.models.User.findById(String(session.userId));
            if (!user) {
                throw new Error('Could not refresh access token');
            }
            const accessToken = (0, session_1.signAccessToken)(user);
            return { accessToken };
        });
    }
}
exports.default = UserSessionService;
//# sourceMappingURL=session.js.map