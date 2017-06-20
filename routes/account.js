/**
 * Created by starw on 6/17/2017.
 */

let express = require('express');
let router = express.Router();
let sess;

/* GET home page. */
router.get('/login', function(req, res, next) {
  sess = req.session;
  res.render('account/login', { title: 'Material Chat' });
});

router.post('/login', function(req, res, next) {
  sess = req.session;
  sess.email = req.body.email;
  if(sess.email) {
    res.redirect("/");
  } else {
    res.render('account/login', {title: 'Material Chat' ,
    message: "Error: Could log in. Please try again."})
  }
  res.end();
});

router.get('/createAccount', function (req, res, next) {
  res.render('account/createAccount', {title: 'Material Chat'});
  res.end();
});

router.post('/createAccount', function(req, res, next) {
  let userInfo = {
    "username" : req.sanitizeBody('username').escape(),
    "email" : req.sanitizeBody('email').escape(),
    "pwd" : req.sanitizeBody('password').escape(),
    "confirmPwd" : req.sanitizeBody('confirmPwd').escape()
  };
  let addUser = require('../modules/accounts/addUser');
  addUser(userInfo, function (err, data) {
    if(err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  // if()
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('account/login', { title: 'Material Chat' });
});

module.exports = router;
