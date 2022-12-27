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
exports.listTime = exports.studentId = exports.list = exports.uniqueUserName = exports.uniqueEmail = exports.createStudent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const admin_middleware_1 = require("../../admin/middleware/admin.middleware");
const studentSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    userName: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
});
const Student = mongoose_1.default.model('Students', studentSchema);
const createStudent = (name, email, userName, password1) => {
    const password = (0, admin_middleware_1.hash)(password1);
    const student = new Student({ name, email, userName, password });
    return student.save();
};
exports.createStudent = createStudent;
const uniqueEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield Student.find({ email });
        return data;
    });
};
exports.uniqueEmail = uniqueEmail;
const uniqueUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Student.find({ userName });
    return data;
});
exports.uniqueUserName = uniqueUserName;
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Student.find().select({ password: 0 });
    return data;
});
exports.list = list;
const listTime = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Student.find().select({ _id: 1, time: 1, name: 1 });
    return data;
});
exports.listTime = listTime;
const studentId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Student.findById(id).select({ password: 0 });
    return data;
});
exports.studentId = studentId;
