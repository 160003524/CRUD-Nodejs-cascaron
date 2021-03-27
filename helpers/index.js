const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const subirchivor = require('./subir-archivo');

module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirchivor,
};
