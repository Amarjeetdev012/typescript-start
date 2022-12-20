import { studentslist, getbyId } from './controllers/students.controller';
import { validAdmin } from '../common/middlewares/auth.validation.middleware';
import { validBody } from './middlewares/student.middleware';
import registerSchema from './models/student.model.ajvRegistration';
import { validateSchema } from './middlewares/student.ajv.validation';
import {
  create,
  entry,
  exit,
  allData,
  totalSpentTime,
} from './controllers/students.controller';

const studentRoutes = (app) => {
  app.post(
    '/students',
    validAdmin,
    validateSchema(registerSchema),
    validBody,
    create
  );
  app.post('/students/timelogs/start', entry);

  app.post('/students/timelogs/end', exit);

  app.get('/students', validAdmin, studentslist);

  app.get('/students/:id', getbyId);

  app.get('/students/timelogs', validAdmin, allData);

  app.get('/students/timelogs/totaltime', validAdmin, totalSpentTime);
};

export default studentRoutes;
