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
        callback(new Error('ERROR: There was a problem with the server. Please try again'));
      } else if (res.rowCount) {
        callback(null, res.rows[0].array_to_json);
      } else {
        callback(new Error("ERROR: No reply from server. Please refresh and try again"))
      }
    })
  } else {
    callback(new Error("Error: Could not connect to server. Please refresh and try again"));
  }
}

module.exports = getStatuses;