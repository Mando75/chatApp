/**
 * Created by starw on 6/29/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateUsername(user_id, new_username, callback) {
  if(pool){
    pool.query(SQL`UPDATE users SET username = ${ new_username }, last_modified = current_timestamp WHERE user_id = ${ user_id } RETURNING username`, (err, res) => {
      if(err) {
        if(err.code == 23505) {
          callback(new Error('ERROR: Username already exists. Please try another'));
        } else {
          callback(new Error('ERROR: Could not update username. Please refresh and try again'));
        }
      } else {
        callback(null, res.rows[0].username);
      }
    });
  } else {
    callback(new Error("ERROR: Could not connect to server. Please refresh and try again"));
  }
}

module.exports = updateUsername;