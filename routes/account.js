/**
 * Created by starw on 6/17/2017.
 */

let express = require('express');
let router = express.Router();
// let getAccountInfo = require('../modules/accounts/getAccountInfo');

let sess;

router.get('/', (req, res, next) => {
  sess = req.session;
  if (sess.user) {
    let getStatuses = require('../modules/chats/getStatuses');
    getStatuses((err, response) => {
      if(err) {
        console.log(err);
        res.end();
      } else {
        sess.statuses = response;
        res.render('account/accountView', {
          user: sess.user,
          statuses: sess.statuses
        });
        res.end();
      }
    });
  } else {
    res.redirect('/account/login');
    res.end();
  }
});

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
        res.redirect('/');
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
  let updateUserStatus = require('../modules/accounts/updateStatus');
  updateUserStatus(sess.user.user_id, 5, (err, response) => {
    if(err) {
      console.log(err);
      res.end();
    } else {
      req.session.destroy();
      res.render('account/login');
    }
  });

});

router.post('/updateStatus', (req, res, next) => {
  sess = req.session;
  if (sess.user) {
    let newStatus = req.sanitizeBody('new_status').escape();
    let updateStatus = require('../modules/accounts/updateStatus');
    updateStatus(sess.user.user_id, newStatus, (err, response) => {
      if(err) {
        console.log(err);
        res.json(
            {
              status: sess.user.status,
              message: "ERROR: There was a problem updating the status. Please try again"
            }
        )
      } else {
        sess.user.status = response.status;
        console.log(response.status);
        res.json({
          status: sess.user.status,
          message: "Success! Updated status"
        });
        res.end();
      }
    });
  } else {
    res.json({
      status: null,
      message: "you are not logged in"
    });
    res.end();
  }
});

router.get('/getStatus', (req, res, next) => {
  sess = req.session;
  if(sess.user) {
    let getUserStatus = require('../modules/accounts/getUserStatus');
    getUserStatus(sess.user.user_id, (err, response) => {
      if(err) {
        console.log(err);
        res.end();
      } else {
        res.json(response);
        res.end();
      }
    })
  } else {
    res.send("You are not logged in");
    res.end();
  }
});

/**
 * A function to update the users avatar image link
 */
router.post('/upAvatar', (req, res, next)=> {
  sess = req.session;
  let newAv = req.body.new_avatar;
  console.log(newAv);
  if(sess.user) {
    let updateAvatar = require('../modules/accounts/updateAvatar');
    updateAvatar(sess.user.user_id, newAv, (err, response) => {
      if(err) {
        console.log(err);
        res.json({
          avatar : sess.user.avatar,
          message : err.message
        });
        res.end();
      } else {
        sess.user.avatar = response;
        // console.log(response);
        res.json({
          avatar : sess.user.avatar,
          message: 'Success! Avatar updated'
        });
        res.end();
      }
    });
  } else {
    res.json({
      avatar: null,
      message: 'You are not logged in'
    });
    res.end();
  }
});

router.post('/upUsername', (req, res, next)=> {
  sess = req.session;
  if(sess.user) {
  let new_username = req.sanitizeBody('new_username').escape();
  let updateUsername = require('../modules/accounts/updateUsername');
  updateUsername(sess.user.user_id, new_username, (err, response) => {
    if(err) {
      console.log(err);
      res.json({
        username: sess.user.username,
        message: err.message
      });
      res.end();
    } else {
      sess.user.username = response;
      res.json({
        username: sess.user.username,
        message: 'Success! Username updated'
      });
      res.end();
    }
  });
  } else {
    res.json({
      username: null,
      message: 'You are not logged in'
    });
    res.end()
  }
});

router.post('/upEmail', (req,res, next) => {
  sess = req.session;
  if(sess.user) {
    let new_email = req.sanitizeBody('new_email').escape();
    let updateEmail = require('../modules/accounts/updateEmail');
    updateEmail(sess.user.user_id, new_email, (err, response) => {
      if(err) {
        res.json({
          email: sess.user.email,
          message: err.message
        });
        res.end();
      } else {
        sess.user.email = response;
        res.json({
          email: sess.user.email,
          message: 'Success! Email updated'
        });
        res.end();
      }
    });

  } else {
    res.json({
      email: null,
      message: 'You are not logged in'
    });
    res.end();
  }
});


router.post('/upPwd', (req,res, next) => {
  sess = req.session;
  if(sess.user) {
    let pwd = {
      newPwd : req.sanitizeBody('new_pwd').escape(),
      confirmPwd : req.sanitizeBody('confirm_pwd').escape(),
      oldPwd : req.sanitizeBody('old_pwd').escape()
    };
    // console.log(pwd);
    let updatePassword = require('../modules/accounts/updatePwd');
    updatePassword(sess.user.user_id, pwd, (err, response) => {
      if(err) {
        console.log(err);
        res.json({
          message: err.message
        });
        res.end();
      } else {
        console.log(response);
        res.json({
          message: response
        });
        res.end();
      }
    });
  } else {
    res.send('you are not logged in');
    res.end();
  }
});
module.exports = router;
