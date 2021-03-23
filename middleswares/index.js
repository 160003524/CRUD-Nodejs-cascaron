const validaCampos = require('../middleswares/validar-campos');
const validaJWT = require('../middleswares/validar-jwt');
const validaRoles = require('../middleswares/validar-roles');

module.exports = {
  ...validaCampos,
  ...validaJWT,
  ...validaRoles,
};
