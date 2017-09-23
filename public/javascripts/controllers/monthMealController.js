angular.module('TinYi').controller('monthMealController', function ($rootScope, $scope, MemberService, monthMealService) {
    var id = $rootScope.id; //11960;
    var month_calendar_morning;
    var month_calendar_noon;
    var month_calendar_night;
    var Today = new Date();           //日期
    var client_ip;              //客戶端IP位置

    var subset_calendar_A = [];
    var subset_calendar_B = [];
    var subset_calendar_C = [];

    //預設要載入的變數
    $scope.meal = {
        attrib05: null,
        user: null,
        attrib14: null,
        attrib15: null
    }

    //左邊框架的變數
    $scope.mealForMember = {
        meal1sicktype: null,
        meal1a: null,
        meal1ac: null,
        meal1b: null,
        meal1bc: null,
        meal1c: null,
        meal1cc: null,
        recordtime: null,
        showtime: null,
        id: null
    }

    //右側框架的變數
    $scope.meallistA = {
        rid: ' ',
        mid: ' ',
        mip: ' ',
        mid2: ' ',
        mip2: ' ',
        memberid: ' ',
        date: ' ',
        mealtype: 1,
        type: 'A',
        meal01: ' ',
        meal02: ' ',
        meal03: ' ',
        meal04: ' ',
        meal05: ' ',
        meal06: ' ',
        meal07: ' ',
        meal08: ' ',
        meal09: ' ',
        meal10: ' ',
        meal11: ' ',
        meal12: ' ',
        meal13: ' ',
        meal14: ' ',
        meal15: ' ',
        meal16: ' ',
        meal17: ' ',
        meal18: ' ',
        meal19: ' ',
        meal20: ' ',
        meal21: ' ',
        meal22: ' ',
        meal23: ' ',
        meal24: ' ',
        meal25: ' ',
        meal26: ' ',
        meal27: ' ',
        meal28: ' ',
        meal29: ' ',
        meal30: ' ',
        meal31: ' ',
        meal32: ' ',
        meal33: ' ',
        meal34: ' ',
        meal35: ' ',
        meal36: ' ',
        meal37: ' ',
        meal38: ' ',
        meal39: ' ',
        meal40: ' ',
        flag: 9,
        createtime: ' ',
        recordtime: ' ',
        showtime: ' '
    }

    //右側框架的變數
    $scope.meallistB = {
        rid: ' ',
        mid: ' ',
        mip: ' ',
        mid2: ' ',
        mip2: ' ',
        memberid: ' ',
        date: ' ',
        mealtype: 1,
        type: 'B',
        meal01: ' ',
        meal02: ' ',
        meal03: ' ',
        meal04: ' ',
        meal05: ' ',
        meal06: ' ',
        meal07: ' ',
        meal08: ' ',
        meal09: ' ',
        meal10: ' ',
        meal11: ' ',
        meal12: ' ',
        meal13: ' ',
        meal14: ' ',
        meal15: ' ',
        meal16: ' ',
        meal17: ' ',
        meal18: ' ',
        meal19: ' ',
        meal20: ' ',
        meal21: ' ',
        meal22: ' ',
        meal23: ' ',
        meal24: ' ',
        meal25: ' ',
        meal26: ' ',
        meal27: ' ',
        meal28: ' ',
        meal29: ' ',
        meal30: ' ',
        meal31: ' ',
        meal32: ' ',
        meal33: ' ',
        meal34: ' ',
        meal35: ' ',
        meal36: ' ',
        meal37: ' ',
        meal38: ' ',
        meal39: ' ',
        meal40: ' ',
        flag: 9,
        createtime: ' ',
        recordtime: ' ',
        showtime: ' '
    }

    //右側框架的變數
    $scope.meallistC = {
        rid: ' ',
        mid: ' ',
        mip: ' ',
        mid2: ' ',
        mip2: ' ',
        memberid: ' ',
        date: ' ',
        mealtype: 1,
        type: 'C',
        meal01: ' ',
        meal02: ' ',
        meal03: ' ',
        meal04: ' ',
        meal05: ' ',
        meal06: ' ',
        meal07: ' ',
        meal08: ' ',
        meal09: ' ',
        meal10: ' ',
        meal11: ' ',
        meal12: ' ',
        meal13: ' ',
        meal14: ' ',
        meal15: ' ',
        meal16: ' ',
        meal17: ' ',
        meal18: ' ',
        meal19: ' ',
        meal20: ' ',
        meal21: ' ',
        meal22: ' ',
        meal23: ' ',
        meal24: ' ',
        meal25: ' ',
        meal26: ' ',
        meal27: ' ',
        meal28: ' ',
        meal29: ' ',
        meal30: ' ',
        meal31: ' ',
        meal32: ' ',
        meal33: ' ',
        meal34: ' ',
        meal35: ' ',
        meal36: ' ',
        meal37: ' ',
        meal38: ' ',
        meal39: ' ',
        meal40: ' ',
        flag: 9,
        createtime: ' ',
        recordtime: ' ',
        showtime: ' '
    }

    initial();

    //取得客戶單IP位址
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        client_ip = data.ip;
        console.log(data.ip);
    });;

    //清空重填按鈕
    $scope.clearAll = function () {

        //左邊框架的變數
        let mealForMember = {
            meal1sicktype: null,
            meal1a: null,
            meal1ac: null,
            meal1b: null,
            meal1bc: null,
            meal1c: null,
            meal1cc: null,
            recordtime: null,
            showtime: null,
            id: id
        }

        mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
        mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

        MemberService.putMEMBERforMonthMeal(mealForMember, function (data) {
            initial();
        });

        monthMealService.deleteMeal_A(id, function (data) {
            initial();
        });
    };

    //新增按鈕觸發事件
    $scope.new = function () {

        if (!$scope.cb_morningFalg && !$scope.cb_noonFalg && !$scope.cb_nightFalg) {
            alert('請至少勾選一個時段才可新增!');
        } else {
            //判斷勾選的時段(早午晚)
            if ($scope.cb_morningFalg) {
                if (DifferenceSet_A()) {
                    var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                    $scope.mealForMember.meal1ac = ";";
                    for (key in dates_A) {
                        $scope.mealForMember.meal1ac += dates_A[key] + ";";
                    }
                    $scope.mealForMember.id = id;
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal1sicktype: $scope.mealForMember.meal1sicktype,
                        meal1a: $scope.mealForMember.meal1a,
                        meal1ac: $scope.mealForMember.meal1ac,
                        meal1b: $scope.mealForMember.meal1b,
                        meal1bc: $scope.mealForMember.meal1bc,
                        meal1c: $scope.mealForMember.meal1c,
                        meal1cc: $scope.mealForMember.meal1cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforMonthMeal(mealForMember, function (data) {
                        initial();
                    });

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.meallistA.createtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistA.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistA.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    //存入客戶端IP
                    $scope.meallistA.mip = client_ip;
                    $scope.meallistA.mip2 = client_ip;

                    //memberID欄位
                    $scope.meallistA.memberid = id;

                    //easy ui 值塞進後端
                    A_easy_ui_setting();

                    var dates_A = subset_calendar_A;

                    for (let key in dates_A) {
                        //$scope.meallistA.date = dates_A[key];
                        let input = {
                            rid: $scope.meallistA.rid,
                            mid: $scope.meallistA.mid,
                            mip: $scope.meallistA.mip,
                            mid2: $scope.meallistA.mid2,
                            mip2: $scope.meallistA.mip2,
                            memberid: $scope.meallistA.memberid,
                            date: dates_A[key],
                            mealtype: 1,
                            type: 'A',
                            meal01: $scope.meallistA.meal01,
                            meal02: $scope.meallistA.meal02,
                            meal03: $scope.meallistA.meal03,
                            meal04: $scope.meallistA.meal04,
                            meal05: $scope.meallistA.meal05,
                            meal06: $scope.meallistA.meal06,
                            meal07: $scope.meallistA.meal07,
                            meal08: $scope.meallistA.meal08,
                            meal09: $scope.meallistA.meal09,
                            meal10: $scope.meallistA.meal10,
                            meal11: $scope.meallistA.meal11,
                            meal12: $scope.meallistA.meal12,
                            meal13: $scope.meallistA.meal13,
                            meal14: $scope.meallistA.meal14,
                            meal15: $scope.meallistA.meal15,
                            meal16: $scope.meallistA.meal16,
                            meal17: $scope.meallistA.meal17,
                            meal18: $scope.meallistA.meal18,
                            meal19: $scope.meallistA.meal19,
                            meal20: $scope.meallistA.meal20,
                            meal21: $scope.meallistA.meal21,
                            meal22: $scope.meallistA.meal22,
                            meal23: $scope.meallistA.meal23,
                            meal24: $scope.meallistA.meal24,
                            meal25: $scope.meallistA.meal25,
                            meal26: $scope.meallistA.meal26,
                            meal27: $scope.meallistA.meal27,
                            meal28: $scope.meallistA.meal28,
                            meal29: $scope.meallistA.meal29,
                            meal30: $scope.meallistA.meal30,
                            meal31: $scope.meallistA.meal31,
                            meal32: $scope.meallistA.meal32,
                            meal33: $scope.meallistA.meal33,
                            meal34: $scope.meallistA.meal34,
                            meal35: $scope.meallistA.meal35,
                            meal36: $scope.meallistA.meal36,
                            meal37: $scope.meallistA.meal37,
                            meal38: $scope.meallistA.meal38,
                            meal39: $scope.meallistA.meal39,
                            meal40: $scope.meallistA.meal40,
                            flag: 9,
                            createtime: $scope.meallistA.createtime,
                            recordtime: $scope.meallistA.recordtime,
                            showtime: $scope.meallistA.showtime
                        };

                        monthMealService.postMeal(input, function (data) {
                            clearScopeMemberObj();
                            initial();
                        });
                    }
                } else {
                    alert('請至少勾選一個日期才可新增!');
                }
            }

            //判斷勾選的時段(早午晚)
            if ($scope.cb_noonFalg) {
                if (DifferenceSet_B()) {
                    var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                    $scope.mealForMember.meal1bc = ";";
                    for (key in dates_B) {
                        $scope.mealForMember.meal1bc += dates_B[key] + ";";
                    }
                    $scope.mealForMember.id = id; 
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal1sicktype: $scope.mealForMember.meal1sicktype,
                        meal1a: $scope.mealForMember.meal1a,
                        meal1ac: $scope.mealForMember.meal1ac,
                        meal1b: $scope.mealForMember.meal1b,
                        meal1bc: $scope.mealForMember.meal1bc,
                        meal1c: $scope.mealForMember.meal1c,
                        meal1cc: $scope.mealForMember.meal1cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforMonthMeal(mealForMember, function (data) {
                        initial();
                    });

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.meallistB.createtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistB.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistB.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    //存入客戶端IP
                    $scope.meallistB.mip = client_ip;
                    $scope.meallistB.mip2 = client_ip;

                    //memberID欄位
                    $scope.meallistB.memberid = id;

                    //easy ui 值塞進後端
                    B_easy_ui_setting();

                    var dates_B = subset_calendar_B;

                    for (let key in dates_B) {
                        //$scope.meallistB.date = dates_B[key];
                        let input = {
                            rid: $scope.meallistB.rid,
                            mid: $scope.meallistB.mid,
                            mip: $scope.meallistB.mip,
                            mid2: $scope.meallistB.mid2,
                            mip2: $scope.meallistB.mip2,
                            memberid: $scope.meallistB.memberid,
                            date: dates_B[key],
                            mealtype: 1,
                            type: 'B',
                            meal01: $scope.meallistB.meal01,
                            meal02: $scope.meallistB.meal02,
                            meal03: $scope.meallistB.meal03,
                            meal04: $scope.meallistB.meal04,
                            meal05: $scope.meallistB.meal05,
                            meal06: $scope.meallistB.meal06,
                            meal07: $scope.meallistB.meal07,
                            meal08: $scope.meallistB.meal08,
                            meal09: $scope.meallistB.meal09,
                            meal10: $scope.meallistB.meal10,
                            meal11: $scope.meallistB.meal11,
                            meal12: $scope.meallistB.meal12,
                            meal13: $scope.meallistB.meal13,
                            meal14: $scope.meallistB.meal14,
                            meal15: $scope.meallistB.meal15,
                            meal16: $scope.meallistB.meal16,
                            meal17: $scope.meallistB.meal17,
                            meal18: $scope.meallistB.meal18,
                            meal19: $scope.meallistB.meal19,
                            meal20: $scope.meallistB.meal20,
                            meal21: $scope.meallistB.meal21,
                            meal22: $scope.meallistB.meal22,
                            meal23: $scope.meallistB.meal23,
                            meal24: $scope.meallistB.meal24,
                            meal25: $scope.meallistB.meal25,
                            meal26: $scope.meallistB.meal26,
                            meal27: $scope.meallistB.meal27,
                            meal28: $scope.meallistB.meal28,
                            meal29: $scope.meallistB.meal29,
                            meal30: $scope.meallistB.meal30,
                            meal31: $scope.meallistB.meal31,
                            meal32: $scope.meallistB.meal32,
                            meal33: $scope.meallistB.meal33,
                            meal34: $scope.meallistB.meal34,
                            meal35: $scope.meallistB.meal35,
                            meal36: $scope.meallistB.meal36,
                            meal37: $scope.meallistB.meal37,
                            meal38: $scope.meallistB.meal38,
                            meal39: $scope.meallistB.meal39,
                            meal40: $scope.meallistB.meal40,
                            flag: 9,
                            createtime: $scope.meallistB.createtime,
                            recordtime: $scope.meallistB.recordtime,
                            showtime: $scope.meallistB.showtime
                        };

                        monthMealService.postMeal(input, function (data) {
                            clearScopeMemberObj();
                            initial();
                        });
                    }
                } else {
                    alert('請至少勾選一個日期才可新增!');
                }
            }

            if ($scope.cb_nightFalg) {
                if (DifferenceSet_C()) {
                    var dates_C = month_calendar_night.multiDatesPicker('getDates');
                    $scope.mealForMember.meal1cc = ";";
                    for (key in dates_C) {
                        $scope.mealForMember.meal1cc += dates_C[key] + ";";
                    }
                    $scope.mealForMember.id = id;
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal1sicktype: $scope.mealForMember.meal1sicktype,
                        meal1a: $scope.mealForMember.meal1a,
                        meal1ac: $scope.mealForMember.meal1ac,
                        meal1b: $scope.mealForMember.meal1b,
                        meal1bc: $scope.mealForMember.meal1bc,
                        meal1c: $scope.mealForMember.meal1c,
                        meal1cc: $scope.mealForMember.meal1cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforMonthMeal(mealForMember, function (data) {
                        initial();
                    });

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.meallistC.createtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistC.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistC.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    //存入客戶端IP
                    $scope.meallistC.mip = client_ip;
                    $scope.meallistC.mip2 = client_ip;

                    //easy ui 值塞進後端
                    C_easy_ui_setting();

                    //memberID欄位
                    $scope.meallistC.memberid = id;

                    var dates_C = subset_calendar_C;

                    for (let key in dates_C) {
                        //$scope.meallistC.date = dates_C[key];
                        let input = {
                            rid: $scope.meallistC.rid,
                            mid: $scope.meallistC.mid,
                            mip: $scope.meallistC.mip,
                            mid2: $scope.meallistC.mid2,
                            mip2: $scope.meallistC.mip2,
                            memberid: $scope.meallistC.memberid,
                            date: dates_C[key],
                            mealtype: 1,
                            type: 'C',
                            meal01: $scope.meallistC.meal01,
                            meal02: $scope.meallistC.meal02,
                            meal03: $scope.meallistC.meal03,
                            meal04: $scope.meallistC.meal04,
                            meal05: $scope.meallistC.meal05,
                            meal06: $scope.meallistC.meal06,
                            meal07: $scope.meallistC.meal07,
                            meal08: $scope.meallistC.meal08,
                            meal09: $scope.meallistC.meal09,
                            meal10: $scope.meallistC.meal10,
                            meal11: $scope.meallistC.meal11,
                            meal12: $scope.meallistC.meal12,
                            meal13: $scope.meallistC.meal13,
                            meal14: $scope.meallistC.meal14,
                            meal15: $scope.meallistC.meal15,
                            meal16: $scope.meallistC.meal16,
                            meal17: $scope.meallistC.meal17,
                            meal18: $scope.meallistC.meal18,
                            meal19: $scope.meallistC.meal19,
                            meal20: $scope.meallistC.meal20,
                            meal21: $scope.meallistC.meal21,
                            meal22: $scope.meallistC.meal22,
                            meal23: $scope.meallistC.meal23,
                            meal24: $scope.meallistC.meal24,
                            meal25: $scope.meallistC.meal25,
                            meal26: $scope.meallistC.meal26,
                            meal27: $scope.meallistC.meal27,
                            meal28: $scope.meallistC.meal28,
                            meal29: $scope.meallistC.meal29,
                            meal30: $scope.meallistC.meal30,
                            meal31: $scope.meallistC.meal31,
                            meal32: $scope.meallistC.meal32,
                            meal33: $scope.meallistC.meal33,
                            meal34: $scope.meallistC.meal34,
                            meal35: $scope.meallistC.meal35,
                            meal36: $scope.meallistC.meal36,
                            meal37: $scope.meallistC.meal37,
                            meal38: $scope.meallistC.meal38,
                            meal39: $scope.meallistC.meal39,
                            meal40: $scope.meallistC.meal40,
                            flag: 9,
                            createtime: $scope.meallistC.createtime,
                            recordtime: $scope.meallistC.recordtime,
                            showtime: $scope.meallistC.showtime
                        };
                        monthMealService.postMeal(input, function (data) {
                            clearScopeMemberObj();
                            initial();
                        });
                    }
                } else {
                    alert('請至少勾選一個日期才可新增!');
                }
            }
        }
    };


    /**---------------------------------------function zone start------------------------------------------*/
    function initial() {

        //判斷以防使用者用瀏覽器上下頁，沒選的話就跳回首頁
        if ($rootScope.id === null || $rootScope.id === undefined) {
            alert('請點選會員才能進入此頁面!');
            location.href = '/#/memberData';
        } else {
            //日歷easyui初始化
            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                dateFormat: "yy-mm-dd"
            });
            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                dateFormat: "yy-mm-dd"
            });
            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                dateFormat: "yy-mm-dd"
            });

            /** Meal 早 easy UI */
            $('#Meal_A_Meal09').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueDishList',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal14').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal14',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal15').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal15',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal21').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'get',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal22').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'post',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal23').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'put',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_A_Meal12').combotree({
                url: 'http://127.0.0.1:8080/fieldvalueAttrib05',
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            /** Meal 中午 easy UI */
            $('#Meal_B_Meal09').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueDishList',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal14').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal14',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal15').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal15',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal21').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'get',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal22').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'post',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal23').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'put',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_B_Meal12').combotree({
                url: 'http://127.0.0.1:8080/fieldvalueAttrib05',
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            /** Meal 晚 easy UI */
            $('#Meal_C_Meal09').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueDishList',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal14').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal14',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal15').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal15',
                method: 'get',
                editable: false,
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal21').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'get',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal22').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'post',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal23').combobox({
                url: 'http://127.0.0.1:8080/fieldvalueMeal21',
                method: 'put',
                editable: false,
                valueField: 'id',
                textField: 'text'
            });

            $('#Meal_C_Meal12').combotree({
                url: 'http://127.0.0.1:8080/fieldvalueAttrib05',
                multiple: true,
                valueField: 'id',
                textField: 'text'
            });

            //將初始欄位值塞到前端欄位
            MemberService.getOneMEMBER(id, function (data) {
                $scope.meal.attrib05 = data[0].Attrib05;
                $scope.meal.user = data[0].User;
                $scope.meal.attrib14 = data[0].Attrib14;
                $scope.meal.attrib15 = data[0].Attrib15;

                $scope.mealForMember.meal1sicktype = data[0].Meal1SickType;
                $scope.mealForMember.meal1a = data[0].Meal1A;
                $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
                $scope.mealForMember.meal1b = data[0].Meal1B;
                $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
                $scope.mealForMember.meal1c = data[0].Meal1C;
                $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

                //塞值到前端
                $scope.meallistA.meal02 = $scope.meal.user;    //手機
                $scope.meallistB.meal02 = $scope.meal.user;    //手機  
                $scope.meallistC.meal02 = $scope.meal.user;    //手機
                $scope.meallistA.meal03 = $scope.meal.attrib14;    //早餐地址
                $scope.meallistB.meal03 = $scope.meal.attrib14;    //午餐地址
                $scope.meallistC.meal03 = $scope.meal.attrib15;    //晚餐地址
                //(禁忌)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                var attrib05setArray = [];
                var attrib05Array = $scope.meal.attrib05.split(",");
                for (key in attrib05Array) {
                    attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                }
                $('#Meal_A_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌
                $('#Meal_B_Meal12').combotree('setValue', attrib05setArray);    //午餐禁忌
                $('#Meal_C_Meal12').combotree('setValue', attrib05setArray);    //晚餐禁忌

                //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                if ($scope.mealForMember.meal1ac != null) {
                    if ($scope.mealForMember.meal1ac.length > 9) {
                        //早餐的日曆值塞入
                        var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                        var meal1ac_initial_array = meal1ac_initial.split(";");     //依照;來切
                        month_calendar_morning.multiDatesPicker('addDates', meal1ac_initial_array); //將選取日期值塞入
                        month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({ addDisabledDates: meal1ac_initial_array });     //選取後的日期不能使用        
                    } else {
                        $('#month_calendar_morning').multiDatesPicker('resetDates');
                        $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                    }
                } else {
                    $('#month_calendar_morning').multiDatesPicker('resetDates');
                    $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                }
                if ($scope.mealForMember.meal1bc != null) {
                    if ($scope.mealForMember.meal1bc.length > 9) {
                        //午餐的日曆值塞入
                        var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                        var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
                        month_calendar_noon.multiDatesPicker('addDates', meal1bc_initial_array);    //將選取日期值塞入
                        month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({ addDisabledDates: meal1bc_initial_array });    //選取後的日期不能使用
                    } else {
                        $('#month_calendar_noon').multiDatesPicker('resetDates');
                        $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                    }
                } else {
                    $('#month_calendar_noon').multiDatesPicker('resetDates');
                    $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                }
                if ($scope.mealForMember.meal1cc != null) {
                    if ($scope.mealForMember.meal1cc.length > 9) {
                        //晚餐的日曆值塞入
                        var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                        var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
                        month_calendar_night.multiDatesPicker('addDates', meal1cc_initial_array);   //將選取日期值塞入
                        month_calendar_night = $('#month_calendar_night').multiDatesPicker({ addDisabledDates: meal1cc_initial_array });  //選取後的日期不能使用
                    } else {
                        $('#month_calendar_night').multiDatesPicker('resetDates');
                        $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                    }
                } else {
                    $('#month_calendar_night').multiDatesPicker('resetDates');
                    $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                }
            });
        }
    }

    function A_easy_ui_setting() {
        //早餐easy-ui conboxbox值設定
        $scope.meallistA.meal09 = $('#Meal_A_Meal09').val();
        $scope.meallistA.meal12 = $('#Meal_A_Meal12').val();
        $scope.meallistA.meal14 = $('#Meal_A_Meal14').val();
        $scope.meallistA.meal15 = $('#Meal_A_Meal15').val();
        $scope.meallistA.meal21 = $('#Meal_A_Meal21').val();
        $scope.meallistA.meal22 = $('#Meal_A_Meal22').val();
        $scope.meallistA.meal23 = $('#Meal_A_Meal23').val();
    }

    function B_easy_ui_setting() {
        //午餐easy-ui conboxbox值設定
        $scope.meallistB.meal09 = $('#Meal_B_Meal09').val();
        $scope.meallistB.meal12 = $('#Meal_B_Meal12').val();
        $scope.meallistB.meal14 = $('#Meal_B_Meal14').val();
        $scope.meallistB.meal15 = $('#Meal_B_Meal15').val();
        $scope.meallistB.meal21 = $('#Meal_B_Meal21').val();
        $scope.meallistB.meal22 = $('#Meal_B_Meal22').val();
        $scope.meallistB.meal23 = $('#Meal_B_Meal23').val();
    }

    function C_easy_ui_setting() {
        //晚餐easy-ui conboxbox值設定
        $scope.meallistC.meal09 = $('#Meal_C_Meal09').val();
        $scope.meallistC.meal12 = $('#Meal_C_Meal12').val();
        $scope.meallistC.meal14 = $('#Meal_C_Meal14').val();
        $scope.meallistC.meal15 = $('#Meal_C_Meal15').val();
        $scope.meallistC.meal21 = $('#Meal_C_Meal21').val();
        $scope.meallistC.meal22 = $('#Meal_C_Meal22').val();
        $scope.meallistC.meal23 = $('#Meal_C_Meal23').val();
    }

    function clearScopeMemberObj() {
        //用迴圈將所有值設為null
        for (var p in $scope.meallistA) {
            if ($scope.meallistA.hasOwnProperty(p)) {
                $scope.meallistA[p] = ' ';
            }
        }
        $scope.meallistA.flag = 9;
        $scope.meallistA.type = 'A';
        $scope.meallistA.mealtype = 1;

        //用迴圈將所有值設為null
        for (var p in $scope.meallistB) {
            if ($scope.meallistB.hasOwnProperty(p)) {
                $scope.meallistB[p] = ' ';
            }
        }
        $scope.meallistB.flag = 9;
        $scope.meallistB.type = 'B';
        $scope.meallistB.mealtype = 1;

        //用迴圈將所有值設為null
        for (var p in $scope.meallistC) {
            if ($scope.meallistC.hasOwnProperty(p)) {
                $scope.meallistC[p] = ' ';
            }
        }
        $scope.meallistC.flag = 9;
        $scope.meallistC.type = 'C';
        $scope.meallistC.mealtype = 1;
    }

    //抓早日期差集
    function DifferenceSet_A() {
        if ($scope.mealForMember.meal1ac === null) {
            var dates = month_calendar_morning.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_A = dates;
                return true;
            }
        } else {
            var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
            var meal1ac_initial_array = meal1ac_initial.split(";");     //依照;來切
            // console.log(meal1ac_initial_array);

            var dates = month_calendar_morning.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal1ac_initial_array);

            var subset = [];

            for (let item of set1) {
                if (!set2.has(item)) {
                    subset.push(item);
                }
            }
            // console.log(subset);

            if (subset.length === 0) {
                return false;
            } else {
                subset_calendar_A = subset;
                return true;
            }
        }
    }

    //抓午日期差集
    function DifferenceSet_B() {
        if ($scope.mealForMember.meal1bc === null) {
            var dates = month_calendar_noon.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_B = dates;
                return true;
            }
        } else {
            var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
            var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
            // console.log(meal1bc_initial_array);

            var dates = month_calendar_noon.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal1bc_initial_array);

            var subset = [];

            for (let item of set1) {
                if (!set2.has(item)) {
                    subset.push(item);
                }
            }
            // console.log(subset);

            if (subset.length === 0) {
                return false;
            } else {
                subset_calendar_B = subset;
                return true;
            }
        }
    }

    //抓晚日期差集
    function DifferenceSet_C() {
        if ($scope.mealForMember.meal1cc === null) {
            var dates = month_calendar_night.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_C = dates;
                return true;
            }
        } else {
            var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
            var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
            // console.log(meal1cc_initial_array);

            var dates = month_calendar_night.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal1cc_initial_array);

            var subset = [];

            for (let item of set1) {
                if (!set2.has(item)) {
                    subset.push(item);
                }
            }
            // console.log(subset);

            if (subset.length === 0) {
                return false;
            } else {
                subset_calendar_C = subset;
                return true;
            }
        }
    }
    /**---------------------------------------function zone end--------------------------------------------*/
});