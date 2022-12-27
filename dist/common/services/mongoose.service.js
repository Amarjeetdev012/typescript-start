"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', false);
const connectDatabase = () => {
    console.log('mongodb is connecting');
    mongoose_1.default
        .connect('mongodb+srv://amarjeet:uwStVsg8DWsD2PZz@cluster0.q5wqi3f.mongodb.net/test')
        .then(() => {
        console.log(`mongodb is connected`);
    })
        .catch((err) => {
        console.log(`${err}`);
    });
};
exports.default = connectDatabase;
