var express = require('express');
var router = express.Router();

const {
  signup,
  login,
  reset,
  addconsultation,
  getPatientProfile,
  GetProfile,
} = require('./controller');

router.post('/signUp', signup);
router.post('/login', login);
router.post('/changePassword', reset);
router.get('/profile', getPatientProfile);
router.post('/GetProfile', GetProfile);

module.exports = router;
