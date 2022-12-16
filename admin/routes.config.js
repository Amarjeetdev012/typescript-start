import { create} from './controllers/admin.controller';

const adminRoutes = (app) => {
  app.post('/admin', create);
};

export default adminRoutes;
