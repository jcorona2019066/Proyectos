//Rutas y funciones de todo lo que tiene que ver con los usuarios ya registrados como: 
//ingresar nuevo,eliminar, listar,modificar

const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



router.get('/', isLoggedIn,async(req, res) => {
    id= req.user.codigoUsuario;
    const usuario = await pool.query('SELECT * FROM usuario WHERE codigoUsuario <> ?',[id]);
    res.render('usuarios/listUsua', { usuario });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuario WHERE codigoUsuario = ?', [id]);
    req.flash('success', 'usuario eliminado correctamente');
    res.redirect('/usuarios');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const usua= await pool.query('SELECT * FROM usuario WHERE codigoUsuario = ?', [id]);
    console.log(usua);
    res.render('usuarios/editUsua', {link: usua[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { dpi,username,correoUsuario,password,rol} = req.body;
    const newLink = {
        dpi, 
        username,
        correoUsuario,
        password,
        rol,
    };
    newLink.password = await helpers.encryptPassword(password);
    await pool.query('UPDATE usuario set ? WHERE codigoUsuario = ?', [newLink, id]);
    console.log(newLink);
    req.flash('success', 'usuario modificado correctamente');
    res.redirect('/usuarios');
});

module.exports = router;