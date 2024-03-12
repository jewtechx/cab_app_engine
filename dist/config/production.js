"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    app: {
        name: "Cab App",
        environment: "production",
        port: process.env.PORT || 8080
    },
    db: {
        uri: process.env.MONGODB_PROD_URI || ""
    }
};
exports.default = config;
//# sourceMappingURL=production.js.map