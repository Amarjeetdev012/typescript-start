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
exports.create = void 0;
const admin_model_1 = require("../models/admin.model");
const env_config_1 = __importDefault(require("../../common/config/env.config"));
const admin_middleware_1 = require("../middleware/admin.middleware");
const common_validation_1 = require("../../common/validator/common.validation");
const secret = env_config_1.default.ADMIN_SECRET;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, secretKey } = req.body;
        if (secret !== secretKey) {
            return res
                .status(401)
                .send({ status: false, message: 'you are not authorised person' });
        }
        const checkMail = yield (0, admin_model_1.emailCheck)(email);
        if (checkMail.length > 0) {
            return res.status(400).send({
                status: false,
                message: 'this email is already used please use different email',
            });
        }
        const validPass = (0, common_validation_1.validPassword)(password);
        if (!validPass) {
            return res
                .status(400)
                .send({ status: false, message: 'please use a strong password' });
        }
        const hashPassword = (0, admin_middleware_1.hash)(password);
        (0, admin_model_1.createAdmin)(email, hashPassword).then((data) => {
            res.status(201).send({
                status: true,
                message: 'admin created succesfully',
                email,
            });
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.create = create;
