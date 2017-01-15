var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/menu', function(req, res, next) {
  res.render('menu');
});

module.exports = router;
