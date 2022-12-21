import validateSchema from '../common/middlewares/auth.ajv.middleware';
import loginSchema from './model/auth.model.admin.login.ajv';
import studentloginSchema from './model/auth.model.student.login';
import {
  adminLogin,
  studentsLogin,
} from './controllers/authorization.controller';

const routesConfig = (app) => {
  app.post('/auth/Admin',validateSchema(loginSchema), adminLogin);
  app.post('/auth/Students',validateSchema(studentloginSchema), studentsLogin);
};

export default routesConfig;
