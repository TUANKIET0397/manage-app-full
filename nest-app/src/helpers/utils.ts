// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');
const saltRounds = 10; //độ mạnh

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePasswordHelper = async (
  plainPassword: string, //mật khẩu chưa được hash
  hashedPassword: string, //mật khẩu đã được hash
) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};
