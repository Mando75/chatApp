/**
 * Created by starw on 6/23/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');


function updateStatus(user, status_id, callback) {
  if (pool) {
    pool.query(SQL`UPDATE users SET status = ${ status_id }, last_modified = current_timestamp WHERE user_id = ${ user } RETURNING json_build_object('status', status)`, (err, res) => {
      if (err) {
        callback(err);
      } else if (res.rowCount) {
        console.log(res.rows[0].json_build_object);
        callback(null, res.rows[0].json_build_object);
      } else {
        callback(new Error("ERROR: Could not update db"));
      }
    });
  } else {
    callback(new Error("Error: Could not connect to db"));
  }
}

module.exports = updateStatus;