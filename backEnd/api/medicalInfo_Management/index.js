var express = require('express');
var router = express.Router();

const { createMedicalInfo } = require('./controller');

router.post('/', createMedicalInfo);

module.exports = router;
