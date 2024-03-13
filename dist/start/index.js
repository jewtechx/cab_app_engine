"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const express4_1 = require("@apollo/server/express4");
const models_1 = tslib_1.__importDefault(require("../models"));
const services_1 = tslib_1.__importDefault(require("../services"));
const log_1 = tslib_1.__importDefault(require("../utils/log"));
const graphql_1 = tslib_1.__importDefault(require("../graphql"));
const context_1 = require("../middlewares/context");
function start(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // setting global context
            const appContext = {};
            // initialize models
            appContext.models = yield (0, models_1.default)(config.db);
            appContext.services = yield (0, services_1.default)(appContext);
            // initialize app
            const app = (0, express_1.default)();
            app.use(express_1.default.urlencoded({ extended: true }));
            //initialize graph
            const graph = (0, graphql_1.default)(appContext);
            yield graph.start();
            //server health check
            app.use("/healthcheck", (_, res) => {
                res.status(200).send("All is green!!!");
            });
            //apollo server express middleware
            app.use("/graphql", (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(graph, {
                context: context_1.setContext,
            }));
            app.listen(config.app.port, () => {
                log_1.default.info(`Server ready at http://localhost:${config.app.port}/graphql`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map