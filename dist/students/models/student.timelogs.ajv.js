"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_ajv_1 = __importDefault(require("./student.model.ajv"));
const schema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        entryTime: { type: 'string', format: 'date' },
        exitTime: { type: 'string', format: 'date' },
        totalTime: { type: 'string' },
    },
    required: ['name'],
    additionalProperties: false,
};
const registerSchema = student_model_ajv_1.default.compile(schema);
exports.default = registerSchema;
