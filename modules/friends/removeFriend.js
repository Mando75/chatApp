/**
 * Created by starw on 6/22/2017.
 */

const pool = require('../dbconnect');
const SQL = require('sql-template-strings');

function removeFriend(relId, callback) {
  if(pool) {
    pool.query(SQL`DELETE FROM friends WHERE rel_id = ${ relId }`, (err, res) => {
      if(err) {
        callback(err);
      } else {
        // console.log(res.rows[0]);
        let resText = {
          header: "Deleted",
          subheader: "You've removed your friend",
          message: "View your friend list",
          link: "/friends"
        };
        callback(null, resText);
      }
    });
  }
}

module.exports = removeFriend;