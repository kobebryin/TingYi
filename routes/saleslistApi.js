var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table member ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query('SELECT ID, Attrib01 FROM member WHERE Type=0 OR Type=3;', function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is: ', results);
        res.json(results);
    });
});

module.exports = router;