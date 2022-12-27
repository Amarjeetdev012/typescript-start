"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("./controllers/admin.controller");
const auth_ajv_middleware_1 = __importDefault(require("../common/middlewares/auth.ajv.middleware"));
const admin_model_ajv_1 = __importDefault(require("./models/admin.model.ajv"));
const adminRoutes = (app) => {
    app.post('/admin', (0, auth_ajv_middleware_1.default)(admin_model_ajv_1.default), admin_controller_1.create);
};
exports.default = adminRoutes;
