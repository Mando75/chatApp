var express = require('express');
var router = express.Router();

var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  if(sess.email) {
    res.render('index', { title: 'Material Chat',
      email: sess.email,
      name: "john doe"
    });
  } else {
    res.render('index', {
      title: "Material Chat"
    });
  }

});

module.exports = router;
