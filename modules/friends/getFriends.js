/**
 * Created by starw on 6/22/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function getFriends(user_id, callback) {
  if(pool) {
    pool.query(SQL`SELECT row_to_json(friends) FROM friends WHERE user_id = ${ user_id }`, (err, res) => {
      if(err) {
        callback(err);
      } else if(res.rowCount) {
        console.log(res.rows);
        callback(null, res.rows);
      } else {
          callback(new Error("ERROR: No records returned from DB"));
        }
    });
  } else {
    callback(new Error("ERROR: problem connecting to db"));
  }
}

module.exports = getFriends;

