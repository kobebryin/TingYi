angular.module('TinYi').controller('memberDataController', function ($rootScope, $scope) {
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
});