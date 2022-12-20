import {
  adminLogin,
  studentsLogin,
} from './controllers/authorization.controller';

const routesConfig = (app) => {
  app.post('/auth/Admin', adminLogin);
  app.post('/auth/Students', studentsLogin);
};

export default routesConfig;
