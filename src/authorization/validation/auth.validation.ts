import bcrypt from 'bcrypt';

const verifyPass = async (password: string | Buffer, hash: string) => {
  const data = await bcrypt.compare(password, hash);
  return data;
};

export { verifyPass };
