"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_ajv_middleware_1 = __importDefault(require("../common/middlewares/auth.ajv.middleware"));
const auth_model_admin_login_ajv_1 = __importDefault(require("./model/auth.model.admin.login.ajv"));
const auth_model_student_login_1 = __importDefault(require("./model/auth.model.student.login"));
const authorization_controller_1 = require("./controllers/authorization.controller");
const routesConfig = (app) => {
    app.post('/auth/Admin', (0, auth_ajv_middleware_1.default)(auth_model_admin_login_ajv_1.default), authorization_controller_1.adminLogin);
    app.post('/auth/Students', (0, auth_ajv_middleware_1.default)(auth_model_student_login_1.default), authorization_controller_1.studentsLogin);
};
exports.default = routesConfig;
