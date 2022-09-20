//redirije al inicio de la pagina
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;