import config from '../../common/config/env.config';
import jwt from 'jsonwebtoken';
import { newTime } from '../middlewares/student.middleware';
import { Request, Response } from 'express';
import {
  createEntry,
  updateExit,
  findName,
  checkEntry,
  findAllData,
  findDate,
  findStudentName,
  ITimelog,
} from '../models/student.timelogs.model';
import { createStudent, IStudent, list, studentId } from '../models/student.model';

const jwtSecret = config.JWT.SECRET;

// create students
const create = async (req: Request, res: Response) => {
  try {
    const { name, email, userName, password } = req.body;
    const data = createStudent(name, email, userName, password)
    return res.status(201).send({
      status: true,
      message: 'student created succesfully',
      data: { name, email, userName },
    });
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }

};

// get students list
const studentslist = async (req: Request, res: Response) => {
  try {
    const data = await list();
    res
      .status(200)
      .send({ status: true, message: 'students list', data: data });
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }
};

// get student by id
const getbyId = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }
};

// student entry time
const entry = async (req: Request, res: Response) => {
  try {
    // const authorization = req.headers['authorization'].split(' ');
    // if (authorization[0] !== 'Bearer') {
    //   return res.status(401).send();
    // }
    // req.jwt = jwt.verify(authorization[1], jwtSecret);
    let token = req.cookies.token;
    interface JwtPayload {
      _id: string
    }
    const data = jwt.verify(token, jwtSecret) as JwtPayload
    const student = await studentId(data._id) as IStudent
    const name = student.name
    const time = new Date();
    const check = await checkEntry(name);
    if (!(check.length > 0) || (check[0].exitTime)) {
      const result = await createEntry(name, time);
      return res.status(200).send({
        status: true,
        message: 'your time is registered',
        result,
      });
    }
    if (check[0].entryTime) {
      return res
        .status(400)
        .send({ status: false, message: 'please update your exitTime first' });
    }
  } catch (err) {
    return res.status(403).send({ status: false, message: 'error from valid jwt needed from entry', });
  }
};

// student exit time
const exit = async (req: Request, res: Response) => {
  try {
    // const authorization = req.headers['authorization'].split(' ');
    // if (authorization[0] !== 'Bearer') {
    //   return res.status(401).send();
    // }
    // req.jwt = jwt.verify(authorization[1], jwtSecret);
    let token = req.cookies.token;
    interface JwtPayload {
      _id: string
    }
    const data = jwt.verify(token, jwtSecret) as JwtPayload
    const student = await studentId(data._id);
    let name: string = ''
    if (student) {
      name = student.name;
    }
    const time = new Date();
    const endata = await findName(name);
    if (!endata.exitTime == false) {
      return res
        .status(400)
        .send({ status: false, message: 'please update your entrytime first' });
    }
    const id = endata._id.toString();
    const result = await updateExit(id, time);
    res.status(200).send({
      status: true,
      message: 'your time is registered',
      result,
    });
  } catch (err) {
    return res.status(403).send({
      status: false,
      message: 'error from valid jwt needed exit time',
    });
  }
};

// total entry or exit details
const allData = async (req: Request, res: Response) => {
  try {
    const totalData = await findAllData();
    res
      .status(200)
      .send({ status: true, message: 'students list', data: totalData });
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }
};

// total spent time of student
const totalSpentTime = async (req: Request, res: Response) => {
  try {
    const name = String(req.query.name || "");
    const en = String(req.query.entry || "");
    const ex = String(req.query.exit || "");
    const entry = new Date(en);
    const exit = new Date(ex);
    if (!en) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide entry time' });
    }
    if (!ex) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide exit time' });
    }
    const timelogs: ITimelog[] = await findStudentName(name) as ITimelog[];

    if (!timelogs.length) {
      return res
        .status(400)
        .send({ status: false, message: 'no student found ' });
    }

    const enterTimeLog = timelogs.filter(
      (ele: ITimelog) => {
        return ele.entryTime >= entry && ele.exitTime <= exit
      }
    );

    const checkDate = await findDate(en, ex);
    if (!checkDate.length) {
      return res.status(400).send({
        status: false,
        message: 'no student record found on this day',
      });
    }
    if (!checkDate.filter((ele) => ele.name == name)) {
      res
        .status(400)
        .send({ status: false, message: 'no students found on given date' });
    }
    const result = enterTimeLog.map(function (ele: ITimelog) {
      const x = (+ele.exitTime) - (+ele.entryTime)
      return x;
    });



    const total = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const time = newTime(total);

    const actualTime =
      time.days +
      ' days, ' +
      time.hours +
      ' hours, ' +
      time.minutes +
      ' minutes, ' +
      time.seconds +
      ' seconds';

    res.status(200).send({
      status: true,
      message: 'total Time',
      totalSpentTime: actualTime,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }
};

export { create, studentslist, getbyId, entry, exit, allData, totalSpentTime };
