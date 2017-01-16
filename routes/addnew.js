var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/students/create', function(req, res, next) {
  res.render('create');
});

module.exports = router;
