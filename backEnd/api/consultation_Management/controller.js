const consultation = require('../../model/consultation');
const doctor = require('../../model/doctor');
const department = require('../../model/department');
const hospital = require('../../model/hospital');
const login = require('../../model/login');
const jwt = require('jsonwebtoken');

exports.addconsultation = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { date, time } = req.body;
    const doctordata = await doctor.findOne({ doctorName: req.body.doctor });
    const existingConsultation = await consultation.findOne({
      date,
      time,
      doctorId: doctordata._id,
    });
    console.log('existingConsultation', existingConsultation);
    if (existingConsultation) {
      return res.json({
        success: false,
        msg: 'Consultation already scheduled at the same date and time for this doctor.',
      });
    }
    console.log('doctordata', doctordata);
    const departmentdata = await department.findOne({
      departmentName: req.body.department,
    });
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.hospital,
    });
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const data = await consultation.create({
      date: req.body.date,
      doctorId: doctordata._id,
      hospitalId: hospitaldata._id,
      departmentId: departmentdata._id,
      time: req.body.time,
      loginId: loginData._id,
      Status: 'Occupied',
    });
    console.log('data', data);
    res.json({
      success: true,
      msg: 'Consultation with doctor created successfully',
    });
    // await consultation.create(contactDetails);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getDepartmentHospitalDoctor = async (req, res) => {
  try {
    const dataDepartment = await department.find();
    const dataHospital = await hospital.find();
    const dataDoctor = await doctor.find();
    res.json({
      success: true,
      data: { dataDepartment, dataHospital, dataDoctor },
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
    });
  }
};
