"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const otp_generator_1 = tslib_1.__importDefault(require("otp-generator"));
const app_1 = tslib_1.__importDefault(require("../types/app"));
const sms_1 = tslib_1.__importDefault(require("../utils/sms"));
const log_1 = tslib_1.__importDefault(require("../utils/log"));
class UserService extends app_1.default {
    constructor(context) {
        super(context);
    }
    // registers user
    registerUser(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { phoneNumber } = input;
                const _user = yield this.models.User.findOne({ phoneNumber });
                if (_user)
                    throw new Error('User already exists');
                const user = new this.models.User({ phoneNumber });
                yield user.save();
                yield (0, sms_1.default)(phoneNumber, `This is your cab app verification code:${otp_generator_1.default}. Thank you for signing up`);
                return user;
            }
            catch (e) {
                throw new Error(`Error creating new user: ${e}`);
            }
        });
    }
    //verifies user
    verifyUser(VerifyUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, verificationCode } = VerifyUserInput;
            try {
                // Find the user by Id
                const user = yield this.authenticate_user(id);
                console.log(user);
                // Check if the user is already verified
                if (user.verified) {
                    throw new Error('User is already verified');
                }
                // Check if verificationCode matches
                if (user.verificationCode !== verificationCode) {
                    throw new Error('Invalid verification code');
                }
                // Set verified to true and save user
                user.verified = true;
                user.verificationCode = null;
                yield user.save();
                return true;
            }
            catch (e) {
                throw new Error(`Error validating user: ${e}`);
            }
        });
    }
    // sends password reset code to user's email
    forgotPassword(ForgotPasswordInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { phoneNumber } = ForgotPasswordInput;
            const user = yield this.models.User.findOne({ phoneNumber });
            if (!user) {
                throw new Error('user not found');
            }
            if (!user.verified) {
                throw new Error('user is not verified');
            }
            const passwordResetCode = otp_generator_1.default.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            user.passwordResetCode = passwordResetCode;
            yield user.save();
            yield (0, sms_1.default)(phoneNumber, `This is your cab app password reset code:${otp_generator_1.default}`);
            log_1.default.debug(`Password reset code sent to ${user.phoneNumber}`);
            const message = 'password reset code sent';
            return message;
        });
    }
    // resets user's password to new password from email
    resetPassword(ResetPasswordInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, passwordResetCode, newPassword } = ResetPasswordInput;
            const user = yield this.authenticate_user(id);
            console.log(passwordResetCode);
            console.log(user.passwordResetCode);
            if (!user || user.passwordResetCode !== passwordResetCode) {
                throw new Error('Could not reset password');
            }
            user.passwordResetCode = null;
            user.password = newPassword;
            yield user.save();
            const message = 'Successfully updated password';
            return message;
        });
    }
    // login user
    loginUser(LoginUserInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { phoneNumber, password } = LoginUserInput;
            const user = yield this.models.User.findOne({ phoneNumber });
            if (!user) {
                throw new Error('user not found');
            }
            try {
                const valid = yield user.validatePassword(password);
                if (!valid) {
                    throw new Error('password incorrect');
                }
            }
            catch (e) {
                throw new Error(e);
            }
            return user;
        });
    }
    // updates user details
    updateUser(UpdateUserInput, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authenticate_user(userId);
                if ('rating' in UpdateUserInput) {
                    user.rating = UpdateUserInput.rating;
                }
                else {
                    if (user._id.toString() !== userId.toString()) {
                        throw new Error(`Unauthorized: Cannot update another user's details`);
                    }
                    for (const key in UpdateUserInput) {
                        if (key !== 'rating') {
                            user[key] = UpdateUserInput[key];
                        }
                    }
                }
                yield user.save();
                return user;
            }
            catch (e) {
                throw new Error(`Error updating user: ${e.message}`);
            }
        });
    }
    //update profile picture
    updateProfilePicture(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authenticate_user(userId);
            // avatar is from standalone file upload server
            const avatars = yield this.models.Image.find({ useId: user._id });
            if (!avatars) {
                throw new Error(`No avatar found for this user`);
            }
            const avatar = [...avatars].reverse();
            console.log(avatar);
            const { path } = avatar[0];
            yield user.updateOne({
                $set: {
                    profile: { avatar: path }
                }
            }, { new: true, upsert: true });
            yield user.save();
            return avatar[0];
        });
    }
    // deletes user account
    deleteUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authenticate_user(id);
            try {
                yield this.models.User.findByIdAndDelete(id);
                return `Deleted user successfully`;
            }
            catch (e) {
                throw new Error(`Error deleting user`);
            }
        });
    }
    // getting user rating
    getUserRating(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.models.User.findOne({ _id: userId });
                if (user.rating.length === 0) {
                    return {
                        averageRating: 0,
                        totalRatings: 0,
                    };
                }
                const totalScore = user.rating.reduce((sum, rating) => sum + rating.score, 0);
                const averageRating = totalScore / user.rating.length;
                return {
                    averageRating,
                    totalRatings: user.rating.length,
                };
            }
            catch (error) {
                console.error('Error fetching ratings for user:', error);
                throw new Error('Failed to fetch ratings');
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map