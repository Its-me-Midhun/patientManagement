var express = require('express');
var router = express.Router();

router.use('/auth', require('../api/auth_Management/index'));
router.use('/consultation', require('../api/consultation_Management/index'));

module.exports = router;
