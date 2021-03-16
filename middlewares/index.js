const validateFields = require('../middlewares/validate-fields');
const validateRoles = require('../middlewares/validate-roles');
const validateJWT = require('../middlewares/validate.jwt');

module.exports = {
  ...validateFields,
  ...validateRoles,
  ...validateJWT
}