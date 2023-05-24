const jwt = require('jsonwebtoken');
const users = require('../model/login');

module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl.startsWith('/auth')) return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;

    console.log('token', token);
    if (!token) {
      return res.json({
        success: false,
        msg: 'Unauthorized Access',
      });
    }

    const decoded = jwt?.verify(token, 'MIDHUNMOHAN');
    if (!decoded) {
      return res.json({
        success: false,
        msg: 'Invalid Token',
      });
    }
    if (decoded.exp < Date.now()) {
      return res.json({ success: false, msg: 'Token Expired' });
    }

    const isUserExists = await users.findById(decoded.id);
    if (!isUserExists) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email);
    if (matchvalidity != decoded.validity) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    req.user = decoded;
    return next();
  } catch (ex) {
    console.log(ex);
    return res.json({ success: false, msg: 'Invalid Token' });
  }
};
