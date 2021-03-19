/**
 * {{url}}/api/categories
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, hasRole } = require('../middlewares');
const { categoryExistsById } = require('../helpers/db-validators');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

const router = Router();

router.get('/', getCategories);

router.get('/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
  ],
  getCategory
);

router.use(validateJWT);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCategory
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryExistsById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
  ],
  deleteCategory
);

module.exports = router;