const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede realizar esta acción`
    });
  }

  next();
}

const hasRole = (...roles) => (req = request, res = response, next) => {

  if (!req.user) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero'
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(401).json({
      msg: `El servicio equire uno de estos roles ${roles}`
    });
  }

  next();

}

module.exports = {
  isAdminRole,
  hasRole
}