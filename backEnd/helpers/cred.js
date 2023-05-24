exports.successData = (res, data) => {
  return res.send({
    success: true,
    data,
  });
};

exports.successMessage = (res, message) => {
  return res.json({
    success: true,
    message,
  });
};

exports.errorMessage = (res, message, status = 400) => {
  console.log('\nERROR \n', message, '\n');
  return res.status(status).json({
    success: false,
    message,
  });
};
