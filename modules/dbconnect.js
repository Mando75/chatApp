/**
 * Created by starw on 6/19/2017.
 */
let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL || 'postgresql://postgres:rainbowponies@localhost:5432/chatapp';
const { Pool } = require('pg');

// console.log(connString);
const pool = new Pool({
  connectionString : connString
});

// const pool = {
//   user: 'postgres',
//   host: 'localhost',
//   database: 'chatapp',
//   password: 'M@nd0@de',
//   port: 5432,
// };

module.exports = pool;