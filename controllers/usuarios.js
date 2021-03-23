const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = ' no name', apikey = 0 } = req.query;
  const query = { estado: true };
  const { limite = 5, desde = 0 } = req.query;
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await Usuario.countDocuments(query);
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
    // total,
    // usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //encriptar contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //guardar info
  await usuario.save();
  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  //TODO validar contra bases de datos
  if (password) {
    //encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuarioDB);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch Api - controller',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  //const uid = req.uid;
  //fisicamente se borra
  // const usuario = await Usuario.findByIdAndDelete(id);
  //lo borra de la vista, pero no de la BD
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  //const usuarioAutenticado = req.usuario;
  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
