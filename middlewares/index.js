const validateFields = require('./validate-fields');
const validateRoles = require('./validate-roles');
const validateJWT = require('./validate-jwt');
const validateFile = require('./validate-file');

module.exports = {
  ...validateFields,
  ...validateRoles,
  ...validateJWT,
  ...validateFile
}