import {
  allStudents,
  create,
  entry,
  exit,
} from './controllers/students.controller';
import { studentslist, getbyId } from './controllers/students.controller';
import { validAdmin } from '../common/middlewares/auth.validation.middleware';

const studentRoutes = (app) => {
  app.post('/students', validAdmin, create);
  app.post('/studentsEnter', entry);
  app.post('/studentsExit', exit);
  app.get('/students', validAdmin, studentslist);
  app.get('/students/:id', getbyId);
  app.get('/studentsEntryTime', validAdmin, allStudents);
};

export default studentRoutes;
