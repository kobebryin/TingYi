var express = require('express');
var router = express.Router();

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + 'Meal2SickType=' + "?, "
        + 'Meal2A=' + "?, "
        + 'Meal2AC=' + "?, "
        + 'Meal2B=' + "?, "
        + 'Meal2BC=' + "?, "
        + 'Meal2C=' + "?, "
        + 'Meal2CC=' + "?, "
        + 'RecordTime=' + "?, "
        + 'ShowTime=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.meal2sicktype, req.body.meal2a, req.body.meal2ac, req.body.meal2b, req.body.meal2bc, req.body.meal2c, req.body.meal2cc, req.body.recordtime, req.body.showtime, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  delete Data from MySQL's table meal ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.MemberID + ' AND MealType=2;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;