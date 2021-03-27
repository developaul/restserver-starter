const { Router } = require('express');
const { check } = require('express-validator');

const { allowedCollections } = require('../helpers');
const { validateFields, validateFileToUpload } = require('../middlewares');
const { updateImageCloudinary } = require('../controllers/uploads');

const router = Router();

router.put(
  '/:collection/:id',
  [
    validateFileToUpload,
    check('id', 'No es un ID válido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
  ],
  updateImageCloudinary
);

module.exports = router;