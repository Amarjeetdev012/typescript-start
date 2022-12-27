import { uniqueEmail, uniqueUserName } from '../models/student.model';
import jwt from 'jsonwebtoken';
import config from '../../common/config/env.config';
import { Request, Response, NextFunction } from 'express';
import {
  isValidString,
  validPassword,
} from '../../common/validator/common.validation';

const secret = config.JWT.SECRET;

const validBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (error) {
    res.status(500).send({ status: false, error: (error as Error).message });
  }

};

function newTime(ms: number) {
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

const validUser = async (req: Request, res: Response, next: NextFunction) => {
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
    interface JwtPayload {
      _id: string;
    }
    const jwtToken = jwt.verify(token, secret) as JwtPayload;
    if (id !== jwtToken._id) {
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

export { validBody, newTime, validUser };
