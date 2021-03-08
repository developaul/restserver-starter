const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {

  const roleExists = await Role.findOne({ role });

  if (!roleExists) {
    throw new Error(`El rol ${role} no esta registrado en la BD`);
  }

}

const emailExists = async (email = '') => {

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }

}

const userExistsById = async id => {

  const userExists = await User.findById(id);

  if (!userExists) {
    throw new Error(`El id no existe ${id}`);
  }

}

module.exports = {
  userExistsById,
  isValidRole,
  emailExists
}