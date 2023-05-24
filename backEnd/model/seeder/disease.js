const disease = require('../disease');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);

connect(
  'mongodb+srv://Midhun-Mohan:Midhun2000@cluster0.swnizvi.mongodb.net/hospital',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSeedData = async (req, res) => {
  try {
    const diseaseList = [
      { diseaseName: 'Kidney disease ' },
      { diseaseName: 'Stroke' },
      { diseaseName: 'Allergies' },
      { diseaseName: 'Heart disease' },
      { diseaseName: 'Migraine' },
      { diseaseName: 'Cancer' },
      { diseaseName: 'Depression' },
      { diseaseName: 'Tuberculosis' },
      { diseaseName: 'Thyroid disorder' },
      { diseaseName: 'Alzheimer' },
      { diseaseName: 'HIV/AIDS' },
    ];
    const existingDoc = await disease.find();
    if (existingDoc >= 0) {
      await disease.insertMany(diseaseList);
      console.log(`Data created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();
