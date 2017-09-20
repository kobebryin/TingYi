var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table fieldvalue ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query("SELECT Name FROM dish WHERE Flag = 9;", function (error, results, fields) {
        if (error) throw error;
        
        var ans = [];
        for(key in results){
            ans.push({id: results[key].Name, text: results[key].Name});
        }
        console.log('The solution is: ', ans);
        res.json(ans);
    });
});
module.exports = router;