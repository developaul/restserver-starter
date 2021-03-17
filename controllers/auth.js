const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignin = async (req = request, res = response) => {

  const { id_token } = req.body;

  try {

    const { email, name, img } = await googleVerify(id_token);

    // Verificar correo
    let user = await User.findOne({ email });

    if (!user) {
      // Crear usuario
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true
      }

      user = new User(data);
      await user.save();

    }

    // Si el usuario esta negado
    if (!user.status) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado'
      })
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });

  } catch (err) {

    res.status(400).json({
      ok: false,
      msg: 'Token de Google no es válido'
    });

  }

}

module.exports = {
  loginUser,
  googleSignin
}