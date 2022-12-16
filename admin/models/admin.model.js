import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

const createAdmin = (data) => {
  const admin = new Admin(data);
  return admin.save();
};

const emailCheck = async function (email) {
  const data = await Admin.find({ email });
  return data;
};

const adminId = async (id) => {
  const data = await Admin.findById(id);
  return data;
};

export { createAdmin, emailCheck, adminId };
