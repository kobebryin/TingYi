var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table member ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query('SELECT Type FROM member WHERE ID = ' + req.query.UserID + ";", function (error, results, fields) {
        var role = results[0].Type;
        var sql = '';

        if (role == 0)
            sql = 'SELECT * FROM member WHERE Flag = ' + 9 + ';';
        else
            sql = 'SELECT * FROM member WHERE Type = ' + 5 + " AND Flag = " + 9 + ";";
        // console.log(role)
        console.log(sql)
        req.dbConnection.query(sql, function (error, results, fields) {
            if (error) throw error;
            //console.log('The solution is: ', results);
            res.json(results);
        });
    });
});

// --------  get Data from MySQL's table member 2.0 ----------------------- 
router.get('/getmember2', function (req, res, next) {
    req.dbConnection.query("SELECT * FROM member WHERE Attrib01 LIKE '%" + decodeURIComponent(req.query.UserName) + "%';", function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  insert Data from MySQL's table member ----------------------- 
router.post('/', function (req, res, next) {
    // req.dbConnection.query("INSERT INTO member (RID, MID, MIP, MID2, MIP2, User, Password, Type, UpID, Meal1SickType, Meal1A, Meal1AC, Meal1B, Meal1BC, Meal1C, Meal1CC, Meal2SickType, Meal2A, Meal2AC, Meal2B, Meal2BC, Meal2C, Meal2CC, Meal3SickType, Meal3A, Meal3AC, Meal3B, Meal3BC, Meal3C, Meal3CC, SAttrib01, SAttrib02, SAttrib03, SAttrib04, SAttrib05, SAttrib06, SAttrib07, SAttrib08, SAttrib09, SAttrib10, SAttrib11, SAttrib12, SAttrib13, SAttrib14, SAttrib15, SAttrib16, SAttrib17, SAttrib18, SAttrib19, SAttrib20, Attrib01, Attrib02, Attrib03, Attrib04, Attrib05, Attrib06, Attrib07, Attrib08, Attrib09, Attrib10, Attrib11, Attrib12, Attrib13, Attrib14, Attrib15, Attrib16, Attrib17, Attrib18, Attrib19, Attrib20, Attrib21, Attrib22, Attrib23, Attrib24, Attrib25, Attrib26, Attrib27, Attrib28, Attrib29, Attrib30, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
    //     + "'" + req.body.rid + "', "
    //     + "'" + req.body.mid + "', "
    //     + "'" + req.body.mip + "', "
    //     + "'" + req.body.mid2 + "', "
    //     + "'" + req.body.mip2 + "', "
    //     + "'" + req.body.user + "', "
    //     + "'" + req.body.password + "', "
    //     + "'" + req.body.type + "', "
    //     + "'" + req.body.upid + "', "
    //     + "'" + req.body.meal1sicktype + "', "
    //     + "'" + req.body.meal1a + "', "
    //     + "'" + req.body.meal1ac + "', "
    //     + "'" + req.body.meal1b + "', "
    //     + "'" + req.body.meal1bc + "', "
    //     + "'" + req.body.meal1c + "', "
    //     + "'" + req.body.meal1cc + "', "
    //     + "'" + req.body.meal2sicktype + "', "
    //     + "'" + req.body.meal2a + "', "
    //     + "'" + req.body.meal2ac + "', "
    //     + "'" + req.body.meal2b + "', "
    //     + "'" + req.body.meal2bc + "', "
    //     + "'" + req.body.meal2c + "', "
    //     + "'" + req.body.meal2cc + "', "
    //     + "'" + req.body.meal3sicktype + "', "
    //     + "'" + req.body.meal3a + "', "
    //     + "'" + req.body.meal3ac + "', "
    //     + "'" + req.body.meal3b + "', "
    //     + "'" + req.body.meal3bc + "', "
    //     + "'" + req.body.meal3c + "', "
    //     + "'" + req.body.meal3cc + "', "
    //     + "'" + req.body.sattrib01 + "', "
    //     + "'" + req.body.sattrib02 + "', "
    //     + "'" + req.body.sattrib03 + "', "
    //     + "'" + req.body.sattrib04 + "', "
    //     + "'" + req.body.sattrib05 + "', "
    //     + "'" + req.body.sattrib06 + "', "
    //     + "'" + req.body.sattrib07 + "', "
    //     + "'" + req.body.sattrib08 + "', "
    //     + "'" + req.body.sattrib09 + "', "
    //     + "'" + req.body.sattrib10 + "', "
    //     + "'" + req.body.sattrib11 + "', "
    //     + "'" + req.body.sattrib12 + "', "
    //     + "'" + req.body.sattrib13 + "', "
    //     + "'" + req.body.sattrib14 + "', "
    //     + "'" + req.body.sattrib15 + "', "
    //     + "'" + req.body.sattrib16 + "', "
    //     + "'" + req.body.sattrib17 + "', "
    //     + "'" + req.body.sattrib18 + "', "
    //     + "'" + req.body.sattrib19 + "', "
    //     + "'" + req.body.sattrib20 + "', "
    //     + "'" + req.body.attrib01 + "', "
    //     + "'" + req.body.attrib02 + "', "
    //     + "'" + req.body.attrib03 + "', "
    //     + "'" + req.body.attrib04 + "', "
    //     + "'" + req.body.attrib05 + "', "
    //     + "'" + req.body.attrib06 + "', "
    //     + "'" + req.body.attrib07 + "', "
    //     + "'" + req.body.attrib08 + "', "
    //     + "'" + req.body.attrib09 + "', "
    //     + "'" + req.body.attrib10 + "', "
    //     + "'" + req.body.attrib11 + "', "
    //     + "'" + req.body.attrib12 + "', "
    //     + "'" + req.body.attrib13 + "', "
    //     + "'" + req.body.attrib14 + "', "
    //     + "'" + req.body.attrib15 + "', "
    //     + "'" + req.body.attrib16 + "', "
    //     + "'" + req.body.attrib17 + "', "
    //     + "'" + req.body.attrib18 + "', "
    //     + "'" + req.body.attrib19 + "', "
    //     + "'" + req.body.attrib20 + "', "
    //     + "'" + req.body.attrib21 + "', "
    //     + "'" + req.body.attrib22 + "', "
    //     + "'" + req.body.attrib23 + "', "
    //     + "'" + req.body.attrib24 + "', "
    //     + "'" + req.body.attrib25 + "', "
    //     + "'" + req.body.attrib26 + "', "
    //     + "'" + req.body.attrib27 + "', "
    //     + "'" + req.body.attrib28 + "', "
    //     + "'" + req.body.attrib29 + "', "
    //     + "'" + req.body.attrib30 + "', "      
    //     + "'" + req.body.flag + "', "
    //     + "'" + req.body.createtime + "', "
    //     + "'" + req.body.recordtime + "', "
    //     + "'" + req.body.showtime + "');", function (error, results, fields) {
    //         if (error) throw error;
    //         console.log('The solution is: ', results);
    //         res.json(results);
    //     });
    req.dbConnection.query("INSERT INTO member (RID, MID, MIP, MID2, MIP2, User, Password, Type, UpID, Meal1SickType, Meal1A, Meal1AC, Meal1B, Meal1BC, Meal1C, Meal1CC, Meal2SickType, Meal2A, Meal2AC, Meal2B, Meal2BC, Meal2C, Meal2CC, Meal3SickType, Meal3A, Meal3AC, Meal3B, Meal3BC, Meal3C, Meal3CC, SAttrib01, SAttrib02, SAttrib03, SAttrib04, SAttrib05, SAttrib06, SAttrib07, SAttrib08, SAttrib09, SAttrib10, SAttrib11, SAttrib12, SAttrib13, SAttrib14, SAttrib15, SAttrib16, SAttrib17, SAttrib18, SAttrib19, SAttrib20, Attrib01, Attrib02, Attrib03, Attrib04, Attrib05, Attrib06, Attrib07, Attrib08, Attrib09, Attrib10, Attrib11, Attrib12, Attrib13, Attrib14, Attrib15, Attrib16, Attrib17, Attrib18, Attrib19, Attrib20, Attrib21, Attrib22, Attrib23, Attrib24, Attrib25, Attrib26, Attrib27, Attrib28, Attrib29, Attrib30, Flag, CreateTime, RecordTime, ShowTime) VALUES ("
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ", "
        + '?' + ");", [req.body.rid, req.body.mid, req.body.mip, req.body.mid2, req.body.mip2, req.body.user, req.body.password, req.body.type, req.body.upid, req.body.meal1sicktype, req.body.meal1a, req.body.meal1ac, req.body.meal1b, req.body.meal1bc, req.body.meal1c, req.body.meal1cc, req.body.meal2sicktype, req.body.meal2a, req.body.meal2ac, req.body.meal2b, req.body.meal2bc, req.body.meal2c, req.body.meal2cc, req.body.meal3sicktype, req.body.meal3a, req.body.meal3ac, req.body.meal3b, req.body.meal3bc, req.body.meal3c, req.body.meal3cc, req.body.sattrib01, req.body.sattrib02, req.body.sattrib03, req.body.sattrib04, req.body.sattrib05, req.body.sattrib06, req.body.sattrib07, req.body.sattrib08, req.body.sattrib09, req.body.sattrib10, req.body.sattrib11, req.body.sattrib12, req.body.sattrib13, req.body.sattrib14, req.body.sattrib15, req.body.sattrib16, req.body.sattrib17, req.body.sattrib18, req.body.sattrib19, req.body.sattrib20, req.body.attrib01, req.body.attrib02, req.body.attrib03, req.body.attrib04, req.body.attrib05, req.body.attrib06, req.body.attrib07, req.body.attrib08, req.body.attrib09, req.body.attrib10, req.body.attrib11, req.body.attrib12, req.body.attrib13, req.body.attrib14, req.body.attrib15, req.body.attrib16, req.body.attrib17, req.body.attrib18, req.body.attrib19, req.body.attrib20, req.body.attrib21, req.body.attrib22, req.body.attrib23, req.body.attrib24, req.body.attrib25, req.body.attrib26, req.body.attrib27, req.body.attrib28, req.body.attrib29, req.body.attrib30, req.body.flag, req.body.createtime, req.body.recordtime, req.body.showtime], function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + "RID=" + "?, "
        + 'MID=' + "?, "
        + 'MIP=' + "?, "
        + 'MID2=' + "?, "
        + 'MIP2=' + "?, "
        + 'User=' + "?, "
        + 'Password=' + "?, "
        + 'Type	=' + "?, "
        + 'UpID=' + "?, "
        + 'SAttrib01=' + "?, "
        + 'SAttrib02=' + "?, "
        + 'SAttrib03=' + "?, "
        + 'SAttrib04=' + "?, "
        + 'SAttrib05=' + "?, "
        + 'SAttrib06=' + "?, "
        + 'SAttrib07=' + "?, "
        + 'SAttrib08=' + "?, "
        + 'SAttrib09=' + "?, "
        + 'SAttrib10=' + "?, "
        + 'SAttrib11=' + "?, "
        + 'SAttrib12=' + "?, "
        + 'SAttrib13=' + "?, "
        + 'SAttrib14=' + "?, "
        + 'SAttrib15=' + "?, "
        + 'SAttrib16=' + "?, "
        + 'SAttrib17=' + "?, "
        + 'SAttrib18=' + "?, "
        + 'SAttrib19=' + "?, "
        + 'SAttrib20=' + "?, "
        + 'Attrib01=' + "?, "
        + 'Attrib02=' + "?, "
        + 'Attrib03=' + "?, "
        + 'Attrib04=' + "?, "
        + 'Attrib05=' + "?, "
        + 'Attrib06=' + "?, "
        + 'Attrib07=' + "?, "
        + 'Attrib08=' + "?, "
        + 'Attrib09=' + "?, "
        + 'Attrib10=' + "?, "
        + 'Attrib11=' + "?, "
        + 'Attrib12=' + "?, "
        + 'Attrib13=' + "?, "
        + 'Attrib14=' + "?, "
        + 'Attrib15=' + "?, "
        + 'Attrib16=' + "?, "
        + 'Attrib17=' + "?, "
        + 'Attrib18=' + "?, "
        + 'Attrib19=' + "?, "
        + 'Attrib20=' + "?, "
        + 'Attrib21=' + "?, "
        + 'Attrib22=' + "?, "
        + 'Attrib23=' + "?, "
        + 'Attrib24=' + "?, "
        + 'Attrib25=' + "?, "
        + 'Attrib26=' + "?, "
        + 'Attrib27=' + "?, "
        + 'Attrib28=' + "?, "
        + 'Attrib29=' + "?, "
        + 'Attrib30=' + "?, "
        + 'Flag=' + "?, "
        + 'CreateTime=' + "?, "
        + 'RecordTime=' + "?, "
        + 'ShowTime=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.rid, req.body.mid, req.body.mip, req.body.mid2, req.body.mip2, req.body.user, req.body.password, req.body.type, req.body.upid, req.body.sattrib01, req.body.sattrib02, req.body.sattrib03, req.body.sattrib04, req.body.sattrib05, req.body.sattrib06, req.body.sattrib07, req.body.sattrib08, req.body.sattrib09, req.body.sattrib10, req.body.sattrib11, req.body.sattrib12, req.body.sattrib13, req.body.sattrib14, req.body.sattrib15, req.body.sattrib16, req.body.sattrib17, req.body.sattrib18, req.body.sattrib19, req.body.sattrib20, req.body.attrib01, req.body.attrib02, req.body.attrib03, req.body.attrib04, req.body.attrib05, req.body.attrib06, req.body.attrib07, req.body.attrib08, req.body.attrib09, req.body.attrib10, req.body.attrib11, req.body.attrib12, req.body.attrib13, req.body.attrib14, req.body.attrib15, req.body.attrib16, req.body.attrib17, req.body.attrib18, req.body.attrib19, req.body.attrib20, req.body.attrib21, req.body.attrib22, req.body.attrib23, req.body.attrib24, req.body.attrib25, req.body.attrib26, req.body.attrib27, req.body.attrib28, req.body.attrib29, req.body.attrib30, req.body.flag, req.body.createtime, req.body.recordtime, req.body.showtime, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  change password from MySQL's table member ----------------------- 
router.put('/changePS', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + 'Password=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.password, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  delete Data from MySQL's table member ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM member WHERE ID=' + req.query.ID + ';', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});


module.exports = router;