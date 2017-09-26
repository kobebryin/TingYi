var express = require('express');
var router = express.Router();

// -------- Search Data from MySQL's table route ----------------------- 
router.post('/', function (req, res, next) {
    var sqlquery = 'SELECT * FROM member, meal WHERE meal.Type="' + req.body.searchTime + '" AND meal.Date="' + req.body.searchDate + '" AND member.ID=meal.MemberID ';

    req.dbConnection.query(sqlquery, function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});
module.exports = router;