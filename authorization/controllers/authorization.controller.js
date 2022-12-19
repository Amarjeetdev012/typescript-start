import jwt from 'jsonwebtoken';
import { emailCheck } from '../../admin/models/admin.model';
import { uniqueUserName } from '../../students/models/student.model';
import config from '../../common/config/env.config';


const { sign, verify } = jwt;
const jwtSecret = config.JWT.SECRET;

// admin login
const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const validAdmin = await emailCheck(email);
    if (!validAdmin.length) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorized person' });
    }
    const adminId = validAdmin[0]._id.toString();
    const token = sign({ _id: adminId }, jwtSecret);
    res.status(201).send({
      status: true,
      message: 'you are login succesfully',
      token: token,
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

// student login
const studentsLogin = async (req, res) => {
  try {
    let data = [];
    const userName = req.body.userName;
    const validStudent = await uniqueUserName(userName);
    if (!validStudent.length) {
      return res
        .status(401)
        .send({ status: false, message: 'you are not authorized student' });
    }
    const studentId = validStudent[0]._id.toString();
    const token = sign({ _id: studentId }, jwtSecret, { expiresIn: '24h' });
    validStudent.data = data;
    res.status(201).send({
      status: true,
      message: 'you are login succesfully',
      token,
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

export { adminLogin, studentsLogin };
