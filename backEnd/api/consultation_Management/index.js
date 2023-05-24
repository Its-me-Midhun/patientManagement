var express = require('express');
var router = express.Router();

const {
  addconsultation,
  getDepartmentHospitalDoctor,
  getConsultation,
  getPatientsDataById,
  consultationCertificate,
  getConsultationwithLoginId,
} = require('./controller');

router.post('/', addconsultation);
router.get('/', getDepartmentHospitalDoctor);
router.get('/list', getConsultation);
router.get('/list/:id', getPatientsDataById);
router.post('/certificate', consultationCertificate);
router.get('/loginData', getConsultationwithLoginId);

module.exports = router;
