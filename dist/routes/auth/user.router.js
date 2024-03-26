"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const context_1 = tslib_1.__importDefault(require("../../middlewares/context"));
const start_1 = require("../../start");
const router = express_1.default.Router();
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
router.delete('/deleteuser', (req, res) => {
    try {
        const message = start_1.appContext.services.UserService.deleteUser(req.user);
        res.status(201).json(message);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
});
router.post('/updateprofilepicture', (req, res) => {
    try {
        const message = start_1.appContext.services.UserService.updateProfilePicture(req.user);
        res.status(201).json(message);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
});
router.get('/getuserrating', (req, res) => {
    try {
        const rating = start_1.appContext.services.UserService.getUserRating(req.user);
        res.status(201).json(rating);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
});
exports.default = router;
//# sourceMappingURL=user.router.js.map