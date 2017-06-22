/**
 * Created by starw on 6/21/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
let bcrypt = require('bcrypt-nodejs');

function accountLogin(userInfo, callback) {
  if(pool) {
    pool.query(SQL`SELECT row_to_json(users) FROM users WHERE username = ${ userInfo.username }`, (err, res) => {
      if(err) {
        callback(new Error("ERROR: Problem with executing database query"));
      } else if(res.rowCount) {
        let account = res.rows[0].row_to_json;
        if(bcrypt.compareSync(userInfo.pwd, account.password)) {
          callback(null, account);
        } else {
          callback(new Error("ERROR: Problem with executing database query"));
        }
      } else {
        callback(new Error("ERROR: Problem with executing database query"));
      }
    })
  } else {
    callback(new Error("ERROR: Could not connect to database"));
  }
}

module.exports = accountLogin;