/**
 * Created by starw on 6/23/2017.
 */
let express = require('express');
let router = express.Router();

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

module.exports = router;