import { uniqueEmail, uniqueUserName } from '../models/student.model';
import jwt from 'jsonwebtoken';
import config from '../../common/config/env.config';
import {
  isValidString,
  validPassword,
} from '../../common/validator/common.validation';

const secret = config.JWT.SECRET;

const validBody = async (req, res, next) => {
  const data = req.body;
  const { name, email, userName, password } = data;
  if (!isValidString(name)) {
    return res
      .status(400)
      .send({ status: false, message: 'please provide valid name' });
  }
  const validPass = validPassword(password);
  if (!validPass) {
    return res
      .status(400)
      .send({ status: false, message: 'please provide a strong password' });
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
  next();
};

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function newTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;
  hours = hours % 24;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

function filterName(checkDate) {
  const data = checkDate.map((element) => {
    return element.name;
  });
  return data;
}

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res
        .status(401)
        .send({ status: false, message: 'invalid validation method' });
    }
    req.jwt = jwt.verify(authorization[1], secret);
    if (id !== req.jwt._id) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not a authorise student' });
    }
    return next();
  } catch (err) {
    return res
      .status(403)
      .send({ status: false, message: 'error from valid user' });
  }
};

export { validBody, newTime, filterName, validUser };
