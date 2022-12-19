import config from '../../common/config/env.config';
import jwt from 'jsonwebtoken';
import { newTime } from '../middlewares/student.middleware';
import {
  createStudent,
  list,
  studentId,
  updateEntry,
  updateExit,
  listTime,
  updateTotal,
} from '../models/student.model';

const jwtSecret = config.JWT.SECRET;

// create students
const create = async (req, res) => {
  createStudent(req.body).then((data) => {
    delete req.body.time;
    delete req.body.resultTime;
    return res.status(201).send({
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
    const checkStudent = await studentId(Id);
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
    const time = new Date();
    const result = await updateEntry(id, time);
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

// studet out
const exit = async (req, res) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res.status(401).send();
    }
    req.jwt = jwt.verify(authorization[1], jwtSecret);
    const student = await studentId(req.jwt._id);
    const id = student._id.toString();
    const time = new Date();
    const result = await updateExit(id, time);
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

const totalTime = async (req, res) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res.status(401).send();
    }
    req.jwt = jwt.verify(authorization[1], jwtSecret);
    const student = await studentId(req.jwt._id);
    const id = student._id.toString();
    if (!student) {
      return res
        .status(400)
        .send({ status: false, message: 'no student found' });
    }
    const entryTime = student.entryTime;
    const exitTime = student.exitTime;
    const totalTime = exitTime - entryTime;
    const time = newTime(totalTime);
    const result = await updateTotal(id, time);
    res
      .status(200)
      .send({ status: true, message: 'students list', data: result });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

export { create, studentslist, getbyId, entry, exit, allStudents, totalTime };
