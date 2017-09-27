var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('sessionID = ' + req.session.fuck);
  if(typeof req.session.fuck != 'undefined'){
    res.render('index', { title: 'TingYi Database Server' });
  }
  else{
    res.redirect('users/entry');
  }
});

router.get('/test', function (req, res, next) {
  res.render('test',
    {
      title: 'TingYi Database Server', 
      content: 'Hello World !'
    });
});

module.exports = router;
