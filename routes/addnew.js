var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/students/addnew', function(req, res, next) {
  res.render('addnew');
});

module.exports = router;
