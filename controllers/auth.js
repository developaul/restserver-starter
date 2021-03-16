const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const loginUser = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'Correo / Contraseña no son correctos - email'
      });
    }

    // Verificar si el usuario esta activo
    if (!user.status) {
      return res.status(400).json({
        msg: 'Correo / Contraseña no son correctos - estado: false'
      });
    }

    // Verificar el password
    const isValidPassword = bcryptjs.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'Correo / Contraseña no son correctos - password'
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

module.exports = {
  loginUser
}