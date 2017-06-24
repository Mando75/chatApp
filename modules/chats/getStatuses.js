/**
 * Created by starw on 6/23/2017.
 */
/**
 * Created by starw on 6/23/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function getStatuses(callback) {
  if (pool) {
    pool.query(SQL`SELECT array_to_json(array_agg(row_to_json(t))) FROM ( SELECT * FROM statuses) t`, (err, res) => {
      if (err) {
        callback(err);
      } else if (res.rowCount) {
        console.log(res.rows[0]);
        callback(null, res.rows[0].array_to_json);
      } else {
        callback(new Error("ERROR: No results from db"))
      }
    })
  } else {
    callback(new Error("Error: Could not connect to db"));
  }
}

module.exports = getStatuses;