var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/** -------------------------connect MySQL-----------------------START----- */
var connection = mysql.createConnection({
    host: 'tingyinas.myqnapcloud.com',
    user: 'kobebryin',
    password: 'ilove5205><',
    database: 'TingYi'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
/** -------------------------connect MySQL-----------------------END------ */

// --------  get Data from MySQL's table dishlist ----------------------- 
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM dishlist;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table dishlist ----------------------- 
router.post('/', function (req, res, next) {
    connection.query("INSERT INTO dishlist (RID, MID, MIP, MID2, MIP2, AID, SID, Date, MealType, Type, DishName, Amount, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.aid + "', "
        + "'" + req.body.sid + "', "
        + "'" + req.body.date + "', "
        + "'" + req.body.mealtype + "', "
        + "'" + req.body.type + "', "
        + "'" + req.body.dishname + "', "
        + "'" + req.body.amount + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table dishlist ----------------------- 
router.put('/', function (req, res, next) {
    connection.query('UPDATE dishlist SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'AID=' + "'" + req.body.aid + "', "
        + 'SID=' + "'" + req.body.sid + "', "
        + 'Date=' + "'" + req.body.date + "', "
        + 'MealType=' + "'" + req.body.mealtype + "', "
        + 'Type=' + "'" + req.body.type + "', "
        + 'DishName=' + "'" + req.body.dishname + "', "
        + 'Amount=' + "'" + req.body.amount + "', "
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

// --------  delete Data from MySQL's table dishlist ----------------------- 
router.delete('/', function (req, res, next) {
    connection.query('DELETE FROM dishlist WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;