//Rutas y funciones con todo lo que tiene que ver los carros como:
// ingresar nuevo,eliminar, listar,modificar
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const Handlebars = require("handlebars");





router.get('/add', async(req, res) => {
     const estadoss = await pool.query(
        'select * from estados;',
     );
     res.render('links/add', { estadoss});
    //res.render('links/add');
});

router.post('/add', async (req, res) => {
    seleccion(esta)
    const { placa, marca, modelo,año } = req.body;
    
    const newLink = {
        placa,
        marca,
        modelo,
        año,
        
        codigoUsuario: req.user.codigoUsuario
    };
    await pool.query('INSERT INTO carros set ?', [newLink]);
    
    req.flash('Acción echa', 'Carro añadido');
    res.redirect('/links');
});


router.get('/', isLoggedIn,async (req, res) => {
    const links = await pool.query(
        'select E.nombreEstado, C.codigoCarro, C.placa, C.marca,C.modelo,C.año from estados E inner join carros C on E.codigoEstado = C.codigoEstado;',
     );
        res.render('links/list', { links});
    
});




router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM carros WHERE codigoCarro = ?', [id]);
    req.flash('success', 'carro eliminado correctamente');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const carross= await pool.query('SELECT * FROM carros WHERE codigoCarro = ?', [id]);
    console.log(carross);
    res.render('links/edit', {link: carross[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { placa, marca, modelo,año} = req.body;
    const newLink = {
        placa, 
        marca,
        modelo,
        año,
    };
    await pool.query('UPDATE carros set ? WHERE codigoCarro = ?', [newLink, id]);
    req.flash('success', 'carro modificado correctamente');
    res.redirect('/links');
});

//Asistente de la plantilla para realizar una verificacion
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

module.exports = router;