const MedicalInfo = require('../../model/medicalDetails');
const login = require('../../model/login');
const jwt = require('jsonwebtoken');

const createMedicalInfo = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { blood, height, weight, gender, diseases } = req.body;

    // Check if the medical info already exists based on unique fields
    const existingInfo = await MedicalInfo.findOne({
      blood,
      height,
      weight,
      gender,
      diseaseName: diseases[0].diseaseName,
      startedDate: diseases[0].start_date,
      remarks: diseases[0].remarks,
    });

    if (existingInfo) {
      return res.json({ success: false, msg: 'Medical info already exists.' });
    }

    // Extract disease details from the first element in the diseases array
    const { diseaseName, start_date, remarks } = diseases[0];
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);

    // Create a new MedicalDetails document
    const medicalInfo = new MedicalInfo({
      blood,
      height,
      weight,
      gender,
      diseaseName,
      startedDate: start_date,
      remarks,
      loginId: loginData._id,
    });

    // Save the document to the database
    await medicalInfo.save();

    res.json({ success: true, msg: 'Medical info created successfully.' });
  } catch (error) {
    console.error('Error creating medical info:', error);
    res.json({ success: false, msg: 'An internal server error occurred.' });
  }
};

module.exports = {
  createMedicalInfo,
};
