const login = require('../../model/login');
const signup = require('../../model/signup');
const issuedConsultation = require('../../model/ConsultationCertificate')
const issuedVaccination = require('../../model/VaccinationCertificate')
const jwt = require('jsonwebtoken');


exports.getPatientsIssuedConsultationDataById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('id', id);
      const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
      const issuedConsultationById = await issuedConsultation.aggregate([
        { $match: { patientRegId: loginData._id } },
      ]);
      console.log('issuedConsultationById', issuedConsultationById);
  
      
  
      console.log('id', {
        issuedConsultationById: issuedConsultationById,
      });
      res.json({
        success: true,
        data: issuedConsultationById ,
      });
    } catch (e) {
      console.log('################error##################', e);
      res.json({
        success: false,
        msg: e.message,
      });
    }
  };

  exports.getPatientsIssuedVaccinationDataById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('id', id);
      const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
      const issuedVaccinationById = await issuedVaccination.aggregate([
        { $match: { patientRegId: loginData._id } },
      ]);
      console.log('issuedVaccinationById', issuedVaccinationById);
  
      
  
      console.log('id', {
        issuedVaccinationById: issuedVaccinationById,
      });
      res.json({
        success: true,
        data: issuedVaccinationById ,
      });
    } catch (e) {
      console.log('################error##################', e);
      res.json({
        success: false,
        msg: e.message,
      });
    }
  };