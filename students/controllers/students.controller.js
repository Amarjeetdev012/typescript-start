import config from '../../common/config/env.config';
import jwt from 'jsonwebtoken';
import {
  createEntry,
  updateExit,
  findName,
  findAll,
  checkEntry,
} from '../models/student.timelogs.model';
import {
  createStudent,
  list,
  studentId,
  listTime,
} from '../models/student.model';
import { newTime } from '../middlewares/student.middleware';

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
    const name = student.name;
    const time = new Date();
    const check = await checkEntry(name,time);
    if (!check[0].exitTime) {
      return res
        .status(400)
        .send({ status: false, message: 'please update your exittime first' });
    }
    const result = await createEntry(name, time);
    res.status(200).send({
      status: true,
      message: 'your time is registered',
      result,
    });
  } catch (err) {
    return res
      .status(403)
      .send({ status: false, message: 'error from valid jwt needed from entry' });
  }
};

// student out
const exit = async (req, res) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res.status(401).send();
    }
    req.jwt = jwt.verify(authorization[1], jwtSecret);
    const student = await studentId(req.jwt._id);
    const name = student.name;
    const time = new Date();
    const endata = await findName(name);
    const id = endata._id.toString();
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

// all students
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

// total time
const allData = async (req, res) => {
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
    const name = student.name;
    const totalData = await findAll(name);
    res
      .status(200)
      .send({ status: true, message: 'students list', data: totalData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const totalSpentTime = async (req, res) => {
  try {
    const name = req.query.name;
    const data = await findAll(name);
    const result = data.map(function (ele) {
      const x = ele.exitTime - ele.entryTime;
      return x;
    });
    const total = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const actualTime = newTime(total);
    res.status(200).send({
      status: true,
      message: 'total Time',
      totalSpentTime: actualTime,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};
export {
  create,
  studentslist,
  getbyId,
  entry,
  exit,
  allStudents,
  allData,
  totalSpentTime,
};
