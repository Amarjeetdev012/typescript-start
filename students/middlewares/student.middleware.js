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

// function newTime(ms) {
//   let seconds = (ms / 1000).toFixed(2);
//   let minutes = (ms / (1000 * 60)).toFixed(2);
//   let hours = (ms / (1000 * 60 * 60)).toFixed(2);
//   let days = (ms / (1000 * 60 * 60 * 24)).toFixed(2);
//   if (seconds < 60) return seconds + ' Sec';
//   else if (minutes < 60) return minutes + ' Min';
//   else if (hours < 24) return hours + ' Hrs';
//   else return days + ' Days';
// }

function newTime(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
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
    let token = req.cookies.token;
    // const authorization = req.headers['authorization'].split(' ');
    // if (authorization[0] !== 'Bearer') {
    //   return res
    //     .status(401)
    //     .send({ status: false, message: 'invalid validation method' });
    //  }
    // req.jwt = jwt.verify(authorization[1], secret);
    req.jwt = jwt.verify(token, secret);
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
