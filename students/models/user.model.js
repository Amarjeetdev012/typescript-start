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

export { createStudent, uniqueEmail, uniqueUserName };
