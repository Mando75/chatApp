var express = require('express');
var router = express.Router();

var sess;
/* GET home page. */
router.get('/', (req, res, next) => {
  sess = req.session;
  if(sess.email) {
    res.render('index', {
      email: "johndoe@mail.com",
      name: "john doe"
    });
  } else {
    res.render('index');
  }

});

module.exports = router;
