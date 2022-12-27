import { create } from './controllers/admin.controller';
import validateSchema from '../common/middlewares/auth.ajv.middleware';
import registerSchema from './models/admin.model.ajv';
import { Express } from 'express-serve-static-core';

const adminRoutes = (app: Express) => {
  app.post('/admin', validateSchema(registerSchema), create);
};

export default adminRoutes;
