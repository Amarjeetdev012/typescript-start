import mongoose from 'mongoose';
import { isValidString } from '../../common/validator/validation';
import * as EmailValidator from 'email-validator';
import {
  createStudent,
  uniqueEmail,
  uniqueUserName,
} from '../../students/models/user.model';


const create = async (req, res) => {
    const data = req.body;
    const { name, email, userName, password } = data;
    if (!name & isValidString(name)) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide valid name' });
    }
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide email' });
    }
    if (!EmailValidator.validate(email)) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide valid email' });
    }
    if (!userName) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide userName' });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: 'please provide password' });
    }
  
    const emailValid = await uniqueEmail(email);
    if (emailValid.length > 0) {
      return res.status(400).send({
        status: false,
        message:
          'please provide different email this email is already registered',
      });
    }
  
    const userNameValid = await uniqueUserName(userName);
    if (userNameValid.length > 0) {
      return res.status(400).send({
        status: false,
        message:
          'please provide different userName this userName is already registered',
      });
    }
  
    createStudent(req.body).then((data) => {
      res.status(201).send({
        status: true,
        message: 'student created succesfully',
        data: data,
      });
    });
  };

  export {create}