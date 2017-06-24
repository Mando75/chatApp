/**
 * Created by starw on 6/23/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function getAccountInfo(userId, callback) {
  // if(pool) {
  //   pool.query(SQL`SELECT`)
  // } else {
  //   callback(new Error("Error: Could not connect to db"));
  // }
}

module.exports = getAccountInfo;