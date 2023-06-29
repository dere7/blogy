import * as bcrypt from 'bcrypt';

export const hashPwd = async (password: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

export const comparePwd = bcrypt.compare;
