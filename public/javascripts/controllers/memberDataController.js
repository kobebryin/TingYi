angular.module('TinYi').controller('memberDataController', function ($rootScope, $scope, MemberService) {
    $scope.typeMapping = ['最高權限管理人員', '管理人員', '寫單人員', '營養顧問', '醫院', '客戶'];
    $scope.member = {
        rid: null,
        mid: null,
        mip: null,
        mid2: null,
        mip2: null,
        user: null,
        password: null,
        type: null,   //＝會員類型 0:最高權限管理人員 1:管理人員 2:寫單人員 3:營養顧問 4:醫院 5:客戶 
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

    // Show full page LoadingOverlay
    $.LoadingOverlay("show");

    //營養顧問dropdown list名單抓取
    MemberService.getSalesList(function (data) {
        $scope.saleslist = data;
    });

    //會員資料初始取得存入datatables
    MemberService.getMEMBER(function (data) {
        $scope.getMember = data;
        // console.log(data);

        setTimeout(function () {
            $(document).ready(function () {
                var table = $('#example').DataTable({
                    "order": [[0, "desc"]],
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
                $('#example tbody').on('click', 'tr', function () {
                    var data = table.row(this).data();
                    alert('You clicked on ' + data[0] + '\'s row');
                });
                // Hide it after 0.1 seconds
                $.LoadingOverlay("hide");
            }, 200);
        });
    });

    // $(document).ready(function () {
    //     $('#example').dataTable({
    //         "fnRowCallback":
    //         function (nRow, aData, iDisplayIndex) {
    //             nRow.className = nRow.className + aData[4]; return nRow;
    //         },
    //         "aoData": [
    //             null,
    //             null,
    //             { "bVisible": false, "bSearchable": false },
    //             { "sClass": "center" },
    //             { "sClass": "center" }
    //         ]
    //     });
    // });


    //新增資料上ＭySQL
    $scope.postMEMBER = function () {
        //預產期年月日合併
        $scope.member.attrib04 = $scope.attrib04_0_TMP + "<br>" + $scope.attrib04_1_TMP + "<br>" + $scope.attrib04_2_TMP;
        //生日年月日合併
        $scope.member.attrib03 = $scope.attrib03_0_TMP + "<br>" + $scope.attrib03_1_TMP + "<br>" + $scope.attrib03_2_TMP;
        //生產日期年月日合併
        $scope.member.attrib02 = $scope.attrib02_0_TMP + "<br>" + $scope.attrib02_1_TMP + "<br>" + $scope.attrib02_2_TMP;
        //供餐開始日期年月日合併
        $scope.member.attrib16 = $scope.attrib16_0_TMP + "<br>" + $scope.attrib16_1_TMP + "<br>" + $scope.attrib16_2_TMP;
        //供餐結束日期年月日合併
        $scope.member.attrib17 = $scope.attrib17_0_TMP + "<br>" + $scope.attrib17_1_TMP + "<br>" + $scope.attrib17_2_TMP;

        console.log($scope.member);

        MemberService.postMEMBER($scope.member, function (data) {
            console.log(data);
        });
    };
});