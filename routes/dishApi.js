var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table dish ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query('SELECT * FROM dish;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table dish ----------------------- 
router.post('/', function (req, res, next) {
    req.dbConnection.query("INSERT INTO dish (RID, MID, MIP, MID2, MIP2, Name, MealType, Attrib01, Attrib02, Attrib03, Attrib04, Attrib05, Attrib06, Attrib07, Attrib08, Attrib09, Attrib10, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.name + "', "
        + "'" + req.body.mealtype + "', "
        + "'" + req.body.attrib01 + "', "
        + "'" + req.body.attrib02 + "', "
        + "'" + req.body.attrib03 + "', "
        + "'" + req.body.attrib04 + "', "
        + "'" + req.body.attrib05 + "', "
        + "'" + req.body.attrib06 + "', "
        + "'" + req.body.attrib07 + "', "
        + "'" + req.body.attrib08 + "', "
        + "'" + req.body.attrib09 + "', "
        + "'" + req.body.attrib10 + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table dish ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE dish SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'Name=' + "'" + req.body.name + "', "
        + 'MealType=' + "'" + req.body.mealtype + "', "
        + 'Attrib01=' + "'" + req.body.attrib01 + "', "
        + 'Attrib02=' + "'" + req.body.attrib02 + "', "
        + 'Attrib03=' + "'" + req.body.attrib03 + "', "
        + 'Attrib04=' + "'" + req.body.attrib04 + "', "
        + 'Attrib05=' + "'" + req.body.attrib05 + "', "
        + 'Attrib06=' + "'" + req.body.attrib06 + "', "
        + 'Attrib07=' + "'" + req.body.attrib07 + "', "
        + 'Attrib08=' + "'" + req.body.attrib08 + "', "
        + 'Attrib09=' + "'" + req.body.attrib09 + "', "
        + 'Attrib10=' + "'" + req.body.attrib10 + "', "
        + 'Flag=' + "'" + req.body.flag + "', "
        + 'CreateTime=' + "'" + req.body.createtime + "', "
        + 'RecordTime=' + "'" + req.body.recordtime + "', "
        + 'ShowTime=' + "'" + req.body.showtime + "' "
        + 'WHERE ID=' + "'" + req.body.id + "';"
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  delete Data from MySQL's table dish ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM dish WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;