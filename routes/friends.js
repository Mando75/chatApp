/**
 * Created by starw on 6/21/2017.
 */

let express = require('express');
let router = express.Router();

let sess;

router.post('/addFriend', (req, res, next) => {
  sess = req.session;
  if(sess.user) {
    let addFriend = require('../modules/friends/addFriend');
    let reqInfo = {
      user_id: sess.user.user_id,
      friend_id : req.sanitizeBody('friend_id').escape(),
    };

    addFriend(reqInfo, (err, resText) => {
      if(err) {
        console.log('poop');
      } else {
        console.log(res);
        res.json(resText);
        res.end();
      }
    });
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

router.post('/removeFriend', (req, res, next) => {
  sess = req.session;
  if (sess.user) {
    let removeFriend = require('../modules/friends/removeFriend');
    let reqInfo = req.sanitizeBody('rel_id').escape();
    removeFriend(reqInfo, (err, resText) => {
      if(err) {
        console.log(err);
      } else {
        res.json(resText);
        res.end();
      }
    });
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

router.get('/getFriends', (req, res, next) => {
  sess = req.session;
  if (sess.user) {
    let getFriends = require('../modules/friends/getFriends');
    getFriends(sess.user.user_id, (err, resText) => {
      res.json(resText);
    })
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

module.exports = router;