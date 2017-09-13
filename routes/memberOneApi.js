var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table member ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query('SELECT * FROM member WHERE ID = ' + req.query.ID + ';', function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});
module.exports = router;