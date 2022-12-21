import { create } from './controllers/admin.controller';
import validateSchema from '../common/middlewares/auth.ajv.middleware';
import registerSchema from './models/admin.model.ajv';

const adminRoutes = (app) => {
  app.post('/admin', validateSchema(registerSchema), create);
};

export default adminRoutes;
