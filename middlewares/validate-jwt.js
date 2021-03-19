const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findById(uid);

    // Verificar si el usuario éxiste
    if (!user) {
      return res.status(401).json({
        msg: 'Token no válido - Usuario no éxistente DB'
      });
    }

    // Verificar si el uid tiene status en true
    if (!user.status) {
      return res.status(401).json({
        msg: 'Token no válido - Usuario con status: false'
      });
    }

    req.user = user;

    next();

  } catch (err) {

    res.status(401).json({
      msg: 'Token no válido'
    })

  }

}

module.exports = {
  validateJWT
}