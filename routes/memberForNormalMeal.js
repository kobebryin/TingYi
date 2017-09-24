var express = require('express');
var router = express.Router();

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + 'Meal3SickType=' + "?, "
        + 'Meal3A=' + "?, "
        + 'Meal3AC=' + "?, "
        + 'Meal3B=' + "?, "
        + 'Meal3BC=' + "?, "
        + 'Meal3C=' + "?, "
        + 'Meal3CC=' + "?, "
        + 'RecordTime=' + "?, "
        + 'ShowTime=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.meal3sicktype, req.body.meal3a, req.body.meal3ac, req.body.meal3b, req.body.meal3bc, req.body.meal3c, req.body.meal3cc, req.body.recordtime, req.body.showtime, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  delete Data from MySQL's table meal ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.MemberID + ' AND MealType=3;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;