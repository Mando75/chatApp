let express = require('express');
let router = express.Router();

let sess;
/* GET home page. */
router.get('/', (req, res, next) => {
  sess = req.session;
  console.log(JSON.stringify(sess.user));
  if(sess.user) {
    res.render('index', {
      user: sess.user
    });
  } else {

    res.render('index', {
      user : {
        username: 'larry'
      }
    });
  }

});

module.exports = router;
