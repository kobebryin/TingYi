var express = require('express');
var router = express.Router();

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + 'Meal1SickType=' + "?, "
        + 'Meal1A=' + "?, "
        + 'Meal1AC=' + "?, "
        + 'Meal1B=' + "?, "
        + 'Meal1BC=' + "?, "
        + 'Meal1C=' + "?, "
        + 'Meal1CC=' + "?, "
        + 'RecordTime=' + "?, "
        + 'ShowTime=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.meal1sicktype, req.body.meal1a, req.body.meal1ac, req.body.meal1b, req.body.meal1bc, req.body.meal1c, req.body.meal1cc, req.body.recordtime, req.body.showtime, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});
module.exports = router;