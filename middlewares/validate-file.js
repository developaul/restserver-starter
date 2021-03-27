const { request, response } = require('express');

const validateFileToUpload = (req = request, res = response, next) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      ok: false,
      msg: 'No hay archivos que subir - validateFileToUpload'
    });
  }

  next();
}

module.exports = {
  validateFileToUpload
}