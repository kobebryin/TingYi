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

// --------  get Data from MySQL's table meal ----------------------- 
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM meal;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table meal ----------------------- 
router.post('/', function (req, res, next) {
    connection.query("INSERT INTO meal (RID, MID, MIP, MID2, MIP2, MemberID, Date, MealType, Type, Meal01, Meal02, Meal03, Meal04, Meal05, Meal06, Meal07, Meal08, Meal09, Meal10, Meal11, Meal12, Meal13, Meal14, Meal15, Meal16, Meal17, Meal18, Meal19, Meal20, Meal21, Meal22, Meal23, Meal24, Meal25, Meal26, Meal27, Meal28, Meal29, Meal30, Meal31, Meal32, Meal33, Meal34, Meal35, Meal36, Meal37, Meal38, Meal39, Meal40, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.memberid + "', "
        + "'" + req.body.date + "', "
        + "'" + req.body.mealtype + "', "
        + "'" + req.body.type + "', "
        + "'" + req.body.meal01 + "', "
        + "'" + req.body.meal02 + "', "
        + "'" + req.body.meal03 + "', "
        + "'" + req.body.meal04 + "', "
        + "'" + req.body.meal05 + "', "
        + "'" + req.body.meal06 + "', "
        + "'" + req.body.meal07 + "', "
        + "'" + req.body.meal08 + "', "
        + "'" + req.body.meal09 + "', "
        + "'" + req.body.meal10 + "', "
        + "'" + req.body.meal11 + "', "
        + "'" + req.body.meal12 + "', "
        + "'" + req.body.meal13 + "', "
        + "'" + req.body.meal14 + "', "
        + "'" + req.body.meal15 + "', "
        + "'" + req.body.meal16 + "', "
        + "'" + req.body.meal17 + "', "
        + "'" + req.body.meal18 + "', "
        + "'" + req.body.meal19 + "', "
        + "'" + req.body.meal20 + "', "
        + "'" + req.body.meal21 + "', "
        + "'" + req.body.meal22 + "', "
        + "'" + req.body.meal23 + "', "
        + "'" + req.body.meal24 + "', "
        + "'" + req.body.meal25 + "', "
        + "'" + req.body.meal26 + "', "
        + "'" + req.body.meal27 + "', "
        + "'" + req.body.meal28 + "', "
        + "'" + req.body.meal29 + "', "
        + "'" + req.body.meal30 + "', "
        + "'" + req.body.meal31 + "', "
        + "'" + req.body.meal32 + "', "
        + "'" + req.body.meal33 + "', "
        + "'" + req.body.meal34 + "', "
        + "'" + req.body.meal35 + "', "
        + "'" + req.body.meal36 + "', "
        + "'" + req.body.meal37 + "', "
        + "'" + req.body.meal38 + "', "
        + "'" + req.body.meal39 + "', "
        + "'" + req.body.meal40 + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table meal ----------------------- 
router.put('/', function (req, res, next) {
    connection.query('UPDATE meal SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'MemberID=' + "'" + req.body.memberid + "', "
        + 'Date=' + "'" + req.body.date + "', "
        + 'MealType	=' + "'" + req.body.mealtype + "', "
        + 'Type=' + "'" + req.body.type + "', "
        + 'Meal01=' + "'" + req.body.meal01 + "', "
        + 'Meal02=' + "'" + req.body.meal02 + "', "
        + 'Meal03=' + "'" + req.body.meal03 + "', "
        + 'Meal04=' + "'" + req.body.meal04 + "', "
        + 'Meal05=' + "'" + req.body.meal05 + "', "
        + 'Meal06=' + "'" + req.body.meal06 + "', "
        + 'Meal07=' + "'" + req.body.meal07 + "', "
        + 'Meal08=' + "'" + req.body.meal08 + "', "
        + 'Meal09=' + "'" + req.body.meal09 + "', "
        + 'Meal10=' + "'" + req.body.meal10 + "', "
        + 'Meal11=' + "'" + req.body.meal11 + "', "
        + 'Meal12=' + "'" + req.body.meal12 + "', "
        + 'Meal13=' + "'" + req.body.meal13 + "', "
        + 'Meal14=' + "'" + req.body.meal14 + "', "
        + 'Meal15=' + "'" + req.body.meal15 + "', "
        + 'Meal16=' + "'" + req.body.meal16 + "', "
        + 'Meal17=' + "'" + req.body.meal17 + "', "
        + 'Meal18=' + "'" + req.body.meal18 + "', "
        + 'Meal19=' + "'" + req.body.meal19 + "', "
        + 'Meal20=' + "'" + req.body.meal20 + "', "
        + 'Meal21=' + "'" + req.body.meal21 + "', "
        + 'Meal22=' + "'" + req.body.meal22 + "', "
        + 'Meal23=' + "'" + req.body.meal23 + "', "
        + 'Meal24=' + "'" + req.body.meal24 + "', "
        + 'Meal25=' + "'" + req.body.meal25 + "', "
        + 'Meal26=' + "'" + req.body.meal26 + "', "
        + 'Meal27=' + "'" + req.body.meal27 + "', "
        + 'Meal28=' + "'" + req.body.meal28 + "', "
        + 'Meal29=' + "'" + req.body.meal29 + "', "
        + 'Meal30=' + "'" + req.body.meal30 + "', "
        + 'Meal31=' + "'" + req.body.meal31 + "', "
        + 'Meal32=' + "'" + req.body.meal32 + "', "
        + 'Meal33=' + "'" + req.body.meal33 + "', "
        + 'Meal34=' + "'" + req.body.meal34 + "', "
        + 'Meal35=' + "'" + req.body.meal35 + "', "
        + 'Meal36=' + "'" + req.body.meal36 + "', "
        + 'Meal37=' + "'" + req.body.meal37 + "', "
        + 'Meal38=' + "'" + req.body.meal38 + "', "
        + 'Meal39=' + "'" + req.body.meal39 + "', "
        + 'Meal40=' + "'" + req.body.meal40 + "', "
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

// --------  delete Data from MySQL's table meal ----------------------- 
router.delete('/', function (req, res, next) {
    connection.query('DELETE FROM meal WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;