var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table fieldvalue ----------------------- 
router.post('/', function (req, res, next) {
    req.dbConnection.query("SELECT Content FROM fieldvalue WHERE TableAttrib ='Member_Attrib14';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', JSON.parse(results[0].Content));
        res.json(JSON.parse(results[0].Content));
    });
});

// --------  insert Data from MySQL's table fieldvalue ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query("INSERT INTO fieldvalue (RID, MID, MIP, MID2, MIP2, TableAttrib, Content, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.tableattrib + "', "
        + "'" + req.body.content + "', "
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table fieldvalue ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE fieldvalue SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'TableAttrib=' + "'" + req.body.tableattrib + "', "
        + 'Content=' + "'" + req.body.content + "', "
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

// --------  delete Data from MySQL's table fieldvalue ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM fieldvalue WHERE ID=' + "'" + req.body.id + "';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;