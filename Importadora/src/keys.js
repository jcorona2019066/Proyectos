//variables que hacen la conexion con nuestra base de datos y se modifican dependiendo de cada maquina por ejemplo:
//el user y el password
module.exports = {

    database: {
        connectionLimit: 100,
        host: 'localhost',
        user: 'root', //<---------- cambiar
        password: 'admin', //<---------- cambiar
        database: 'DBImportadoraPrueba'
    }

};