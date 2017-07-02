/**
 * Created by starw on 6/30/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateEmail(user_id, new_email, callback) {
  if(pool) {
    pool.query(SQL`UPDATE users SET email = ${ new_email }, last_modified = current_timestamp WHERE user_id = ${ user_id } RETURNING email`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        callback(null, res.rows[0].email);
      }
    });
  } else {
    callback(new Error("ERROR: There was a problem connecting to the server. Please try again"));
  }
}

module.exports = updateEmail;