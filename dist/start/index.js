"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
function start(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            // initialize app
            const app = (0, express_1.default)();
            app.use(express_1.default.urlencoded({ extended: true }));
            //server health check
            app.use("/healthcheck", (_, res) => {
                res.status(200).send("All is green!!!");
            });
            app.listen(config.app.port, () => {
                console.log(`Server ready at http://localhost:${config.app.port}/graphql`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map