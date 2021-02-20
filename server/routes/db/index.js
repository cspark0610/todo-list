

const pg = require('pg');
const url = 'postgres://@localhost/todolist';
const pool = new pg.Client(url);

//aca esta la connexion
pool.connect()
module.exports = pool;