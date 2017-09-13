var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table bbs ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query('SELECT * FROM bbs;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table bbs ----------------------- 
router.post('/', function (req, res, next) {
    req.dbConnection.query("INSERT INTO bbs (RID, MID, MIP, MID2, MIP2, Content, ReplyID, ReplyTime, ReadID, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.content + "', "
        + "'" + req.body.replayid + "', "
        + "'" + req.body.replaytime + "', "
        + "'" + req.body.readid + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table bbs ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE bbs SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'Content=' + "'" + req.body.content + "', "
        + 'ReplyID=' + "'" + req.body.replayid + "', "
        + 'ReplyTime=' + "'" + req.body.replaytime + "', "
        + 'ReadID=' + "'" + req.body.readid + "', "
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

// --------  delete Data from MySQL's table bbs ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM bbs WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;