const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { loginUser } = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  loginUser
);




module.exports = router;