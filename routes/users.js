var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/entry', function (req, res, next) {
  res.render('entry', { title: 'TingYi Database Server' });
});

/* GET users listing. */
router.post('/login', function (req, res, next) {
  //res.send('respond with a resource');
  req.dbConnection.query('SELECT * FROM member WHERE User = ' + "'" + req.body.username + "' AND Type = 0" + ';', function (error, results, fields) {
    if (error) throw error;

    console.log('The solution is: ', results);  //log 出有沒有找到符合的Username
    
    if (results.length != 0) {  //判斷有沒有找到相符的Username
      if (req.body.password == results[0].Password) { //判斷有沒有找到相符的Password
        res.json({ status: 'success' });
      } else {
        res.json({ status: 'incorrect password' })  //密碼錯誤
      }
    } else {
      res.json({ status: 'incorrect username' })    //帳號錯誤
    }
    console.log(results);
  });
});

module.exports = router;
