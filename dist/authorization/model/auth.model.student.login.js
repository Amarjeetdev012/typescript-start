"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
(0, ajv_formats_1.default)(ajv);
const schema = {
    type: 'object',
    properties: {
        userName: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['userName', 'password'],
    additionalProperties: false,
};
const studentloginSchema = ajv.compile(schema);
exports.default = studentloginSchema;
