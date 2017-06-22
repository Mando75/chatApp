/**
 * Created by starw on 6/19/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function addUser(userInfo, callback) {
  // hashPwd handles verifying and hashing the password. If no errors, returns hashed password.
  let hpwd = hashPwd(userInfo.pwd, userInfo.confirmPwd, callback);

  // check that the pool has been initialized
  if(pool && hpwd) {
    // query the db
    pool.query(SQL`INSERT INTO users (username, email, password) VALUES (${userInfo.username}, ${userInfo.email}, ${hpwd})`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        let resText = {
          header: "Thanks!",
          subheader: "Your Account has been created successfully!",
          message: "Please login",
          link: "/login"
        };
        callback(null, resText);
      }
    });
  } else {
    let resText = {
      header: "Oops!",
      subheader: "There was a problem connecting to the server",
      message: "Please try again",
      link: "/account/createAccount"
    };
    callback(new Error("ERROR: Not connected to DB"), resText);
  }
}

function hashPwd(pwd, confirmPwd, callback) {
  let bcrypt = require('bcrypt-nodejs');
  if(pwd === confirmPwd) {
    return bcrypt.hashSync(pwd);
  } else {
    let resText = {
      header: "Oops!",
      subheader: "Your passwords didn't match!",
      message: "Please try again",
      link: "/account/createAccount"
    };
    callback(new Error("ERROR: Passwords don't match"), resText);
    return '';
  }
}

module.exports = addUser;