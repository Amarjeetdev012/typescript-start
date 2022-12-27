"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const students_controller_1 = require("./controllers/students.controller");
const auth_validation_middleware_1 = require("../common/middlewares/auth.validation.middleware");
const student_middleware_1 = require("./middlewares/student.middleware");
const student_model_ajvRegistration_1 = __importDefault(require("./models/student.model.ajvRegistration"));
const auth_ajv_middleware_1 = __importDefault(require("../common/middlewares/auth.ajv.middleware"));
const students_controller_2 = require("./controllers/students.controller");
const studentRoutes = (app) => {
    app.post('/students', auth_validation_middleware_1.validAdmin, (0, auth_ajv_middleware_1.default)(student_model_ajvRegistration_1.default), student_middleware_1.validBody, students_controller_2.create);
    app.post('/students/timelogs/start', students_controller_2.entry);
    app.post('/students/timelogs/end', students_controller_2.exit);
    app.get('/students', auth_validation_middleware_1.validAdmin, students_controller_1.studentslist);
    app.get('/students/:id', student_middleware_1.validUser, students_controller_1.getbyId);
    app.get('/students/timelog/totalStudents', auth_validation_middleware_1.validAdmin, students_controller_2.allData);
    app.get('/students/timelog/totaltime', auth_validation_middleware_1.validAdmin, students_controller_2.totalSpentTime);
};
exports.default = studentRoutes;
