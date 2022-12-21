import { createAdmin, emailCheck } from '../models/admin.model';
import config from '../../common/config/env.config';
import { hash } from '../middleware/admin.middleware';
import { validPassword } from '../../common/validator/common.validation';

const secret = config.ADMIN_SECRET;

const create = async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;
    if (secret !== secretKey) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorised person' });
    }
    const checkMail = await emailCheck(email);
    if (checkMail.length > 0) {
      return res.status(400).send({
        status: false,
        message: 'this email is already used please use different email',
      });
    }
    const validPass = validPassword(password);
    if (!validPass) {
      return res
        .status(400)
        .send({ status: false, message: 'please use a strong password' });
    }

    const hashPassword = hash(password);
    const data = {};
    data.email = email;
    data.password = hashPassword;

    createAdmin(data).then((data) => {
      res.status(201).send({
        status: true,
        message: 'admin created succesfully',
        email,
      });
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

export { create };
