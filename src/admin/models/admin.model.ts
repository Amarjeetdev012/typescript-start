import mongoose from 'mongoose';
import { hash } from '../middleware/admin.middleware';

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);



const createAdmin = (data:string,password:string) => {
  const admin = new Admin({data,password});
  return admin.save();
};

const emailCheck = async function (email: string) {
  const data = await Admin.find({ email });
  return data;
};

const adminId = async (id: string) => {
  const data = await Admin.findById(id);
  return data;
};

export { createAdmin, emailCheck, adminId };
