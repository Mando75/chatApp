/**
 * Created by starw on 6/17/2017.
 */

var express = require('express');
var router = express.Router();
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  res.render('login', { title: 'Material Chat' });
});

router.post('/', function(req, res, next) {
  sess = req.session;
  sess.email = req.body.email;
  if(sess.email) {
    res.redirect("/");
  } else {
    res.render('login', {title: 'Material Chat' ,
    message: "Error: Could log in. Please try again."})
  }
  res.end();
});

router.get('/createAccount', function (req, res, next) {
  res.send("Make an account!");
  res.end();
});

module.exports = router;
