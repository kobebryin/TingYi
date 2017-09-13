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

// --------  get Data from MySQL's table member ----------------------- 
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM member;', function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table member ----------------------- 
router.post('/', function (req, res, next) {
    connection.query("INSERT INTO member (RID, MID, MIP, MID2, MIP2, User, Password, Type, UpID, Meal1SickType, Meal1A, Meal1AC, Meal1B, Meal1BC, Meal1C, Meal1CC, Meal2SickType, Meal2A, Meal2AC, Meal2B, Meal2BC, Meal2C, Meal2CC, Meal3SickType, Meal3A, Meal3AC, Meal3B, Meal3BC, Meal3C, Meal3CC, SAttrib01, SAttrib02, SAttrib03, SAttrib04, SAttrib05, SAttrib06, SAttrib07, SAttrib08, SAttrib09, SAttrib10, SAttrib11, SAttrib12, SAttrib13, SAttrib14, SAttrib15, SAttrib16, SAttrib17, SAttrib18, SAttrib19, SAttrib20, Attrib01, Attrib02, Attrib03, Attrib04, Attrib05, Attrib06, Attrib07, Attrib08, Attrib09, Attrib10, Attrib11, Attrib12, Attrib13, Attrib14, Attrib15, Attrib16, Attrib17, Attrib18, Attrib19, Attrib20, Attrib21, Attrib22, Attrib23, Attrib24, Attrib25, Attrib26, Attrib27, Attrib28, Attrib29, Attrib30, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + "'" + req.body.rid + "', "
        + "'" + req.body.mid + "', "
        + "'" + req.body.mip + "', "
        + "'" + req.body.mid2 + "', "
        + "'" + req.body.mip2 + "', "
        + "'" + req.body.user + "', "
        + "'" + req.body.password + "', "
        + "'" + req.body.type + "', "
        + "'" + req.body.upid + "', "
        + "'" + req.body.meal1sicktype + "', "
        + "'" + req.body.meal1a + "', "
        + "'" + req.body.meal1ac + "', "
        + "'" + req.body.meal1b + "', "
        + "'" + req.body.meal1bc + "', "
        + "'" + req.body.meal1c + "', "
        + "'" + req.body.meal1cc + "', "
        + "'" + req.body.meal2sicktype + "', "
        + "'" + req.body.meal2a + "', "
        + "'" + req.body.meal2ac + "', "
        + "'" + req.body.meal2b + "', "
        + "'" + req.body.meal2bc + "', "
        + "'" + req.body.meal2c + "', "
        + "'" + req.body.meal2cc + "', "
        + "'" + req.body.meal3sicktype + "', "
        + "'" + req.body.meal3a + "', "
        + "'" + req.body.meal3ac + "', "
        + "'" + req.body.meal3b + "', "
        + "'" + req.body.meal3bc + "', "
        + "'" + req.body.meal3c + "', "
        + "'" + req.body.meal3cc + "', "
        + "'" + req.body.sattrib01 + "', "
        + "'" + req.body.sattrib02 + "', "
        + "'" + req.body.sattrib03 + "', "
        + "'" + req.body.sattrib04 + "', "
        + "'" + req.body.sattrib05 + "', "
        + "'" + req.body.sattrib06 + "', "
        + "'" + req.body.sattrib07 + "', "
        + "'" + req.body.sattrib08 + "', "
        + "'" + req.body.sattrib09 + "', "
        + "'" + req.body.sattrib10 + "', "
        + "'" + req.body.sattrib11 + "', "
        + "'" + req.body.sattrib12 + "', "
        + "'" + req.body.sattrib13 + "', "
        + "'" + req.body.sattrib14 + "', "
        + "'" + req.body.sattrib15 + "', "
        + "'" + req.body.sattrib16 + "', "
        + "'" + req.body.sattrib17 + "', "
        + "'" + req.body.sattrib18 + "', "
        + "'" + req.body.sattrib19 + "', "
        + "'" + req.body.sattrib20 + "', "
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
        + "'" + req.body.attrib11 + "', "
        + "'" + req.body.attrib12 + "', "
        + "'" + req.body.attrib13 + "', "
        + "'" + req.body.attrib14 + "', "
        + "'" + req.body.attrib15 + "', "
        + "'" + req.body.attrib16 + "', "
        + "'" + req.body.attrib17 + "', "
        + "'" + req.body.attrib18 + "', "
        + "'" + req.body.attrib19 + "', "
        + "'" + req.body.attrib20 + "', "
        + "'" + req.body.attrib21 + "', "
        + "'" + req.body.attrib22 + "', "
        + "'" + req.body.attrib23 + "', "
        + "'" + req.body.attrib24 + "', "
        + "'" + req.body.attrib25 + "', "
        + "'" + req.body.attrib26 + "', "
        + "'" + req.body.attrib27 + "', "
        + "'" + req.body.attrib28 + "', "
        + "'" + req.body.attrib29 + "', "
        + "'" + req.body.attrib30 + "', "      
        + "'" + req.body.flag + "', "
        + "'" + req.body.createtime + "', "
        + "'" + req.body.recordtime + "', "
        + "'" + req.body.showtime + "');", function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    connection.query('UPDATE member SET '
        + "RID=" + "'" + req.body.rid + "', "
        + 'MID=' + "'" + req.body.mid + "', "
        + 'MIP=' + "'" + req.body.mip + "', "
        + 'MID2=' + "'" + req.body.mid2 + "', "
        + 'MIP2=' + "'" + req.body.mip2 + "', "
        + 'User=' + "'" + req.body.user + "', "
        + 'Password=' + "'" + req.body.password + "', "
        + 'Type	=' + "'" + req.body.type + "', "
        + 'UpID=' + "'" + req.body.upid + "', "
        + 'Meal1SickType=' + "'" + req.body.meal1sicktype + "', "
        + 'Meal1A=' + "'" + req.body.meal1a + "', "
        + 'Meal1AC=' + "'" + req.body.meal1ac + "', "
        + 'Meal1B=' + "'" + req.body.meal1b + "', "
        + 'Meal1BC=' + "'" + req.body.meal1bc + "', "
        + 'Meal1C	=' + "'" + req.body.meal1c + "', "
        + 'Meal1CC=' + "'" + req.body.meal1cc + "', "
        + 'Meal2SickType=' + "'" + req.body.meal2sicktype + "', "
        + 'Meal2A=' + "'" + req.body.meal2a + "', "
        + 'Meal2AC=' + "'" + req.body.meal2ac + "', "
        + 'Meal2B=' + "'" + req.body.meal2b + "', "
        + 'Meal2BC=' + "'" + req.body.meal2bc + "', "
        + 'Meal2C	=' + "'" + req.body.meal2c + "', "
        + 'Meal2CC=' + "'" + req.body.meal2cc + "', "
        + 'Meal3SickType=' + "'" + req.body.meal3sicktype + "', "
        + 'Meal3A=' + "'" + req.body.meal3a + "', "
        + 'Meal3AC=' + "'" + req.body.meal3ac + "', "
        + 'Meal3B=' + "'" + req.body.meal3b + "', "
        + 'Meal3BC=' + "'" + req.body.meal3bc + "', "
        + 'Meal3C	=' + "'" + req.body.meal3c + "', "
        + 'Meal3CC=' + "'" + req.body.meal3cc + "', "
        + 'SAttrib01=' + "'" + req.body.sattrib01 + "', "
        + 'SAttrib02=' + "'" + req.body.sattrib02 + "', "
        + 'SAttrib03=' + "'" + req.body.sattrib03 + "', "
        + 'SAttrib04=' + "'" + req.body.sattrib04 + "', "
        + 'SAttrib05=' + "'" + req.body.sattrib05 + "', "
        + 'SAttrib06=' + "'" + req.body.sattrib06 + "', "
        + 'SAttrib07=' + "'" + req.body.sattrib07 + "', "
        + 'SAttrib08=' + "'" + req.body.sattrib08 + "', "
        + 'SAttrib09=' + "'" + req.body.sattrib09 + "', "
        + 'SAttrib10=' + "'" + req.body.sattrib10 + "', "
        + 'SAttrib11=' + "'" + req.body.sattrib11 + "', "
        + 'SAttrib12=' + "'" + req.body.sattrib12 + "', "
        + 'SAttrib13=' + "'" + req.body.sattrib13 + "', "
        + 'SAttrib14=' + "'" + req.body.sattrib14 + "', "
        + 'SAttrib15=' + "'" + req.body.sattrib15 + "', "
        + 'SAttrib16=' + "'" + req.body.sattrib16 + "', "
        + 'SAttrib17=' + "'" + req.body.sattrib17 + "', "
        + 'SAttrib18=' + "'" + req.body.sattrib18 + "', "
        + 'SAttrib19=' + "'" + req.body.sattrib19 + "', "
        + 'SAttrib20=' + "'" + req.body.sattrib20 + "', "
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
        + 'Attrib11=' + "'" + req.body.attrib11 + "', "
        + 'Attrib12=' + "'" + req.body.attrib12 + "', "
        + 'Attrib13=' + "'" + req.body.attrib13 + "', "
        + 'Attrib14=' + "'" + req.body.attrib14 + "', "
        + 'Attrib15=' + "'" + req.body.attrib15 + "', "
        + 'Attrib16=' + "'" + req.body.attrib16 + "', "
        + 'Attrib17=' + "'" + req.body.attrib17 + "', "
        + 'Attrib18=' + "'" + req.body.attrib18 + "', "
        + 'Attrib19=' + "'" + req.body.attrib19 + "', "
        + 'Attrib20=' + "'" + req.body.attrib20 + "', "
        + 'Attrib21=' + "'" + req.body.attrib21 + "', "
        + 'Attrib22=' + "'" + req.body.attrib22 + "', "
        + 'Attrib23=' + "'" + req.body.attrib23 + "', "
        + 'Attrib24=' + "'" + req.body.attrib24 + "', "
        + 'Attrib25=' + "'" + req.body.attrib25 + "', "
        + 'Attrib26=' + "'" + req.body.attrib26 + "', "
        + 'Attrib27=' + "'" + req.body.attrib27 + "', "
        + 'Attrib28=' + "'" + req.body.attrib28 + "', "
        + 'Attrib29=' + "'" + req.body.attrib29 + "', "
        + 'Attrib30=' + "'" + req.body.attrib30 + "', "
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

// --------  delete Data from MySQL's table member ----------------------- 
router.delete('/', function (req, res, next) {
    connection.query('DELETE FROM member WHERE ID=' +  req.query.ID + ';', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;