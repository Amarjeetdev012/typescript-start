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
exports.adminId = exports.emailCheck = exports.createAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    email: String,
    password: String,
});
const Admin = mongoose_1.default.model('Admin', adminSchema);
const createAdmin = (data, password) => {
    const admin = new Admin({ data, password });
    return admin.save();
};
exports.createAdmin = createAdmin;
const emailCheck = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield Admin.find({ email });
        return data;
    });
};
exports.emailCheck = emailCheck;
const adminId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Admin.findById(id);
    return data;
});
exports.adminId = adminId;
