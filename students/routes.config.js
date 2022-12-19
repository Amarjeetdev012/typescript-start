import { studentslist, getbyId } from './controllers/students.controller';
import { validAdmin } from '../common/middlewares/auth.validation.middleware';
import { validBody } from './middlewares/student.middleware';
import {
  create,
  entry,
  exit,
  allData,
  totalSpentTime,
} from './controllers/students.controller';

const studentRoutes = (app) => {
  // create students
  app.post('/students', validAdmin, validBody, create);
  // students entry
  app.post('/studentsEnter', entry);
  // students exit
  app.post('/studentsExit', exit);
  // all students list
  app.get('/students', validAdmin, studentslist);
  // get student by id
  app.get('/students/:id', getbyId);
  // get all exit and entry logs
  app.get('/studentEntryExit', allData);
  // total spent time of student
  app.get('/completeTime', validAdmin, totalSpentTime);
};

export default studentRoutes;
