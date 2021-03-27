const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      search: '/api/search',
      products: '/api/products',
      users: '/api/users',
      uploads: '/api/uploads'
    }

    // Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    // Directorio Publico
    this.app.use(express.static('public'));

    // Carga de archivos (Cualquier archivo)
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

}

module.exports = Server;