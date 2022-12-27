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
exports.checkExit = exports.findStudentName = exports.findDate = exports.findAllData = exports.checkEntry = exports.find = exports.findName = exports.updateExit = exports.createEntry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timeLogsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    entryTime: {
        type: Date,
    },
    exitTime: {
        type: Date,
    },
    totalTime: {
        type: String,
    },
});
const TimeLog = mongoose_1.default.model('timelogs', timeLogsSchema);
const createEntry = (name, entryTime) => __awaiter(void 0, void 0, void 0, function* () {
    const timeLog = new TimeLog({ name, entryTime });
    return timeLog.save();
});
exports.createEntry = createEntry;
// Promise<Document<ITime>>
const checkEntry = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const checkExit = yield (yield TimeLog.find({ name })).reverse();
    return checkExit;
});
exports.checkEntry = checkEntry;
const checkExit = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const checkExit = yield (yield TimeLog.find({ name })).reverse();
    return checkExit;
});
exports.checkExit = checkExit;
const updateExit = (id, time) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield TimeLog.findByIdAndUpdate({ _id: id }, { exitTime: time }, {
        new: true,
    });
    return result;
});
exports.updateExit = updateExit;
const findName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (yield TimeLog.find({ name })).reverse();
    return data[0];
});
exports.findName = findName;
const find = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield TimeLog.find({ name: name });
    //   const data = await TimeLog.find();
    return data;
});
exports.find = find;
const findAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield TimeLog.find();
    return data;
});
exports.findAllData = findAllData;
const findDate = (entry, exit) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield TimeLog.find({
        entryTime: {
            $gte: new Date(entry),
        },
        exitTime: { $lte: new Date(exit) },
    });
    return data;
});
exports.findDate = findDate;
// Promise<Document<ITime>>
const findStudentName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield TimeLog.find({ name });
    return data;
});
exports.findStudentName = findStudentName;
