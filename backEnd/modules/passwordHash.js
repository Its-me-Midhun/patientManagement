const User = require('../model/login');

exports.passwordHash = async (pass) => {
  const salt = await User.generateSalt();
  let password = await User.hashPassword(pass, salt);
  return { salt, password };
};
