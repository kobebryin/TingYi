angular.module('TinYi').controller('memberDataController', function ($rootScope, $scope, MemberService) {
    $scope.member = {
        rid: null, 
        mid: null, 
        mip: null,
        mid2: null,
        mip2: null, 
        user: null, 
        password: null,
        type: null,
        upid: null, 
        meal1sicktype: null, 
        meal1a: null,
        meal1ac: null,
        meal1b: null, 
        meal1bc: null, 
        meal1c: null,
        meal1cc: null,
        meal2sicktype: null, 
        meal2a: null,
        meal2ac: null,
        meal2b: null, 
        meal2bc: null, 
        meal2c: null,
        meal2cc: null,
        meal3sicktype: null, 
        meal3a: null,
        meal3ac: null,
        meal3b: null, 
        meal3bc: null,
        meal3c: null,
        meal3cc: null,
        sattrib01: null, 
        sattrib02: null,
        sattrib03: null,
        sattrib04: null, 
        sattrib05: null, 
        sattrib06: null,
        sattrib07: null,
        sattrib08: null,
        sattrib09: null,
        sattrib10: null,
        sattrib11: null, 
        sattrib12: null,
        sattrib13: null,
        sattrib14: null, 
        sattrib15: null, 
        sattrib16: null,
        sattrib17: null,
        sattrib18: null,
        sattrib19: null,
        sattrib20: null,
        attrib01: null, 
        attrib02: null,
        attrib03: null,
        attrib04: null, 
        attrib05: null, 
        attrib06: null,
        attrib07: null,
        attrib08: null,
        attrib09: null,
        attrib10: null,
        attrib11: null, 
        attrib12: null,
        attrib13: null,
        attrib14: null, 
        attrib15: null, 
        attrib16: null,
        attrib17: null,
        attrib18: null,
        attrib19: null,
        attrib20: null,
        attrib21: null, 
        attrib22: null,
        attrib23: null,
        attrib24: null, 
        attrib25: null, 
        attrib26: null,
        attrib27: null,
        attrib28: null,
        attrib29: null,
        attrib30: null,
        flag: null,
        createtime: null,
        recordtime: null,
        showtime: null
    };

    $(document).ready(function () {
        $('#example').dataTable({
            "fnRowCallback":
            function (nRow, aData, iDisplayIndex) {
                nRow.className = nRow.className + aData[4]; return nRow;
            },
            "aoData": [
                null,
                null,
                { "bVisible": false, "bSearchable": false },
                { "sClass": "center" },
                { "sClass": "center" }
            ]
        });
    });

    $scope.postMEMBER = function(){
        MemberService.postMEMBER($scope.member, function(data){
            console.log(data);
        });
    };


});