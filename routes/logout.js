/**
 * Created by starw on 6/17/2017.
 */

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('login', { title: 'Material Chat' });
});

module.exports = router;