const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
  validateJWT,
  hasRole
} = require('../middlewares');

const { userExistsById, isValidRole, emailExists } = require('../helpers/db-validators');

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
  ],
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
  ],
  putUsers
);

router.delete('/:id',
  [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
  ],
  deleteUsers
);

module.exports = router;