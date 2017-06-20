/**
 * Created by starw on 6/19/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function addUser(userInfo, callback) {
  console.log(userInfo);
  console.log(pool);
  if(pool && userInfo.password === userInfo.confirmPwd) {
    pool.query(SQL`INSERT INTO users (username, email, password) VALUES (${userInfo.username}, ${userInfo.email}, ${userInfo.password})`, (err, res) => {
      if(err) {
        callback("ERROR: Could not insert into db");
      } else {
        callback(null, "we Did it!");
      }
    });
  } else {
    callback("ERROR: Not connected to DB");
  }
}

module.exports = addUser;