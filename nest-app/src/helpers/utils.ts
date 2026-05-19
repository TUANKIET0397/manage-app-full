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
