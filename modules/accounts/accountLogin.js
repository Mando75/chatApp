/**
 * Created by starw on 6/21/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
let bcrypt = require('bcrypt-nodejs');

function accountLogin(userInfo, callback) {
  if(pool) {
    pool.query(SQL`UPDATE users SET last_login = current_timestamp WHERE username = ${ userInfo.username } 
                  RETURNING json_build_object('user_id', user_id, 'username', username, 'email', email, 
                                               'password', password, 'avatar', avatar, 'status', status, 
                                               'last_login', last_login);`, (err, res) => {
      if(err) {
        callback(new Error("ERROR: Problem with executing database query"));
      } else if(res.rowCount) {
        // console.log(res.rows.);
        let account = res.rows[0].json_build_object;
        if(bcrypt.compareSync(userInfo.pwd, account.password)) {
          delete account.password;
          callback(null, account);
        } else {
          callback(new Error("ERROR: Problem with executing database query"));
        }
      } else {
        console.log(res);
        callback(new Error("ERROR: Problem with executing database query"));
      }
    })
  } else {
    callback(new Error("ERROR: Could not connect to database"));
  }
}

module.exports = accountLogin;