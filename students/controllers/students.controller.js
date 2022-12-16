import { adminId } from '../../admin/models/admin.model';
import config from '../../common/config/env.config';
import jwt from 'jsonwebtoken';
import { currTime } from '../../common/validator/validation';
import { validBody } from '../middlewares/student.middleware';
import {
  createStudent,
  uniqueEmail,
  uniqueUserName,
  list,
  studentId,
  update,
  listTime,
} from '../models/student.model';

const jwtSecret = config.JWT.SECRET;

// create students
const create = async (req, res) => {
  const data = await validBody(req, res);
  createStudent(data).then((data) => {
    delete req.body.time;
    res.status(201).send({
      status: true,
      message: 'student created succesfully',
      data: req.body,
    });
  });
};

// get students list
const studentslist = async (req, res) => {
  try {
    const data = await list();
    res
      .status(200)
      .send({ status: true, message: 'students list', data: data });
  } catch (error) {
    res.status(500).send({ status: false, err: err.message });
  }
};

// get student by id
const getbyId = async (req, res) => {
  try {
    let Id = req.params.id;
    checkStudent = await studentId(Id);
    if (!checkStudent) {
      return res
        .status(404)
        .send({ status: false, message: 'no student found' });
    }
    res.status(200).send({
      status: true,
      message: 'student found succesfully',
      data: checkStudent,
    });
  } catch (err) {
    res.status(500).send({ status: false, err: err.message });
  }
};

// student in
const entry = async (req, res) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res.status(401).send();
    }
    req.jwt = jwt.verify(authorization[1], jwtSecret);
    const student = await studentId(req.jwt._id);
    const id = student._id.toString();
    const curr = currTime();
    const time = [];
    time.push(curr);
    const result = await update(id, time);
    res.status(200).send({
      status: true,
      message: 'your time is registered',
      result,
    });
  } catch (err) {
    return res
      .status(403)
      .send({ status: false, message: 'error from validjwtneeded' });
  }
};

// studet exit
const exit = async (req, res) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res.status(401).send();
    }
    req.jwt = jwt.verify(authorization[1], jwtSecret);
    const student = await studentId(req.jwt._id);
    const id = student._id.toString();
    const curr = currTime();
    const time = [];
    time.push(curr);
    const result = await update(id, time);
    res.status(200).send({
      status: true,
      message: 'your time is registered',
      result,
    });
  } catch (err) {
    return res
      .status(403)
      .send({ status: false, message: 'error from validjwtneeded' });
  }
};

const allStudents = async (req, res) => {
  try {
    const data = await listTime();
    res
      .status(200)
      .send({ status: true, message: 'students list', data: data });
  } catch (error) {
    res.status(500).send({ status: false, err: err.message });
  }
};

export { create, studentslist, getbyId, entry, exit, allStudents };
