const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  obtenerCategoria,
  borrarCategoria,
} = require('../controllers/categorias');
const { validarCampos, validarJWT, esAdminRole } = require('../middleswares');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 *{{url}}/api/categorias
 */

// Obtener todas las categorias - public
router.get('/', obtenerCategorias);

// Obtener una categorias por id - public
router.get(
  '/:id',
  [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear categorias - privado -cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearCategoria
);

// actualizar categorias - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// borrar una categoria - solo admi - cualquier persona con un token valido
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);
module.exports = router;
