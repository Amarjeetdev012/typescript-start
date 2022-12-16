import { createAdmin } from '../models/admin.model';
import config from '../../common/config/env.config';

const secret = config.ADMIN_SECRET;

const create = (req, res) => {
  try {
    let data = req.body;
    if (secret !== data.secretKey) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorised person' });
    }
    createAdmin(req.body).then((data) => {
      res.status(201).send({
        status: true,
        message: 'admin created succesfully',
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

export { create };
