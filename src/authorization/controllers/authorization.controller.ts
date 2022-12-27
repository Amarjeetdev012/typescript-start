import jwt from 'jsonwebtoken';
import { emailCheck } from '../../admin/models/admin.model';
import { uniqueUserName } from '../../students/models/student.model';
import config from '../../common/config/env.config';
import { Request, Response } from 'express';
import { verifyPass } from '../validation/auth.validation';

const { sign } = jwt;
const jwtSecret = config.JWT.SECRET;

// admin login
const adminLogin = async (req:Request, res:Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const validAdmin = await emailCheck(email);
    if (!validAdmin.length) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorized person' });
    }
    const adminId = validAdmin[0]._id.toString();
    const hash = validAdmin[0].password;
   
    const verify = await verifyPass(password, hash!);
    if (!verify) {
      return res.status(400).send({ status: false, message: 'wrong password' });
    }
    const token = sign({ _id: adminId }, jwtSecret);
    res.cookie('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });
    res.status(201).send({
      status: true,
      message: 'you are login succesfully',
      token: token,
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

// student login
const studentsLogin = async (req:Request, res:Response) => {
  try {
    const data = req.body;
    const { userName, password } = data;
    const validStudent = await uniqueUserName(userName);
    if (!validStudent.length) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorized student' });
    }
    const hash = validStudent[0].password;
    const verify = await verifyPass(password, hash);
    if (!verify) {
      return res.status(400).send({
        status: false,
        message: 'password are not matched please use right password',
      });
    }
    const studentId = validStudent[0]._id.toString();
    const token = sign({ _id: studentId }, jwtSecret, { expiresIn: '24h' });
    res.cookie('token', token, {
      maxAge: 864000,
      httpOnly: true,
    });
    res.status(201).send({
      status: true,
      message: 'you are login succesfully',
      token,
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

export { adminLogin, studentsLogin };
