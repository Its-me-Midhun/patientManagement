const login = require('../../model/login');
const signup = require('../../model/signup');
const { sendMail } = require('../../modules/nodemailer');
const { passwordHash } = require('../../modules/passwordHash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// SignUp
exports.signup = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const userCheck = await login.findOne({ email: req.body.email });
    if (!userCheck) {
      console.log('body', req.body);
      let { salt, password } = await passwordHash(req.body.password);
      const logindata = await login.create({
        email: req.body.email,
        password: password,
        salt: salt,
      });
      console.log('logindata', logindata);
      const data = await signup.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        aadharNo: req.body.aadharNo,
        dob: req.body.dob,
        pinCode: req.body.pinCode,
        country: req.body.country,
        state: req.body.state,
        loginId: logindata._id,
        role: 'Patient',
      });
      await sendMail(
        {
          user: req.body.name,
          username: req.body.email,
          password: req.body.password,
        },
        res
      );
      return res.json({
        success: true,
        message: 'Patient ID Created Succesfully',
        data,
      });
    } else {
      res.json({
        success: false,
        msg: 'Patient ID Already Exist',
      });
    }
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login.findOne({ email });
    // Signup.findOne({ loginId: loginId }
    const userdata = await signup.findOne({ loginId: user._id });
    console.log('userdata', userdata);
    if (!user)
      return res.json({
        success: false,
        message: 'Invalid email or password',
      });
    if (!(await login.verifyPassword(password, user.password, user.salt)))
      return res.json({
        success: false,
        message: 'Invalid password',
      });

    const accessToken = login.generateAuthTocken(user);
    const refreshToken = login.generateAuthTocken(user);
    console.log('access', user);
    // user.accessToken = accessToken;
    const newLogin = new login(user);
    await newLogin.save();
    await login.updateOne({ accessToken: accessToken });
    let role = userdata.role;
    return res.json({
      success: true,
      msg: 'Logined in succesfully',
      data: {
        accessToken,
        refreshToken,
        role,
      },
    });
  } catch (e) {
    console.log('Error ', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.reset = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);

    // Compare old password with the stored password
    const isPasswordMatch = await bcrypt.compare(
      req.body.oldPassword,
      loginData.password
    );

    if (isPasswordMatch) {
      const { salt, password } = await passwordHash(req.body.newPassword);

      await login.findOneAndUpdate(
        { email: decodedemail }, // Filter condition
        { $set: { password: password, salt: salt } }, // Fields to update
        { new: true } // Return the updated document
      );
      console.log('Password is a match!');
    } else {
      console.log('Password is incorrect.');
    }

    // Return the response
    res.json({ success: true, msg: 'Password Reset Successful' });
  } catch (err) {
    console.log('Error ', err);
    return res.json({
      success: false,
      msg: 'Cannot Reset Password',
      error: err.message,
    });
  }
};

