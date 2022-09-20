//Conexion a la base de datos con funciones que muestran algun error si llega a fallar la conexion
const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('conexion terminada');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Base de datos tiene muchas conexiones');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('conexion de BaseDatos faido');
    }
  }

  if (connection) connection.release();
  console.log('Base de Datos conectada');

  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
