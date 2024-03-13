"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    useId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true }
});
const Image = (0, mongoose_1.model)('images', imageSchema);
exports.default = Image;
//# sourceMappingURL=image.js.map