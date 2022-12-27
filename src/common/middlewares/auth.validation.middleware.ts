import config from '../config/env.config';
import jwt from 'jsonwebtoken';
import { adminId } from '../../admin/models/admin.model';
import { Request, Response, NextFunction } from 'express';

const secret = config.JWT.SECRET;

const validAdmin = async (req:Request, res:Response, next:NextFunction) => {
  try {
    // const authorization = req.headers['authorization'].split(' ');
    // if (authorization[0] !== 'Bearer') {
    //   return res
    //     .status(401)
    //     .send({ status: false, message: 'invalid validation method' });
    // }
    // req.jwt = jwt.verify(authorization[1], secret);

    interface JwtPayload {
      _id: string
    }
    let token = req.cookies.token
    const data = jwt.verify(token, secret) as JwtPayload
    const checkId = await adminId(data._id);
    if (!checkId) {
      return res.status(401).send({
        status: false,
        message: 'you are not a authorised person',
      });
    }
    return next();
  } catch (err) {
    return res
      .status(403)
      .send({ status: false, message: 'error from valid admin' });
  }
};

export { validAdmin };
