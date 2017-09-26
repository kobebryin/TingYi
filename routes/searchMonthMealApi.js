var express = require('express');
var router = express.Router();

// -------- Search Data from MySQL's table route ----------------------- 
router.post('/', function (req, res, next) {
    var sqlquery = 'SELECT * FROM meal WHERE MealType=' + req.body.mealtype + ' AND Type="' + req.body.type + '" AND Date="' + req.body.date + '"';


    for (var key in req.body.data) {
        //console.log(req.body.data[key]);
        //console.log(Object.keys(req.body.data[key]));  
        var objKey = Object.keys(req.body.data[key]);
        var data = req.body.data[key];
        for (var key2 in data) {
            if (data.hasOwnProperty(key2)) {
                var string = data[key2].split(",");
                for (var key3 in string) {
                    if (string[key3] != '') {
                        sqlquery += ' AND ' + objKey[0] + ' LIKE "%' + string[key3] + '%"';
                    }
                }
                //console.log(data[key2])
            }
        }
    }

    // for(var key in req.body.data){
    //     var string = Object.values(req.body.data)[key].split(",");
    //     for(var key2 in string){
    //         if(string[key2] != ''){
    //             sqlquery += ' AND' + Object.keys(req.body.data)[key] + ' LIKE "%' + string[key2] + '%"';
    //         }
    //     }
    // }
    console.log(sqlquery);

    req.dbConnection.query(sqlquery, function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
        res.json(results);
    });
});
module.exports = router;