var express = require('express');
var json2xls = require('json2xls');
var fs = require('fs');
var router = express.Router();

router.use(json2xls.middleware);

router.get('/',function(req, res) {
    // console.log(req.body);
    // res.xls('data.xlsx', req.body);

    var obj = JSON.parse(req.query.DATA);
    res.xls('data.xlsx', obj);
});

module.exports = router;