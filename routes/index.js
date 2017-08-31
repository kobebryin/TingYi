var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TingYi Database Server' });
});

router.get('/test', function (req, res, next) {
  res.render('test',
    {
      title: 'TingYi Database Server', 
      content: 'Hello World !'
    });
});

module.exports = router;
