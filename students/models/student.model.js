import mongoose from 'mongoose';

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

const createStudent = (data) => {
  const student = new Student(data);
  return student.save();
};

const uniqueEmail = async function (email) {
  const data = await Student.find({ email });
  return data;
};

const uniqueUserName = async (userName) => {
  const data = await Student.find({ userName });
  return data;
};

const list = async () => {
  const data = await Student.find();
  return data;
};

const listTime = async () => {
  const data = await Student.find().select({ _id: 1, time: 1, name: 1 });
  return data;
};
const studentId = async (id) => {
  const data = await Student.findById(id);
  return data;
};

const updateTotal = async (id, time) => {
  const result = await Student.findByIdAndUpdate(
    { _id: id },
    { $push: { totalTime: time } },
    { new: true }
  ).select({ _Id: 1, totalTime: 1 });
  return result;
};

const checkPassword = async (password) => {
  const data = await Student.find({ password });
  return data;
};

export {
  createStudent,
  uniqueEmail,
  uniqueUserName,
  list,
  studentId,
  listTime,
  updateTotal,
  checkPassword,
};
