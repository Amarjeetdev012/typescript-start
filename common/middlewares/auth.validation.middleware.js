import config from '../config/env.config';
import jwt from 'jsonwebtoken';
import { adminId } from '../../admin/models/admin.model';

const secret = config.JWT.SECRET;

const validAdmin = async (req, res, next) => {
  try {
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
      return res
        .status(401)
        .send({ status: false, message: 'invalid validation method' });
    }
    req.jwt = jwt.verify(authorization[1], secret);
    const checkId = await adminId(req.jwt._id);
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
