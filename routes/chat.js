/**
 * Created by starw on 6/23/2017.
 */
let express = require('express');
let router = express.Router();
let sess;

router.get('/getStatuses', (req, res) => {
  let getStatuses = require('../modules/chats/getStatuses');
  getStatuses((err, response) => {
    if (err) {
      console.log(err);
    } else {
      res.json(response);
      res.end();
    }
  })
});

router.get('/', (req, res) => {
  sess = req.session;
  if (sess.user) {
    let getStatuses = require('../modules/chats/getStatuses');
    getStatuses((err, response) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        sess.statuses = response;
        res.render('chat/chat', {
          user: sess.user,
          statuses: sess.statuses
        });
        res.end();
      }
    });
  } else {
    res.redirect('/account/login');
  }
});

module.exports = router;