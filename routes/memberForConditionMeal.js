var express = require('express');
var router = express.Router();

// --------  update Data from MySQL's table member ----------------------- 
router.put('/', function (req, res, next) {
    req.dbConnection.query('UPDATE member SET '
        + 'Meal2SickType=' + "?, "
        + 'Meal2A=' + "?, "
        + 'Meal2AC=' + "?, "
        + 'Meal2B=' + "?, "
        + 'Meal2BC=' + "?, "
        + 'Meal2C=' + "?, "
        + 'Meal2CC=' + "?, "
        + 'RecordTime=' + "?, "
        + 'ShowTime=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.meal2sicktype, req.body.meal2a, req.body.meal2ac, req.body.meal2b, req.body.meal2bc, req.body.meal2c, req.body.meal2cc, req.body.recordtime, req.body.showtime, req.body.id]
        , function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  delete Data from MySQL's table meal ----------------------- 
router.delete('/', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.MemberID + ' AND MealType=2;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});
// --------  delete sepcific date Data from MySQL's table meal ----------------------- 
router.delete('/deleteA', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.id + " AND Date='" + req.query.date + "' AND MealType=2 AND Type='A';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});
router.put('/deleteA', function (req, res, next) {
    req.dbConnection.query("UPDATE member SET "
        + 'Meal2AC=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.mea2ac, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

router.delete('/deleteB', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.id + " AND Date='" + req.query.date + "' AND MealType=2 AND Type='B';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});
router.put('/deleteB', function (req, res, next) {
    req.dbConnection.query("UPDATE member SET "
        + 'Meal2BC=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.mea2bc, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

router.delete('/deleteC', function (req, res, next) {
    req.dbConnection.query('DELETE FROM meal WHERE MemberID=' + req.query.id + " AND Date='" + req.query.date + "' AND MealType=2 AND Type='C';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});
router.put('/deleteC', function (req, res, next) {
    req.dbConnection.query("UPDATE member SET "
        + 'Meal2CC=' + "? "
        + 'WHERE ID=' + "?;",
        [req.body.mea2cc, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
});

// --------  UPDATE OVERWRITE Data from MySQL's table meal ----------------------- 
router.put('/updateoverwrite', function (req, res, next) {
    req.dbConnection.query('UPDATE meal SET '
    + 'Meal01=?, ' 
    + 'Meal02=?, ' 
    + 'Meal03=?, ' 
    + 'Meal04=?, ' 
    + 'Meal05=?, ' 
    + 'Meal06=?, ' 
    + 'Meal07=?, ' 
    + 'Meal08=?, ' 
    + 'Meal09=?, ' 
    + 'Meal10=?, ' 
    + 'Meal11=?, ' 
    + 'Meal12=?, ' 
    + 'Meal13=?, ' 
    + 'Meal14=?, ' 
    + 'Meal15=? ' 
    + 'WHERE MemberID = ? AND Date = ? AND MealType = ? AND Type = ?;',
    [req.body.meal01, req.body.meal02, req.body.meal03, req.body.meal04, req.body.meal05, req.body.meal06, req.body.meal07, req.body.meal08, req.body.meal09, req.body.meal10, req.body.meal11, req.body.meal12, req.body.meal13, req.body.meal14, req.body.meal15, req.body.memberid, req.body.date, 2, req.body.type]
    , function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
    });
});

// --------  UPDATE CANCLE Data from MySQL's table meal ----------------------- 
router.put('/dynamicUpdateCancle', function (req, res, next) {
    var sqlString = 'UPDATE meal SET ';
    var sqlArray = [];
   
    if (req.body.meal06 != ' ') {
        sqlString += 'Meal06=?, ';
        sqlArray.push(req.body.meal06);
    }
    
    if (req.body.meal07 != ' ') {
        sqlString += 'Meal07=?, ';
        sqlArray.push(req.body.meal07);
    }
    
    if (req.body.meal08 != ' ') {
        sqlString += 'Meal08=?, ';
        sqlArray.push(req.body.meal08);
    }
   
    sqlString += 'X';
    var FinalSqlString = sqlString.split(', X')[0];
    console.log(FinalSqlString);
     
    if (sqlArray.length > 0) {
        FinalSqlString += ' WHERE MemberID = ? AND Date = ? AND MealType = ? AND Type = ?;';
        console.log(FinalSqlString);
        sqlArray.push(req.body.memberid);
        sqlArray.push(req.body.date);
        sqlArray.push(2);
        sqlArray.push(req.body.type);
        req.dbConnection.query(FinalSqlString, sqlArray, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
    } else {
        res.send('未輸入任何修改資料!');
    }
});

// --------  UPDATE JOIN Data from MySQL's table meal ----------------------- 
router.put('/dynamicUpdate', function (req, res, next) {
    var sqlString = 'UPDATE meal SET ';
    var sqlArray = [];
    if (req.body.meal01 != ' ') {
        sqlString += 'Meal01=?, ';
        sqlArray.push(req.body.meal01);
    }
    if (req.body.meal02 != ' ') {
        sqlString += 'Meal02=?, ';
        sqlArray.push(req.body.meal02);
    }
    if (req.body.meal03 != ' ') {
        sqlString += 'Meal03=?, ';
        sqlArray.push(req.body.meal03);
    }
    if (req.body.meal04 != ' ') {
        sqlString += 'Meal04=?, ';
        sqlArray.push(req.body.meal04);
    }
    if (req.body.meal05 != ' ') {
        sqlString += 'Meal05=?, ';
        sqlArray.push(req.body.meal05);
    }
    if (req.body.meal06 != '') {
        sqlString += 'Meal06=?, ';
        sqlArray.push(req.body.meal06);
    }
    if (req.body.meal07 != '') {
        sqlString += 'Meal07=?, ';
        sqlArray.push(req.body.meal07);
    }
    if (req.body.meal08 != '') {
        sqlString += 'Meal08=?, ';
        sqlArray.push(req.body.meal08);
    }
    if (req.body.meal09 != ' ') {
        sqlString += 'Meal09=?, ';
        sqlArray.push(req.body.meal09);
    }
    if (req.body.meal10 != ' ') {
        sqlString += 'Meal10=?, ';
        sqlArray.push(req.body.meal10);
    }
    if (req.body.meal11 != ' ') {
        sqlString += 'Meal11=?, ';
        sqlArray.push(req.body.meal11);
    }
    if (req.body.meal12 != ' ') {
        sqlString += 'Meal12=?, ';
        sqlArray.push(req.body.meal12);
    }
    if (req.body.meal13 != ' ') {
        sqlString += 'Meal13=?, ';
        sqlArray.push(req.body.meal13);
    }
    if (req.body.meal14 != ' ') {
        sqlString += 'Meal14=?, ';
        sqlArray.push(req.body.meal14);
    }
    if (req.body.meal15 != ' ') {
        sqlString += 'Meal15=?, ';
        sqlArray.push(req.body.meal15);
    }
    
    sqlString += 'X';
    var FinalSqlString = sqlString.split(', X')[0];
    console.log(FinalSqlString);
    console.log(sqlArray.length)
     
    if (sqlArray.length > 0) {
        FinalSqlString += ' WHERE MemberID = ? AND Date = ? AND MealType = ? AND Type = ?;';
        sqlArray.push(req.body.memberid);
        sqlArray.push(req.body.date);
        sqlArray.push(2);
        sqlArray.push(req.body.type);
        console.log(FinalSqlString);
        console.log(sqlArray);
        req.dbConnection.query(FinalSqlString, sqlArray, function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            res.json(results);
        });
    } else {
        res.send('未輸入任何修改資料!');
    }
});

module.exports = router;