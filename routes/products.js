/**
 * {{url}}/api/products
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, hasRole } = require('../middlewares');
const { productExistsById, categoryExistsById } = require('../helpers/db-validators');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.get('/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
  ],
  getProduct
);

router.use(validateJWT);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields
  ],
  createProduct
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
  ],
  deleteProduct
);

module.exports = router;