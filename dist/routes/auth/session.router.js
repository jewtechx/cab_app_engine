"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const start_1 = require("../../start");
const router = express_1.default.Router();
router.post('/session/create', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield start_1.appContext.services.UserSessionService.createUserSession(req.body);
        res.cookie('tokens', {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
        res.status(201).json({ message: 'tokens sent as cookies' });
    }
    catch (e) {
        res.status(500).send('Error creating tokens');
    }
}));
router.post('/session/refresh', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield start_1.appContext.services.UserSessionService.refreshAccessToken(req.cookies['tokens'].refreshToken);
        res.cookie('access-token', token.accessToken);
        res.status(201).json({ message: 'tokens sent as cookies' });
    }
    catch (e) {
        res.status(500).send('Error creating token');
    }
}));
exports.default = router;
//# sourceMappingURL=session.router.js.map