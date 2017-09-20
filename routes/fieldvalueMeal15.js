var express = require('express');
var router = express.Router();

// --------  get Data from MySQL's table fieldvalue ----------------------- 
router.get('/', function (req, res, next) {
    req.dbConnection.query("SELECT Content FROM fieldvalue WHERE TableAttrib ='Meal_Meal15_1';", function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', JSON.parse(results[0].Content));
        res.json(JSON.parse(results[0].Content));
    });
});
module.exports = router;