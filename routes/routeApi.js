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

// --------  get Data from MySQL's table route ----------------------- 
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM route;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table route ----------------------- 
router.post('/', function (req, res, next) {
    connection.query("INSERT INTO route (RID, MID, MIP, MID2, MIP2, RouteNumber, Address, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.routenumber + "', "
        + "'" + req.body.address + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table route ----------------------- 
router.put('/', function (req, res, next) {
    connection.query('UPDATE route SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'RouteNumber=' + "'" + req.body.routenumber + "', "
        + 'Address=' + "'" + req.body.address + "', "
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

// --------  delete Data from MySQL's table route ----------------------- 
router.delete('/', function (req, res, next) {
    connection.query('DELETE FROM route WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;