/**
 * Created by starw on 6/17/2017.
 */

let express = require('express');
let router = express.Router();

let sess;

/* GET login page. */
router.get('/login', function (req, res, next) {
  sess = req.session;
  res.render('account/login', {title: 'Material Chat'});
});

/**
 * Can be used to login to the website.
 */
router.post('/login', function (req, res, next) {
  sess = req.session;
  sess.email = req.body.email;
  if (sess.email) {
    res.redirect("/");
  } else {
    res.render('account/login', {
      title: 'Material Chat',
      message: "Error: Could log in. Please try again."
    })
  }
  res.end();
});

/**
 * Get the createAccount page. Renders an html form
 */
router.get('/createAccount', function (req, res, next) {
  res.render('account/createAccount', {title: 'Material Chat'});
  res.end();
});


/**
 * Used to create accounts. Requires a username, email, password, and confirmPwd
 * in the request body.
 */
router.post('/createAccount', function (req, res, next) {
  // require the addUser module
  let addUser = require('../modules/accounts/addUser');
  // gather the posted information
  let userInfo = {
    username: req.sanitizeBody('username').escape(),
    email: req.sanitizeBody('email').escape(),
    pwd: req.sanitizeBody('password').escape(),
    confirmPwd: req.sanitizeBody('confirmPwd').escape()
  };
  // call add user passing res and the userInfo object
  addUser(userInfo, createAcctRes);

  /**
   * Callback function to return an account creation method back to the user
   * @param err
   * @param data Should be a JSON object that contains a header, subheader, message, and link
   */
  function createAcctRes(err, data) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify(data));
      res.end();
    } else {
      res.send(JSON.stringify(data));
      res.end();
    }
  }
});

/**
 * Logs the user out of the application.
 * Renders the login page
 */
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('account/login', {title: 'Material Chat'});
});

module.exports = router;
