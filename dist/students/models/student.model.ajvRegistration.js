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
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        userName: { type: 'string' },
    },
    required: ['name', 'email', 'password', 'userName'],
    additionalProperties: false,
};
const registerSchema = student_model_ajv_1.default.compile(schema);
exports.default = registerSchema;
