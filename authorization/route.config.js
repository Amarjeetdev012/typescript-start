import {
  adminLogin,
  studentsLogin,
} from './controllers/authorization.controller';

const routesConfig = (app) => {
  app.post('/authAdmin', adminLogin);
  app.post('/authStudentsLogin', studentsLogin);
};

export default routesConfig;
