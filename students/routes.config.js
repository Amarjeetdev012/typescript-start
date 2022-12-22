import { studentslist, getbyId } from './controllers/students.controller';
import { validAdmin } from '../common/middlewares/auth.validation.middleware';
import { validBody, validUser } from './middlewares/student.middleware';
import registerSchema from './models/student.model.ajvRegistration';
import validateSchema from '../common/middlewares/auth.ajv.middleware';
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

  app.get('/students/:id', validUser, getbyId);

  app.get('/students/timelog/totalStudents', validAdmin, allData);

  app.get('/students/timelog/totaltime', validAdmin, totalSpentTime);
};

export default studentRoutes;
