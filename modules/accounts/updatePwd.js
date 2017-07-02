/**
 * Created by starw on 6/30/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');
let bcrypt = require('bcrypt-nodejs');

function updatePwd(user_id, pwd, callback) {
  if(pool) {
    console.log('connected');
    verifyPwd(user_id, pwd, (err) => {
      if(err) {
        callback(err);
      } else {
        let hash = hashPwd(pwd.newPwd, pwd.confirmPwd, callback);
        if(hash) {
          pool.query(SQL`UPDATE users SET password = ${ hash }, last_modified = current_timestamp WHERE user_id = ${ user_id }`, (err1, res)=> {
            if(err1) {
              callback(err1);
            } else if (res.rowCount) {
              callback(null, 'Success! Password updated successfully!');
            }
          })
        }
      }
    })
  } else {
    callback(new Error("ERROR: There was problem connecting to the server. Please refresh and try again"));
  }
}

function verifyPwd(user_id, pwd, callback) {
  pool.query(SQL`SELECT password FROM users WHERE user_id = ${ user_id }`, (err, res)=> {
    if(bcrypt.compareSync(pwd.oldPwd, res.rows[0].password)) {
      console.log('verified');
      callback(null)
    } else {
      callback(new Error("ERROR: Your old password is incorrect. Please try again"));
    }
  });
}

function hashPwd(pwd, confirmPwd, callback) {
  let bcrypt = require('bcrypt-nodejs');
  if(pwd === confirmPwd) {
    return bcrypt.hashSync(pwd);
  } else {
    callback(new Error("ERROR: Passwords don't match. Please try again"));
    return '';
  }
}

module.exports = updatePwd;