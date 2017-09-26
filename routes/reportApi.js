var express = require('express');
var router = express.Router();

// -------- Search Data from MySQL's table route ----------------------- 
router.post('/', function (req, res, next) {
    var sqlquery = 'SELECT * FROM meal, member WHERE meal.MealType=' + req.body.searchType + ' AND meal.Type="' + req.body.searchTime + '" AND meal.Date="' + req.body.searchDate + '" AND meal.MemberID = member.ID';

    req.dbConnection.query(sqlquery, function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});
module.exports = router;