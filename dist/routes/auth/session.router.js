"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const start_1 = require("../../start");
const router = express_1.default.Router();
router.post('/session/create', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield start_1.appContext.services.UserSessionService.createUserSession(req.body);
        res.status(201).json(tokens);
    }
    catch (e) {
        res.status(500);
    }
}));
router.post('/session/refresh', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield start_1.appContext.services.UserSessionService.refreshAccessToken(req.body);
        res.status(201).json(token);
    }
    catch (e) {
        res.status(500);
    }
}));
exports.default = router;
//# sourceMappingURL=session.router.js.map