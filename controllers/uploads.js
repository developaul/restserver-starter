// Configuración - para que sepa que cuenta estamos usando
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require('express');

const { User, Product } = require('../models');

const updateImageCloudinary = async (req = request, res = response) => {

  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':

      model = await User.findById(id);

      // Verificar si el usuario existe
      if (!model) {
        return res.status(400).json({
          ok: false,
          msg: `No éxiste un usuario con el id ${id}`
        });
      }
      // TODO: verificar si el usuario tiene el status en false

      break;
    case 'products':

      model = await Product.findById(id);

      // Verificar si el producto existe
      if (!model) {
        return res.status(400).json({
          ok: false,
          msg: `No éxiste un product con el id ${id}`
        });
      }
      // TODO: verificar si el producto tiene el status en false

      break;
    default:
      return res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador'
      })
  }

  try {
    // limpiar imagenes previas
    if (model.img) {
      // Borrar la imagen del servidor
      const nameArr = model.img.split('/');
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    // Save new Image
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;
    await model.save();

    res.json({
      ok: true,
      model
    });

  } catch (msg) {
    console.error(msg);

    res.status(400).json({
      ok: false,
      msg
    });
  }

}

module.exports = {
  updateImageCloudinary
}