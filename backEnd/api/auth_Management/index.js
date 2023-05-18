var express = require('express');
var router = express.Router();

const { signup, login, reset, addconsultation } = require('./controller');

router.post('/signUp', signup);
router.post('/login', login);
router.post('/changePassword', reset);

module.exports = router;
