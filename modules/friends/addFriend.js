/**
 * Created by starw on 6/22/2017.
 */
const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function addFriend(relInfo, callback) {
  if(pool) {
    pool.query(SQL`INSERT INTO friends (user_id, friend_id, user_friend_key) VALUES (${ relInfo.user_id }, ${ relInfo.friend_id }, ${ '' + relInfo.user_id + relInfo.friend_id + '' })`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        let resText = {
          header: "Awesome!",
          subheader: "You've made a friend!",
          message: "Chat with them now!",
          link: "/chat"
        };
        callback(null, resText);
      }
    });
  } else {
    callback(new Error("ERROR: Could not connect to db"));
  }
}

module.exports = addFriend;