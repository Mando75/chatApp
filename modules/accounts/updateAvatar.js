/**
 * Created by starw on 6/29/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function updateAvatar(user_id, newAv, callback) {
  if(pool) {
    pool.query(SQL`UPDATE users SET avatar = ${ newAv }, last_modified = current_timestamp WHERE user_id = ${ user_id } RETURNING avatar`, (err, res) => {
      if(err) {
        callback(new Error('ERROR: Could not update avatar. Please refresh and try again'));
      } else {
        callback(null, res.rows[0].avatar);
      }
    });
  } else {
    callback(new Error('Could not connect to database'));
  }
}


module.exports = updateAvatar;