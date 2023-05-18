var express = require('express');
var router = express.Router();

const {
  addconsultation,
  getDepartmentHospitalDoctor,
} = require('./controller');

router.post('/', addconsultation);
router.get('/', getDepartmentHospitalDoctor);

module.exports = router;
