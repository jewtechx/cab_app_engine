"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
function default_1(appContext) {
    return {
        User: {
            __resolveReference: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    return yield appContext.models.User.findById(_._id);
                });
            },
        },
        Query: {
            user: function (_, {}, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        const userId = context.user._id;
                        const user = yield appContext.models.User.findById(userId);
                        if (!user) {
                            throw new graphql_1.GraphQLError('User not found');
                        }
                        return user;
                    }
                    catch (e) {
                        throw new graphql_1.GraphQLError(`Error getting user in graphql: ${e}`);
                    }
                });
            },
            getAllUsers: function () {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const allUsers = appContext.models.User.find().exec();
                    return allUsers;
                });
            },
            getAllVerifiedUsers: function () {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const verifiedUsers = appContext.models.User.find({ verified: true }).exec();
                    return verifiedUsers;
                });
            },
            getUsersByType: function (_) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        const groupedUsers = yield appContext.models.User.aggregate([
                            {
                                $group: {
                                    _id: '$type',
                                    users: { $push: '$$ROOT' },
                                },
                            },
                        ]);
                        return groupedUsers;
                    }
                    catch (e) {
                        throw new graphql_1.GraphQLError(`Error grouping users: ${e}`);
                    }
                });
            },
            getRecentUsers: function (_) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        const currentDate = new Date();
                        const oneMonthAgo = new Date(currentDate);
                        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                        const recentUsers = yield appContext.models.User.aggregate([
                            {
                                $match: {
                                    createdAt: { $gte: oneMonthAgo, $lte: currentDate },
                                },
                            },
                        ]);
                        return recentUsers;
                    }
                    catch (e) {
                        throw new graphql_1.GraphQLError(`Error getting recently registered users`);
                    }
                });
            }
        },
        Mutation: {
            createUser: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const { user } = yield appContext.services.UserService.registerUser(args.CreateUnverifiedUserInput);
                    return user;
                });
            },
            verifyUser: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const verified = yield appContext.services.UserService.verifyUser(args.VerifyUserInput);
                    return verified;
                });
            },
            forgotPassword: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const forgotPassword = yield appContext.services.UserService.forgotPassword(args.ForgotPasswordInput);
                    return forgotPassword;
                });
            },
            resetPassword: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const resetPassword = yield appContext.services.UserService.resetPassword(args.ResetPasswordInput);
                    return resetPassword;
                });
            },
            loginUser: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const user = yield appContext.services.UserService.loginUser(args.LoginUserInput);
                    return user;
                });
            },
            deleteUser: function (_, {}, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const res = yield appContext.services.UserService.deleteUser(context.user._id);
                    return res;
                });
            },
            updateUser: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const user = yield appContext.services.UserService.updateUser(args.UpdateUserInput, context.user._id);
                    return user;
                });
            },
            updateProfilePicture: function (_, args, context) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const avatar = yield appContext.services.UserService.updateProfilePicture(context.user._id);
                    return avatar;
                });
            },
            createUserSession: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const token = yield appContext.services.UserSessionService.createUserSession(args.CreateUserSessionInput);
                    return token;
                });
            },
            refreshToken: function (_, args) {
                return tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const accessToken = yield appContext.services.UserSessionService.refreshAccessToken(args.RefreshTokenInput.token);
                    return accessToken;
                });
            }
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=resolvers.js.map