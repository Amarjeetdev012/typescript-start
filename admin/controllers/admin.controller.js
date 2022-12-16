import { createAdmin } from '../models/admin.model';

const create = (req, res) => {
  createAdmin(req.body).then((data) => {
    res.status(201).send({
      status: true,
      message: 'admin created succesfully',
      data: data,
    });
  });
}; 
    

export { create };
