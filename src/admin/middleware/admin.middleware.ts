import bcrypt from 'bcrypt';

const hash = (password: string | Buffer) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};

export { hash };
