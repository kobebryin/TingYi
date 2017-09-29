var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/entry', function (req, res, next) {
  res.render('entry', { title: 'TingYi Database Server' });
});

/* GET users listing. */
router.post('/login', function (req, res, next) {
  //res.send('respond with a resource');
  req.dbConnection.query('SELECT * FROM member WHERE User = ' + "'" + req.body.username + "' AND Flag = " + 9 + ';', function (error, results, fields) {
    if (error) throw error;

    //console.log('The solution is: ', results);  //log 出有沒有找到符合的Username

    if (results.length != 0) {  //判斷有沒有找到相符的Username
      if(results[0].Type == 4 || results[0].Type == 5){ //判斷是否為客戶或醫院類型，不開放他們登入
        res.json({ status: 'incorrect username' })  
      }else{
        if (req.body.password == results[0].Password) { //判斷有沒有找到相符的Password
          //session store裡沒有的，就會重新設置
          req.session.fuck = results[0].ID; //存取登入者的ID
          req.session.loginType = results[0].Type;//存取登入者的類型
          req.session.UserName = results[0].Attrib01;//存取登入者的名字
          res.json({ status: 'success' });
        } else {
          res.json({ status: 'incorrect password' })  //密碼錯誤
        }
      }
    } else {
      res.json({ status: 'incorrect username' })    //帳號錯誤
    }
    //console.log(results);
  });
});

// 登出...
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('entry');
});

// 取出get session ID...
router.get('/getSessionID', function (req, res) {
  res.json({ id: req.session.fuck, loginType:　req.session.loginType });
});

module.exports = router;
