/**
 * Created by starw on 6/17/2017.
 */

let express = require('express');
let router = express.Router();
// let getAccountInfo = require('../modules/accounts/getAccountInfo');

let sess;
//
// router.get('/', (req, res, next) => {
//   sess = req.session;
//   if (sess.user) {
//     getAccountInfo(sess.user.user_id, (err, response) => {
//       res.json(response);
//       res.end();
//     });
//   } else {
//     res.redirect('/login');
//     res.end();
//   }
// });

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('account/login');
});

/**
 * Can be used to login to the website.
 * expects a username and password in the body.
 * Sends a JSON string of user information.
 */
router.post('/login', (req, res, next) => {
  let accountLogin = require('../modules/accounts/accountLogin');
  sess = req.session;
  let userInfo = {
      username: req.sanitizeBody('username').escape(),
      pwd: req.sanitizeBody('password').escape()
  };
  accountLogin(userInfo, (err, user) => {
      if(err) {
        console.log(err);
        res.render('account/login', {
          message: "Error: Could log in. Please try again."
        })
      } else {
        sess.user = user;
        res.json(sess.user);
        res.end();
      }
  });
});

/**
 * Get the createAccount page. Renders an html form
 */
router.get('/createAccount', (req, res, next) => {
  res.render('account/createAccount');
  res.end();
});


/**
 * Used to create accounts. Requires a username, email, password, and confirmPwd
 * in the request body.
 */
router.post('/createAccount', (req, res, next) => {
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
  addUser(userInfo, function (err, data) {
    if (err) {
      console.log(err);
      res.json(data);
      res.end();
    } else {
      res.json(data);
      res.end();
    }
  });
});


/**
 * Logs the user out of the application.
 * Renders the login page
 */
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.render('account/login');
});

router.put('/updateStatus', (req, res, next) => {
  sess = req.session;
  if (sess.user) {
    let newStatus = req.sanitizeBody('new_status').escape();
    let updateStatus = require('../modules/accounts/updateStatus');
    updateStatus(sess.user.user_id, newStatus, (err, response) => {
      if(err) {
        console.log(err);
      } else {
        console.log(response)
      }
    });
  } else {
    res.send("you are not logged in");
    res.end();
  }
});

router.get('/getStatus', (req, res, next) => {
  sess = req.session;
  if(sess.user) {
    let getUserStatus = require('../modules/accounts/getUserStatus');
    getUserStatus(sess.user.user_id, (err, response) => {
      res.json(response);
      res.end();
    })
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

module.exports = router;
