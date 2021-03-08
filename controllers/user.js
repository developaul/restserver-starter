const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

  const { limit = 5, startAfter = 0 } = req.query;
  const query = { status: true };

  try {

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(startAfter))
        .limit(Number(limit))
    ]);

    res.json({
      total,
      users
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

};

const postUsers = async (req = request, res = response) => {

  const { name, email, password, role } = req.body;

  try {

    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'post API - controller',
      user
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

};

const putUsers = async (req = request, res = response) => {

  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }

  try {

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
      ok: true,
      user
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

};

const deleteUsers = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
}