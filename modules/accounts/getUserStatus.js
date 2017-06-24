/**
 * Created by starw on 6/23/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function getUserStatus(user, callback) {
  if (pool) {
    pool.query(SQL`SELECT row_to_json(t) FROM ( SELECT statuses.status_id, statuses.status FROM users INNER JOIN statuses ON (users.status = statuses.status_id) WHERE user_id = ${ user } ) t`, (err, res) => {
      if (err) {
        callback(err);
      } else if (res.rowCount) {
        console.log(res.rows[0]);
        callback(null, res.rows[0].row_to_json);
      } else {
        callback(new Error("ERROR: No results from db"))
      }
    })
  } else {
    callback(new Error("Error: Could not connect to db"));
  }
}

module.exports = getUserStatus;