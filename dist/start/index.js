"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContext = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const models_1 = tslib_1.__importDefault(require("../models"));
const services_1 = tslib_1.__importDefault(require("../services"));
const log_1 = tslib_1.__importDefault(require("../utils/log"));
const routes_1 = tslib_1.__importDefault(require("../routes"));
exports.appContext = {};
function start(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // setting global context
            // initialize models
            exports.appContext.models = yield (0, models_1.default)(config.db);
            exports.appContext.services = yield (0, services_1.default)(exports.appContext);
            // initialize app
            const app = (0, express_1.default)();
            app.use(express_1.default.urlencoded({ extended: true }));
            app.use((0, cors_1.default)(), (0, body_parser_1.json)());
            //server health check
            app.use("/healthcheck", (_, res) => {
                res.status(200).send("All is green!!!");
            });
            //router
            app.use(routes_1.default);
            app.listen(config.app.port, () => {
                log_1.default.info(`Server ready at http://localhost:${config.app.port}`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map