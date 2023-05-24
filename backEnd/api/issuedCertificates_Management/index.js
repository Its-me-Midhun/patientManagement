var express = require('express');
const { getPatientsIssuedConsultationDataById, getPatientsIssuedVaccinationDataById } = require('./controller');
var router = express.Router();




router.get('/consultationcertificate', getPatientsIssuedConsultationDataById);
router.get('/vaccinationcertificate', getPatientsIssuedVaccinationDataById);


module.exports = router;
