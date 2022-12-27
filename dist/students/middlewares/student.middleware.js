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
exports.validUser = exports.newTime = exports.validBody = void 0;
const student_model_1 = require("../models/student.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../../common/config/env.config"));
const common_validation_1 = require("../../common/validator/common.validation");
const secret = env_config_1.default.JWT.SECRET;
const validBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { name, email, userName, password } = data;
        if (!(0, common_validation_1.isValidString)(name)) {
            return res
                .status(400)
                .send({ status: false, message: 'please provide valid name' });
        }
        const validPass = (0, common_validation_1.validPassword)(password);
        if (!validPass) {
            return res
                .status(400)
                .send({ status: false, message: 'please provide a strong password' });
        }
        const emailValid = yield (0, student_model_1.uniqueEmail)(email);
        if (emailValid.length > 0) {
            return res.status(400).send({
                status: false,
                message: 'please provide different email this email is already registered',
            });
        }
        const userNameValid = yield (0, student_model_1.uniqueUserName)(userName);
        if (userNameValid.length > 0) {
            return res.status(400).send({
                status: false,
                message: 'please provide different userName this userName is already registered',
            });
        }
        next();
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.validBody = validBody;
function newTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return {
        days,
        hours,
        minutes,
        seconds,
    };
}
exports.newTime = newTime;
const validUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let token = req.cookies.token;
        const jwtToken = jsonwebtoken_1.default.verify(token, secret);
        if (id !== jwtToken._id) {
            return res
                .status(401)
                .send({ status: false, message: 'you are not a authorise student' });
        }
        return next();
    }
    catch (err) {
        return res
            .status(403)
            .send({ status: false, message: 'error from valid user' });
    }
});
exports.validUser = validUser;
