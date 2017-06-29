/**
 * Created by starw on 6/22/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function getFriends(user_id, callback) {
  if(pool) {
    pool.query(SQL`SELECT array_to_json(array_agg(row_to_json(t))) FROM (SELECT users.user_id, friends.rel_id, users.username, users.avatar, users.last_login, users.status, statuses.status FROM friends INNER JOIN users ON friends.friend_id = users.user_id INNER JOIN statuses ON users.status = statuses.status_id WHERE friends.user_id = ${ user_id }) t`, (err, res) => {
      if(err) {
        callback(err);
      } else if(res.rowCount) {
        console.log(res.rows[0].array_to_json);
        callback(null, res.rows[0].array_to_json);
      } else {
          callback(new Error("ERROR: No records returned from DB"));
        }
    });
  } else {
    callback(new Error("ERROR: problem connecting to db"));
  }
}

module.exports = getFriends;

