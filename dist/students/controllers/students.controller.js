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
exports.totalSpentTime = exports.allData = exports.exit = exports.entry = exports.getbyId = exports.studentslist = exports.create = void 0;
const env_config_1 = __importDefault(require("../../common/config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_middleware_1 = require("../middlewares/student.middleware");
const student_timelogs_model_1 = require("../models/student.timelogs.model");
const student_model_1 = require("../models/student.model");
const jwtSecret = env_config_1.default.JWT.SECRET;
// create students
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, userName, password } = req.body;
        const data = (0, student_model_1.createStudent)(name, email, userName, password);
        return res.status(201).send({
            status: true,
            message: 'student created succesfully',
            data: { name, email, userName },
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.create = create;
// get students list
const studentslist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, student_model_1.list)();
        res
            .status(200)
            .send({ status: true, message: 'students list', data: data });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.studentslist = studentslist;
// get student by id
const getbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Id = req.params.id;
        const checkStudent = yield (0, student_model_1.studentId)(Id);
        if (!checkStudent) {
            return res
                .status(404)
                .send({ status: false, message: 'no student found' });
        }
        res.status(200).send({
            status: true,
            message: 'student found succesfully',
            data: checkStudent,
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.getbyId = getbyId;
// student entry time
const entry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorization = req.headers['authorization'].split(' ');
        // if (authorization[0] !== 'Bearer') {
        //   return res.status(401).send();
        // }
        // req.jwt = jwt.verify(authorization[1], jwtSecret);
        let token = req.cookies.token;
        const data = jsonwebtoken_1.default.verify(token, jwtSecret);
        const student = yield (0, student_model_1.studentId)(data._id);
        const name = student.name;
        const time = new Date();
        const check = yield (0, student_timelogs_model_1.checkEntry)(name);
        if (!(check.length > 0) || (check[0].exitTime)) {
            const result = yield (0, student_timelogs_model_1.createEntry)(name, time);
            return res.status(200).send({
                status: true,
                message: 'your time is registered',
                result,
            });
        }
        if (check[0].entryTime) {
            return res
                .status(400)
                .send({ status: false, message: 'please update your exitTime first' });
        }
    }
    catch (err) {
        return res.status(403).send({ status: false, message: 'error from valid jwt needed from entry', });
    }
});
exports.entry = entry;
// student exit time
const exit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorization = req.headers['authorization'].split(' ');
        // if (authorization[0] !== 'Bearer') {
        //   return res.status(401).send();
        // }
        // req.jwt = jwt.verify(authorization[1], jwtSecret);
        let token = req.cookies.token;
        const data = jsonwebtoken_1.default.verify(token, jwtSecret);
        const student = yield (0, student_model_1.studentId)(data._id);
        let name = '';
        if (student) {
            name = student.name;
        }
        const time = new Date();
        const endata = yield (0, student_timelogs_model_1.findName)(name);
        if (!endata.exitTime == false) {
            return res
                .status(400)
                .send({ status: false, message: 'please update your entrytime first' });
        }
        const id = endata._id.toString();
        const result = yield (0, student_timelogs_model_1.updateExit)(id, time);
        res.status(200).send({
            status: true,
            message: 'your time is registered',
            result,
        });
    }
    catch (err) {
        return res.status(403).send({
            status: false,
            message: 'error from valid jwt needed exit time',
        });
    }
});
exports.exit = exit;
// total entry or exit details
const allData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalData = yield (0, student_timelogs_model_1.findAllData)();
        res
            .status(200)
            .send({ status: true, message: 'students list', data: totalData });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.allData = allData;
// total spent time of student
const totalSpentTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = String(req.query.name || "");
        const en = String(req.query.entry || "");
        const ex = String(req.query.exit || "");
        const entry = new Date(en);
        const exit = new Date(ex);
        if (!en) {
            return res
                .status(400)
                .send({ status: false, message: 'please provide entry time' });
        }
        if (!ex) {
            return res
                .status(400)
                .send({ status: false, message: 'please provide exit time' });
        }
        const timelogs = yield (0, student_timelogs_model_1.findStudentName)(name);
        if (!timelogs.length) {
            return res
                .status(400)
                .send({ status: false, message: 'no student found ' });
        }
        const enterTimeLog = timelogs.filter((ele) => {
            return ele.entryTime >= entry && ele.exitTime <= exit;
        });
        const checkDate = yield (0, student_timelogs_model_1.findDate)(en, ex);
        if (!checkDate.length) {
            return res.status(400).send({
                status: false,
                message: 'no student record found on this day',
            });
        }
        if (!checkDate.filter((ele) => ele.name == name)) {
            res
                .status(400)
                .send({ status: false, message: 'no students found on given date' });
        }
        const result = enterTimeLog.map(function (ele) {
            const x = (+ele.exitTime) - (+ele.entryTime);
            return x;
        });
        const total = result.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const time = (0, student_middleware_1.newTime)(total);
        const actualTime = time.days +
            ' days, ' +
            time.hours +
            ' hours, ' +
            time.minutes +
            ' minutes, ' +
            time.seconds +
            ' seconds';
        res.status(200).send({
            status: true,
            message: 'total Time',
            totalSpentTime: actualTime,
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});
exports.totalSpentTime = totalSpentTime;
