const bcrypt = require("bcrypt");

const { hash, compare, genSalt } = bcrypt;

const generatePasswordHash = async (password) => {
  const salt = await genSalt();
  const hashPwd = await hash(password, salt);
  return password;
};

const verifyPassword = async (password, pwdHash) => {
  const data = await compare(password, pwdHash);
  console.log(data);
  return data;
};

export default { generatePasswordHash, verifyPassword }; // Use module.exports instead of module.export
