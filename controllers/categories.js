const { request, response } = require('express');

const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {

  const { limit = 5, startAfter = 0 } = req.query;
  const query = { status: true };

  try {

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .skip(Number(startAfter))
        .limit(Number(limit))
        .populate('user', 'name')
    ]);

    res.json({
      total,
      categories
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const getCategory = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const category = await Category.findById(id).populate('user', 'name');

    res.json({
      ok: true,
      category
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const createCategory = async (req = request, res = response) => {

  const name = req.body.name.toUpperCase();

  try {

    // Revisar si éxiste una categoria igual
    let category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        ok: false,
        msg: `La categoría ${category.name} ya existe`
      });
    }

    // Generar la data a guardar
    const data = {
      name,
      user: req.user._id,
    }

    // Crear Category && Save Category
    category = new Category(data);
    await category.save();

    res.status(201).json({
      ok: true,
      category
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const updateCategory = async (req = request, res = response) => {

  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  try {

    const category = await Category.findByIdAndUpdate(id, data, { new: true });

    res.json({
      ok: true,
      category
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });

  }

}

const deleteCategory = async (req = request, res = response) => {

  const { id } = req.params;

  try {

    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json({
      ok: true,
      category
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
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}