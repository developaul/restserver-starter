const {
  Category,
  Product,
  Role,
  User,
} = require('../models');

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

const categoryExistsById = async id => {

  const categoryExists = await Category.findById(id);

  if (!categoryExists) {
    throw new Error(`El id no existe ${id}`);
  }

}

const productExistsById = async id => {

  const productExists = await Product.findById(id);

  if (!productExists) {
    throw new Error(`El id no existe ${id}`);
  }

}

module.exports = {
  userExistsById,
  isValidRole,
  emailExists,
  categoryExistsById,
  productExistsById
}