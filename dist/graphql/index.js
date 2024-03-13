"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const subgraph_1 = require("@apollo/subgraph");
const server_1 = require("@apollo/server");
const user_1 = tslib_1.__importDefault(require("./user"));
const apartment_1 = tslib_1.__importDefault(require("./apartment"));
const booking_1 = tslib_1.__importDefault(require("./booking"));
const payment_1 = tslib_1.__importDefault(require("./payment"));
function initGraph(appContext) {
    const schema = (0, subgraph_1.buildSubgraphSchema)([
        (0, user_1.default)(appContext),
        (0, apartment_1.default)(appContext),
        (0, booking_1.default)(appContext),
        (0, payment_1.default)(appContext)
    ]);
    const graph = new server_1.ApolloServer({
        schema
    });
    return graph;
}
exports.default = initGraph;
//# sourceMappingURL=index.js.map