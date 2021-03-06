const { Router } = require('express');
const { check } = require('express-validator');
// const { validarCampos } = require('../middleswares/validar-campos');
// const { validarJWT } = require('../middleswares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middleswares/validar-roles');
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require('../middleswares');
const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db-validators');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');

const router = Router();
router.get('/', usuariosGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({
      min: 6,
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.patch('/', usuariosPatch);

router.delete(
  '/:id',
  [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
