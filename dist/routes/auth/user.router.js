"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const context_1 = tslib_1.__importDefault(require("../../middlewares/context"));
const start_1 = require("../../start");
const user_1 = tslib_1.__importDefault(require("../../models/user/user"));
const router = express_1.default.Router();
router.get('/me', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.user._id });
    res.status(200).json(user);
}));
router.get('/users', context_1.default, (_, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find();
    res.status(200).json(user);
}));
router.post('/register', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield start_1.appContext.services.UserService.registerUser(req.body);
        res.status(201).json({ user });
    }
    catch (e) {
        res.status(500).send('error creating user');
    }
}));
router.post('/verify', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield start_1.appContext.services.UserService.verifyUser(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).send('error verifying user');
    }
}));
router.post('/forgotpassword', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield start_1.appContext.services.UserService.forgotPassword(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500).send('error reseting password');
    }
}));
router.post('/resetpassword', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield start_1.appContext.services.UserService.resetPassword(req.body);
        res.status(200).json(response);
    }
    catch (e) {
        res.status(500);
    }
}));
router.post('/login', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield start_1.appContext.services.UserService.loginUser(req.body);
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500);
    }
}));
router.put('/updateuser', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield start_1.appContext.services.UserService.updateUser(req.body, req.user._id);
        res.status(200).json(user);
    }
    catch (e) {
        res.status(500);
    }
}));
router.delete('/deleteuser', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield start_1.appContext.services.UserService.deleteUser(req.user._id);
        res.status(201).json(message);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}));
router.post('/uploadprofilepicture', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // const user = await User.findOne({ _id: req.user._id });
        // if (!user || !user.verified) {
        //   return res.status(500).send('User not verified');
        // }
        // uploadAvatar(req, res, async (err) => {
        //   if (err) {
        //     return res.status(500).send(err.message);
        //   }
        //   try {
        //     // await user.updateOne({ $set: { profile: { avatar: req.file.path } } }, { new: true, upsert: true });
        //     // await user.save();
        //     res.status(201).send('Avatar uploaded');
        //   } catch (e) {
        //     res.status(500).send('Error updating user profile');
        //   }
        res.status(201).send('Avatar uploaded');
        // });
    }
    catch (e) {
        res.status(500).send('Error processing request');
    }
}));
router.get('/getuserrating', context_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield start_1.appContext.services.UserService.getUserRating(req.user._id);
        res.status(201).json(rating);
    }
    catch (e) {
        res.status(500).send('error getting user rating');
    }
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map