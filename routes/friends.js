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
        console.log(err.message);
        res.send(err.message);
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
      if(err) {
        console.log(err)
      } else {
        res.json(resText);
        res.end();
      }

    })
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

router.get('/invite', (req, res, next) => {
  sess = req.session;
  if(sess.user) {
    res.render('friends/invite', {
      user: sess.user
    });
  } else {
    res.render('account/login');
  }

});

router.post('/invite', (req, res, next) => {
  sess = req.session;
  if(sess.user) {
    let inviteFriend = require('../modules/friends/inviteFriend');
    let invite = {
      name: req.sanitizeBody('name').escape(),
      email: req.sanitizeBody('email').escape(),
      user: sess.user.username
    };
    console.log(invite);
    inviteFriend(invite, (err) => {
      if(err) {
        console.log(err);
        res.json({
          header: 'Whoops!',
          subheader: 'Something went wrong!',
          message: 'Please refresh and try again...'
        });
        res.end();
      } else {
        res.json({
          header: 'Success!',
          subheader: 'Invitation sent!',
          message: 'Your friend will receive an email shortly :)'
        });
        res.end();
      }
    });
  }

});
module.exports = router;