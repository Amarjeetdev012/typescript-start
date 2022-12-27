"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = (password) => {
    const hash = bcrypt_1.default.hashSync(password, 10);
    return hash;
};
exports.hash = hash;
