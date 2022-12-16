import { create } from './controllers/admin.controller';

const studentRoutes = (app) => {
  app.post('/students', create);
};

export default studentRoutes;
