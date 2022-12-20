import bcrypt from 'bcrypt';

const verifyPass = async (password, hash) => {
  const data = await bcrypt.compare(password, hash);
  return data;
};

export { verifyPass };
