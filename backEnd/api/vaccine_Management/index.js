var express = require('express');
var router = express.Router();

const {
  addVaccination,
  getDiseaseHospitalVaccine,
  getVaccination,
  getPatientsVaccinationDataById,
  vaccinationCertificate,
  getVaccinationByLoginId,
} = require('./controller');

router.post('/', addVaccination);
router.get('/data', getDiseaseHospitalVaccine);
router.get('/', getVaccination);
router.get('/list/:id', getPatientsVaccinationDataById);
router.post('/certificate', vaccinationCertificate);
router.get('/logindata', getVaccinationByLoginId);

module.exports = router;
