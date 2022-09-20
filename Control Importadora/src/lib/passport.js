//funciones que ingresan a un nuevo usuario y donde verifican su dpi y contraseña para ingresar a la pagina
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');
const Handlebars = require("handlebars");

passport.use('local.signin', new LocalStrategy({
  usernameField: 'dpi',
  passwordField: 'password',
  passReqToCallback: true,
},  async (req, dpi, password, done) => {
  const rows =  await pool.query('SELECT * FROM usuario WHERE dpi = ?', [dpi]);
  
  if (rows.length > 0) {
    const usuarios = rows[0];
    const validPassword =  await helpers.matchPassword(password, usuarios.password)
    if (validPassword) {
      done(null, usuarios, req.flash('success', 'Bienvenido ' + usuarios.username));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'No existe el usuario'));
  }
}
  
));

passport.use('local.signup', new LocalStrategy({
  dpiField: 'dpi',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, dpi, password, done) => {

  const { username, correoUsuario, rol} = req.body;
  let newUsuario = {
    username,
    correoUsuario, 
    rol,
    dpi,
    password
  };
  newUsuario.password = await helpers.encryptPassword(password);
  const result = await pool.query('INSERT INTO usuario SET ? ', newUsuario);
  newUsuario.codigoUsuario = result.insertId;
  return done(null, newUsuario);
}));

passport.serializeUser((user,done) => {
  done(null, user.codigoUsuario);
});

passport.deserializeUser(async (codigoUsuario, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE codigoUsuario = ?', [codigoUsuario]);
  done(null, rows[0]);
});

//Asistente de la plantilla para realizar una verificacion en hbs
Handlebars.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
      return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  }
});





