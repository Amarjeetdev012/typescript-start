import mongoose from 'mongoose';
import { hash } from '../../admin/middleware/admin.middleware';

export interface IStudent {
  name: string,
  email: string,
  userName: string,
  password: string
}

const studentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    type: String,
    unique: true,
  },

  userName: {
    required: true,
    type: String,
    unique: true,
  },

  password: {
    required: true,
    type: String,
  },
});

const Student = mongoose.model('Students', studentSchema);

const createStudent = (name: string, email: string, userName: string, password1: string) => {
  const password = hash(password1);
  const student = new Student({ name, email, userName, password });
  return student.save();
};

const uniqueEmail = async function (email: string) {
  const data = await Student.find({ email });
  return data;
};

const uniqueUserName = async (userName: string) => {
  const data = await Student.find({ userName });
  return data;
};

const list = async () => {
  const data = await Student.find().select({ password: 0 });
  return data;
};

const listTime = async () => {
  const data = await Student.find().select({ _id: 1, time: 1, name: 1 });
  return data;
};
const studentId = async (id: string) => {
  const data = await Student.findById(id).select({ password: 0 });
  return data;
};


export {
  createStudent,
  uniqueEmail,
  uniqueUserName,
  list,
  studentId,
  listTime
};
