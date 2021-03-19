const { request, response } = require('express');

const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {

  const { limit = 5, startAfter = 0 } = req.query;
  const query = { status: true };

  try {

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .skip(Number(startAfter))
        .limit(Number(limit))
        .populate('user', 'name')
        .populate('category', 'name')
    ]);

    res.json({
      total,
      products
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const getProduct = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

    res.json({
      ok: true,
      product
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const createProduct = async (req = request, res = response) => {

  const name = req.body.name.toUpperCase();
  const { status, user, available, ...body } = req.body;

  try {

    let product = await Product.findOne({ name });

    // Revisar si éxiste un producto igual
    if (product) {
      return res.status(400).json({
        ok: false,
        msg: `El producto ${product.name} ya existe`
      });
    }

    // Generar la data a guardar
    const data = {
      ...body,
      name,
      user: req.user._id
    }

    // Crear Product && Save Product
    product = new Product(data);
    await product.save();

    res.status(201).json({
      ok: true,
      product
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const updateProduct = async (req = request, res = response) => {

  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  try {

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json({
      ok: true,
      product
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const deleteProduct = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
      ok: true,
      product
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
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}