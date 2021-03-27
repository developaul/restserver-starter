const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], directory = '') =>
  new Promise((resolve, reject) => {

    // Extrare file & Extraer extensión
    const { file } = files;
    const nameSplit = file.name.split('.');
    const extension = nameSplit[nameSplit.length - 1];

    // Validate extesion
    if (!validExtensions.includes(extension)) return reject(`La extensión ${extension} no es permitida, extensiones permitidas ${validExtensions}`);

    // Construir path donde se almacenara
    const nameTemp = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, '../uploads/', directory, nameTemp);

    // Mover el archivo a su path
    file.mv(uploadPath, err => {
      if (err) return reject(err);
      resolve(nameTemp);
    });
  });


module.exports = {
  uploadFile
}