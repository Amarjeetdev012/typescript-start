import jwt from 'jsonwebtoken';
import { emailCheck } from '../../admin/models/admin.model';
import config from '../../common/config/env.config';
const { sign } = jwt;
const jwtSecret = config.JWT.SECRET;

const login = async (req, res) => {
  try {
    let email = req.body.email;
    console.log(email);
    const validAdmin = await emailCheck(email);
    console.log(validAdmin);
    if (!validAdmin.length) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorized person' });
    }
    const token = sign(req.body, jwtSecret);
    const b = Buffer.from(hash);
    const refreshToken = b.toString('base64');
    res.status(201).send({ accessToken: token, refreshToken: refreshToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

export { login };
