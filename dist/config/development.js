"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    app: {
        name: "Cab App",
        environment: "development",
        port: 8080
    },
    db: {
        uri: process.env.MONGODB_DEV_URI || ""
    }
};
exports.default = config;
//# sourceMappingURL=development.js.map