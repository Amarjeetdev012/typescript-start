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
exports.studentsLogin = exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = require("../../admin/models/admin.model");
const student_model_1 = require("../../students/models/student.model");
const env_config_1 = __importDefault(require("../../common/config/env.config"));
const auth_validation_1 = require("../validation/auth.validation");
const { sign } = jsonwebtoken_1.default;
const jwtSecret = env_config_1.default.JWT.SECRET;
// admin login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const validAdmin = yield (0, admin_model_1.emailCheck)(email);
        if (!validAdmin.length) {
            return res
                .status(401)
                .send({ status: false, message: 'you are not authorized person' });
        }
        const adminId = validAdmin[0]._id.toString();
        const hash = validAdmin[0].password;
        const verify = yield (0, auth_validation_1.verifyPass)(password, hash);
        if (!verify) {
            return res.status(400).send({ status: false, message: 'wrong password' });
        }
        const token = sign({ _id: adminId }, jwtSecret);
        res.cookie('token', token, {
            maxAge: 86400000,
            httpOnly: true,
        });
        res.status(201).send({
            status: true,
            message: 'you are login succesfully',
            token: token,
        });
    }
    catch (err) {
        res.status(500).send({ errors: err });
    }
});
exports.adminLogin = adminLogin;
// student login
const studentsLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { userName, password } = data;
        const validStudent = yield (0, student_model_1.uniqueUserName)(userName);
        if (!validStudent.length) {
            return res
                .status(401)
                .send({ status: false, message: 'you are not authorized student' });
        }
        const hash = validStudent[0].password;
        const verify = yield (0, auth_validation_1.verifyPass)(password, hash);
        if (!verify) {
            return res.status(400).send({
                status: false,
                message: 'password are not matched please use right password',
            });
        }
        const studentId = validStudent[0]._id.toString();
        const token = sign({ _id: studentId }, jwtSecret, { expiresIn: '24h' });
        res.cookie('token', token, {
            maxAge: 864000,
            httpOnly: true,
        });
        res.status(201).send({
            status: true,
            message: 'you are login succesfully',
            token,
        });
    }
    catch (err) {
        res.status(500).send({ errors: err });
    }
});
exports.studentsLogin = studentsLogin;
