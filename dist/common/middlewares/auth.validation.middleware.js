"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAdmin = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = require("../../admin/models/admin.model");
const secret = env_config_1.default.JWT.SECRET;
const validAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.cookies.token;
        const data = jsonwebtoken_1.default.verify(token, secret);
        const checkId = yield (0, admin_model_1.adminId)(data._id);
        if (!checkId) {
            return res.status(401).send({
                status: false,
                message: 'you are not a authorised person',
            });
        }
        return next();
    }
    catch (err) {
        return res
            .status(403)
            .send({ status: false, message: 'error from valid admin' });
    }
});
exports.validAdmin = validAdmin;
