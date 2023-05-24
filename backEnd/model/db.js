const mongoose = require('mongoose');
const { connect, connection } = mongoose;

connect(process.env.DB_URL);

connection.on('connected', () =>
  console.log('Connection established successfully')
);
connection.on('error', (err) => console.log('Connection unauthorized ', err));

module.exports = connection;
