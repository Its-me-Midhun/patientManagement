const consultation = require('../../model/consultation');
const doctor = require('../../model/doctor');
const signup = require('../../model/signup');
const department = require('../../model/department');
const hospital = require('../../model/hospital');
const login = require('../../model/login');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const consultationCertificate = require('../../model/ConsultationCertificate');
const { initiateTask, startTask } = require('../../Cronjob/cronJob');

exports.addconsultation = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { date, time } = req.body;
    const doctordata = await doctor.findOne({ doctorName: req.body.doctor });
    const existingConsultation = await consultation.findOne({
      date,
      time,
      doctorId: doctordata._id,
    });
    console.log('existingConsultation', existingConsultation);
    if (existingConsultation) {
      return res.json({
        success: false,
        msg: 'Consultation already scheduled at the same date and time for this doctor.',
      });
    }
    console.log('doctordata', doctordata);
    const departmentdata = await department.findOne({
      departmentName: req.body.department,
    });
    const hospitaldata = await hospital.findOne({
      hospitalName: req.body.hospital,
    });
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    console.log('token', token);
    const decoded = jwt.decode(token);
    console.log('decoded', decoded);
    const decodedemail = decoded.email;
    const loginData = await login.findOne({ email: decodedemail });
    console.log('loginData', loginData);
    const data = await consultation.create({
      date: req.body.date,
      doctorId: doctordata._id,
      hospitalId: hospitaldata._id,
      departmentId: departmentdata._id,
      time: req.body.time,
      loginId: loginData._id,
      transactionHash: req.body.transactionHash,
      Status: 'pending',
    });
    console.log('data', data);
    res.json({
      success: true,
      msg: 'Consultation with doctor created successfully',
    });
    // await consultation.create(contactDetails);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getDepartmentHospitalDoctor = async (req, res) => {
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
    const dataDepartment = await department.find();
    const dataHospital = await hospital.find();
    const dataDoctor = await doctor.aggregate([
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
      data: { dataDepartment, dataHospital, dataDoctor },
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getConsultation = async (req, res) => {
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
    data1 = await consultation.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
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
      data1,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.getPatientsDataById = async (req, res) => {
  try {
    const { id } = req.params;
    

    const consultationById = await consultation.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
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

    console.log('idfdssdfsdf', id);
    const SignUp = await signup.findOne({
      loginId: consultationById[0].Login_details[0]._id,
    });

    console.log('id', {
      SignUp: SignUp,
      consultationById: consultationById,
    });
    res.json({
      success: true,
      data: {  SignUp, consultationById },
    });
  } catch (e) {
    res.json({
      success: false,
      msg: e.message,
    });
  }
};

exports.getConsultationwithLoginId = async (req, res) => {
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
    const data = await consultation.aggregate([
      {
        $match: { loginId: loginData._id },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'departmentId',
          foreignField: '_id',
          as: 'department_details',
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
          from: 'doctors',
          localField: 'doctorId',
          foreignField: '_id',
          as: 'doctor_details',
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
      data,
    });
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e,
    });
  }
};

exports.consultationCertificate = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const data = await consultationCertificate.create(req.body);
    res.json({
      success: true,
      msg: 'Certificate Generated Successfully',
    });
    const loginDataFromId = await login.findOne({ _id: req.body.patientRegId });

    generatePDF(req.body, loginDataFromId);
  } catch (e) {
    console.log('Error', e);
    return res.json({
      success: false,
      msg: e.message,
    });
  }
};

const changeConsultationStatus = initiateTask('*/5 * * * * *', async () => {
  try {
    const allConsultations = await consultation.find({
      Status: 'pending',
      date: { $lte: new Date() }, // Filter consultations where the date is less than or equal to the current date
    });
    console.log('allConsultations', allConsultations);
    const currentTime = new Date();

    for (const consultations of allConsultations) {
      const endTime = calculateEndTime(consultations.time);

      if (currentTime >= endTime) {
        await consultation.updateOne(
          { _id: consultations._id },
          { Status: 'completed' }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

function calculateEndTime(startTime) {
  const [hour, minute, meridiem] = startTime
    .match(/^(\d+).(\d+)(\w+)/)
    .slice(1);
  let hourValue = parseInt(hour, 10);
  const isPM = meridiem?.toLowerCase() === 'pm';

  if (isPM && hourValue !== 12) {
    hourValue += 12;
  } else if (!isPM && hourValue === 12) {
    hourValue = 0;
  }

  const endTime = new Date();
  endTime.setHours(hourValue + 1, minute || 0, 0);
  return endTime;
}

// task start
if (process.env.CRON && process.env.CRON === 'true') {
  startTask(changeConsultationStatus, 'changeConsultationStatus');
}

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
  drawText('Consultation Certificate ', rgb(0.2, 0.4, 0.6));
  drawText(`Certificate Number: ${data.certificateNumber}`, rgb(0.2, 0.4, 0.6));
  drawText(`Patient Name: ${data.patientName}`);
  drawText(`Patient UUID: ${data.patientUUID}`);
  drawText(`Patient Registration ID: ${data.patientRegId}`);
  drawText(`doctor Name: ${data.doctorName}`);
  drawText(`consultationTime : ${data.consultationTime}`);
  drawText(`departmentName: ${data.departmentName}`);
  drawText(`hospitalName: ${data.hospitalName}`);
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
