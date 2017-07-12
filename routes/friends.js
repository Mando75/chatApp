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
  const sendgrid_api_key = require('../modules/sendgridkey');
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('donotreply@chat-material.com');
  var toEmail = new helper.Email('mando0975@gmail.com');
  var subject = 'Sending with SendGrid is Fun';
  var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var sg = require('sendgrid')(sendgrid_api_key);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
});
module.exports = router;