const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar si existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - correo',
      });
    }
    //verificar si esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - estado: false',
      });
    }
    //verificar contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - password',
      });
    }
    //generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'HABLE CON EL ADMINISTRADOR',
    });
  }
};

module.exports = { login };
