import config from '../config/env.config';
import jwt from 'jsonwebtoken';

const secret = config.JWT.SECRET;

const validAdmin = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res
          .status(401)
          .send({ status: false, message: 'invalid validation method' });
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        if (!(req.jwt._id === '639b12006c6c2e2df2c98472')) {
          return res.status(401).send({
            status: false,
            message: 'you are not a authorised person',
          });
        }
        return next();
      }
    } catch (err) {
      return res
        .status(403)
        .send({ status: false, message: 'error from valid admin' });
    }
  } else {
    return res.status(401).send();
  }
};

export { validAdmin };
