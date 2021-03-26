const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  obtenerProducto,
  borrarProducto,
} = require('../controllers/productos');
const { validarCampos, validarJWT, esAdminRole } = require('../middleswares');

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require('../helpers/db-validators');

const router = Router();

/**
 *{{url}}/api/categorias
 */

// Obtener todas las categorias - public
router.get('/', obtenerProductos);

// Obtener una categorias por id - public
router.get(
  '/:id',
  [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// Crear categorias - privado -cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// actualizar categorias - privado - cualquier persona con un token valido
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// borrar una categoria - solo admi - cualquier persona con un token valido
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);
module.exports = router;
