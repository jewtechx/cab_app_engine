"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uuid_1 = require("uuid");
const app_1 = tslib_1.__importDefault(require("../../types/app"));
const mailer_1 = tslib_1.__importDefault(require("../../utils/mailer"));
const log_1 = tslib_1.__importDefault(require("../../utils/log"));
class UserService extends app_1.default {
    constructor(context) {
        super(context);
    }
    registerUser(CreateUnverifiedUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const _user = yield this.models.User.find({ email: CreateUnverifiedUserInput.email });
                if (_user.length)
                    throw new Error('User already exists');
                const user = new this.models.User(Object.assign({}, CreateUnverifiedUserInput));
                yield user.save();
                yield (0, mailer_1.default)({
                    from: 'jwlarbi15@gmail.com',
                    to: user.email,
                    subject: 'Please verify your account',
                    text: `Verification code : ${user.verificationCode}. Id : ${user._id}`,
                });
                return {
                    user,
                };
            }
            catch (e) {
                throw new Error('Error creating new user');
            }
        });
    }
    verifyUser(VerifyUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, verificationCode } = VerifyUserInput;
            // find the user by Id
            const user = yield this.models.User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            // check to see if they are already verified
            if (user.verified) {
                throw new Error('User is already verified');
            }
            // check to see if verificationCode matches
            if (user.verificationCode === verificationCode) {
                user.verified = true;
                yield user.save();
                return true;
            }
        });
    }
    forgotPassword(ForgotPasswordInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { email } = ForgotPasswordInput;
            const user = yield this.models.User.findOne({ email });
            if (!user) {
                throw new Error('user not found');
            }
            if (!user.verified) {
                throw new Error('user is not verified');
            }
            const passwordResetCode = (0, uuid_1.v4)();
            user.passwordResetCode = passwordResetCode;
            yield user.save();
            yield (0, mailer_1.default)({
                to: user.email,
                from: 'test@example.com',
                subject: 'Reset your password',
                text: `Password reset code: ${passwordResetCode}. Id: ${user._id}`,
            });
            log_1.default.debug(`Password reset code sent to ${user.email}`);
            const message = 'password reset code sent';
            return message;
        });
    }
    resetPassword(ResetPasswordInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, passwordResetCode, newPassword } = ResetPasswordInput;
            const user = yield this.models.User.findById(id);
            if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
                throw new Error('Could not reset password');
            }
            user.passwordResetCode = null;
            user.password = newPassword;
            yield user.save();
            const message = 'Successfully updated password';
            return message;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map