const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Vaccination = require('../../model/vaccination');
const VaccineData = require('../../model/vaccine');
const diseaseData = require('../../model/disease');
const hospital = require('../../model/hospital');
const login = require('../../model/login');
const signup = require('../../model/signup');
const VaccinationCertificate = require('../../model/VaccinationCertificate');
const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

exports.addVaccination = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const vaccineDataDatabase = {
      vaccineId: req.body.vaccineName,
      hospitalId: req.body.hospital,
      loginId: loginData._id,
      diseaseId: req.body.disease,
      transactionHash: req.body.transactionHash,
      time: req.body.time,
      date: req.body.date,
    };
    const setVaccineData = await Vaccination.create(vaccineDataDatabase);
    console.log('setVaccineData', setVaccineData);
    res.json({
      success: true,
      msg: 'Vaccination booked successfully ',
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getDiseaseHospitalVaccine = async (req, res) => {
  try {
    const dataVaccine = await VaccineData.find();
    const dataDisease = await diseaseData.find();
    const dataHospital = await hospital.aggregate([
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: 'hospitalId',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: 'departmentId',
          as: 'department_details',
        },
      },
    ]);
    res.json({
      success: true,
      data: { dataVaccine, dataDisease, dataHospital },
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getVaccination = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const data = await Vaccination.aggregate([
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'diseases',
          localField: 'diseaseId',
          foreignField: '_id',
          as: 'disease_details',
        },
      },
      {
        $lookup: {
          from: 'logins',
          localField: 'loginId',
          foreignField: '_id',
          as: 'Login_details',
        },
      },
    ]);
    res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.getPatientsVaccinationDataById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id);

    const vaccinationById = await Vaccination.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'diseases',
          localField: 'diseaseId',
          foreignField: '_id',
          as: 'disease_details',
        },
      },
      {
        $lookup: {
          from: 'logins',
          localField: 'loginId',
          foreignField: '_id',
          as: 'Login_details',
        },
      },
    ]);
    console.log('vaccinationById', vaccinationById);

    const SignUp = await signup.findOne({
      loginId: vaccinationById[0].Login_details[0]._id,
    });

    console.log('id', {
      SignUp: SignUp,
      vaccinationById: vaccinationById,
    });
    res.json({
      success: true,
      data: { SignUp, vaccinationById },
    });
  } catch (e) {
    console.log('################error##################', e);
    res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.vaccinationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { patientRegId, vaccineName, vaccineTakenDatetime } = req.body;

    const existingCertificate = await VaccinationCertificate.findOne({
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
    });

    if (existingCertificate) {
      return res.json({
        success: false,
        msg: 'Certificate already generated for this patient and issuer',
      });
    }
    const data = await VaccinationCertificate.create(req.body);
    res.json({
      success: true,
      msg: 'Certificate Generated Successfully',
    });
    const loginDataFromId = await login.findOne({ _id: patientRegId });

    generatePDF(req.body, loginDataFromId);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

async function generatePDF(data, loginDataFromId) {
  // Load the background image
  const backgroundImage = await fs.promises.readFile(
    path.join(__dirname, '../../images/images.jpeg')
  );

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the background image
  const image = await pdfDoc.embedJpg(backgroundImage);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    opacity: 0.5, // Adjust the opacity of the background image
    rotate: degrees(0), // Adjust the rotation of the background image if needed
  });

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(12);

  // Set the content on the page
  const x = 50;
  let y = page.getHeight() - 50;

  const drawText = (text, color = rgb(0, 0, 0), spacing = 20) => {
    page.drawText(text, { x, y, color });
    y -= spacing;
  };
  drawText('Vaccination Certificate ', rgb(0.2, 0.4, 0.6));
  drawText(`Certificate Number: ${data.certificateNumber}`, rgb(0.2, 0.4, 0.6));
  drawText(`Patient Name: ${data.patientName}`);
  drawText(`Patient UUID: ${data.patientUUID}`);
  drawText(`Patient Registration ID: ${data.patientRegId}`);
  drawText(`Vaccine Name: ${data.vaccineName}`);
  drawText(`Vaccine Taken Datetime: ${data.vaccineTakenDatetime}`);
  drawText(`Disease: ${data.disease}`);
  drawText(`Antigen: ${data.antigen}`);
  drawText(`Issuer Name: ${data.issuerName}`, rgb(0.8, 0.2, 0.2));
  drawText(`Issuer ID: ${data.issuerId}`);
  drawText(`Issued Datetime: ${data.issuedDateTime}`);

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'midhun@spericorn.com',
      pass: 'Midhun@2000',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'midhun@spericorn.com',
    to: loginDataFromId.email,
    subject: 'Certificate',
    html: `
  <h1>Certificate of Consultation</h1>
  <p>Please find the certificate attached.</p>
  `,
    attachments: [
      {
        filename: 'output.pdf',
        content: pdfBytes,
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions);

  console.log('Email sent successfully.');
}

// Example usage

exports.getVaccinationByLoginId = async (req, res) => {
  try {
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const data = await Vaccination.aggregate([
      {
        $match: { loginId: loginData._id },
      },
      {
        $lookup: {
          from: 'vaccines',
          localField: 'vaccineId',
          foreignField: '_id',
          as: 'vaccine_details',
        },
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospitalId',
          foreignField: '_id',
          as: 'hospital_details',
        },
      },
      {
        $lookup: {
          from: 'diseases',
          localField: 'diseaseId',
          foreignField: '_id',
          as: 'disease_details',
        },
      },
      {
        $lookup: {
          from: 'logins',
          localField: 'loginId',
          foreignField: '_id',
          as: 'Login_details',
        },
      },
    ]);
    res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};
