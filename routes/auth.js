const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleswares/validar-campos');

const router = Router();
router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
