angular.module('TinYi').controller('monthMealController', function ($rootScope, $scope, $timeout, MemberService, monthMealService) {
    var id = sessionStorage.memberid; //11960;
    $scope.UserName = id;
    $scope.UserNAME = sessionStorage.membername;
    var month_calendar;
    var month_calendar_morning;
    var month_calendar_noon;
    var month_calendar_night;
    var Today = new Date();           //日期
    var client_ip;              //客戶端IP位置

    var Edit_Type = '1';
    // $scope.Edit_Type = '1';     //編輯模式ng-model預設   
    var enableDays_A = [];
    var enableDays_B = [];
    var enableDays_C = [];

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

    //修改取消用來刪除陣列元素函式
    function remove(array, deleteValue) {
        for (var key in array) {
            if (array[key] == deleteValue) array.splice(key, 1);
        }
        return array;
    }

    //修改取消用來刪除陣列元素函式
    function editJoin_check(array, deleteValue) {
        var same_flag = false;
        for (var key in array) {
            if (array[key] == deleteValue) {
                same_flag = true;
                break;
            } else {
                same_flag = false;
            }
        }
        return same_flag;
    }

    //剩餘餐數計算
    $scope.countMeal = function () {
        MemberService.getOneMEMBER(id, function (data) {
            $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
            $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
            $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

            if ($scope.mealForMember.meal1ac != null) {
                if ($scope.mealForMember.meal1ac.length > 9) {
                    var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                    var meal1ac_initial_array = meal1ac_initial.split(";");     //依照;來切
                    $scope.MealXARemain = - meal1ac_initial_array.length; //剩餘參數塞值
                    if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = - meal1ac_initial_array.length + $scope.mealForMember.meal1a;
                } else {
                    $scope.MealXARemain = 0; //剩餘參數塞值
                    if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = 0 + $scope.mealForMember.meal1a;
                }
            } else {
                $scope.MealXARemain = 0; //剩餘參數塞值
                if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = 0 + $scope.mealForMember.meal1a;
            }

            if ($scope.mealForMember.meal1bc != null) {
                if ($scope.mealForMember.meal1bc.length > 9) {
                    var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                    var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
                    $scope.MealXBRemain = - meal1bc_initial_array.length; //剩餘參數塞值
                    if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = - meal1bc_initial_array.length + $scope.mealForMember.meal1b;
                } else {
                    $scope.MealXBRemain = 0; //剩餘參數塞值
                    if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = 0 + $scope.mealForMember.meal1b;
                }
            } else {
                $scope.MealXBRemain = 0; //剩餘參數塞值
                if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = 0 + $scope.mealForMember.meal1b;
            }

            if ($scope.mealForMember.meal1cc != null) {
                if ($scope.mealForMember.meal1cc.length > 9) {
                    var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                    var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
                    $scope.MealXCRemain = - meal1cc_initial_array.length; //剩餘參數塞值
                    if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = - meal1cc_initial_array.length + $scope.mealForMember.meal1c;
                } else {
                    $scope.MealXCRemain = 0; //剩餘參數塞值
                    if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = 0 + $scope.mealForMember.meal1c;
                }
            } else {
                $scope.MealXCRemain = 0; //剩餘參數塞值
                if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = 0 + $scope.mealForMember.meal1c;
            }
        });
    };

    //地址更改ng-change事件 + delay延遲
    $scope.ChkAddress_onChange = function () {
        if (Edit_Type === '4') {
            //查看資料功能時，不會任意更改欄位資料
        } else {
            var addressA = $scope.meallistA.meal03;
            var addressB = $scope.meallistB.meal03;
            var addressC = $scope.meallistC.meal03;

            monthMealService.change_routeNumber(addressA, function (data) {
                if (data.length > 0) {
                    $scope.meallistA.meal04 = data[0].RouteNumber;
                } else {
                    $scope.meallistA.meal04 = ' ';
                }
            });
            monthMealService.change_routeNumber(addressB, function (data) {
                if (data.length > 0) {
                    $scope.meallistB.meal04 = data[0].RouteNumber;
                } else {
                    $scope.meallistB.meal04 = ' ';
                }
            });
            monthMealService.change_routeNumber(addressC, function (data) {
                if (data.length > 0) {
                    $scope.meallistC.meal04 = data[0].RouteNumber;
                } else {
                    $scope.meallistC.meal04 = ' ';
                }
            });
        }
    }
    $scope.delay = (function () {
        var promise = null;
        return function (callback, ms) {
            $timeout.cancel(promise); //clearTimeout(timer);
            promise = $timeout(callback, ms); //timer = setTimeout(callback, ms);
        };
    })();

    initial();

    // Edit_Type_check();

    //取得客戶單IP位址
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        client_ip = data.ip;
        // console.log(data.ip);
    });;

    //進入月子餐頁面
    $scope.goToMonthMeal = function () {
        location.href = '/#/monthMeal';
    };

    $rootScope.goToConditionMeal = function () {
        location.href = '/#/conditionMeal';
    };

    $rootScope.goToNormalMeal = function () {
        location.href = '/#/normalMeal';
    };

    //儲存總餐數與病理種類
    $scope.saveMeal = function() {
        $.LoadingOverlay("show");
        $scope.mealForMember.id = id;

        let mealForMember = {
            meal1sicktype: $scope.mealForMember.meal1sicktype,
            meal1a: $scope.mealForMember.meal1a,
            meal1b: $scope.mealForMember.meal1b,
            meal1c: $scope.mealForMember.meal1c,
            id: $scope.mealForMember.id
        }
        
        MemberService.putMEMBERMEALforMonthMeal(mealForMember, function (data) {
            initial();
            $.LoadingOverlay("hide");
        });
    };

    //將資料匯出到右側欄位中
    $scope.getMealData = function () {
        if (month_calendar.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可修改!');
        } else {
            var date = month_calendar.multiDatesPicker('getDates');
            var inputObj = {
                memberid: id,
                date: date[0],
                mealtype: 1,
                type: 'A'
            }

            monthMealService.show_data(inputObj, function (data) {
                if (data.length > 0) {
                    $scope.meallistA.meal01 = data[0].Meal01;
                    $scope.meallistA.meal02 = data[0].Meal02;
                    $scope.meallistA.meal03 = data[0].Meal03;
                    $scope.meallistA.meal04 = data[0].Meal04;
                    $scope.meallistA.meal05 = data[0].Meal05;
                    $scope.meallistA.meal06 = data[0].Meal06;
                    $scope.meallistA.meal07 = data[0].Meal07;
                    $scope.meallistA.meal08 = data[0].Meal08;
                    $scope.meallistA.meal09 = data[0].Meal09;
                    $scope.meallistA.meal10 = data[0].Meal10;
                    $scope.meallistA.meal11 = data[0].Meal11;
                    $scope.meallistA.meal12 = data[0].Meal12;
                    $scope.meallistA.meal13 = data[0].Meal13;
                    $scope.meallistA.meal14 = data[0].Meal14;
                    $scope.meallistA.meal15 = data[0].Meal15;
                    $scope.meallistA.meal16 = data[0].Meal16;
                    $scope.meallistA.meal17 = data[0].Meal17;
                    $scope.meallistA.meal18 = data[0].Meal18;
                    $scope.meallistA.meal19 = data[0].Meal19;
                    $scope.meallistA.meal20 = data[0].Meal20;
                    $scope.meallistA.meal21 = data[0].Meal21;
                    $scope.meallistA.meal22 = data[0].Meal22;
                    $scope.meallistA.meal23 = data[0].Meal23;
                    $scope.meallistA.meal24 = data[0].Meal24;
                    $scope.meallistA.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistA.meal12 !== null) attrib05Array = $scope.meallistA.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_A_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistA.meal09.split(",");
                    $('#Meal_A_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistA.meal14.split(",");
                    $('#Meal_A_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistA.meal15.split(",");
                    $('#Meal_A_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_A_Meal21').combobox('setValue', $scope.meallistA.meal21);
                    $('#Meal_A_Meal22').combobox('setValue', $scope.meallistA.meal22);
                    $('#Meal_A_Meal23').combobox('setValue', $scope.meallistA.meal23);
                } else {
                    clearScopeMemberObjA();
                    $('#Meal_A_Meal12').combotree('setValue', '');
                    $('#Meal_A_Meal09').combobox('setValue', '');
                    $('#Meal_A_Meal14').combobox('setValue', '');
                    $('#Meal_A_Meal15').combobox('setValue', '');
                    $('#Meal_A_Meal21').combobox('setValue', '');
                    $('#Meal_A_Meal22').combobox('setValue', '');
                    $('#Meal_A_Meal23').combobox('setValue', '');
                }

            });

            var inputObj = {
                memberid: id,
                date: date[0],
                mealtype: 1,
                type: 'B'
            }
            monthMealService.show_data(inputObj, function (data) {
                if (data.length > 0) {
                    $scope.meallistB.meal01 = data[0].Meal01;
                    $scope.meallistB.meal02 = data[0].Meal02;
                    $scope.meallistB.meal03 = data[0].Meal03;
                    $scope.meallistB.meal04 = data[0].Meal04;
                    $scope.meallistB.meal05 = data[0].Meal05;
                    $scope.meallistB.meal06 = data[0].Meal06;
                    $scope.meallistB.meal07 = data[0].Meal07;
                    $scope.meallistB.meal08 = data[0].Meal08;
                    $scope.meallistB.meal09 = data[0].Meal09;
                    $scope.meallistB.meal10 = data[0].Meal10;
                    $scope.meallistB.meal11 = data[0].Meal11;
                    $scope.meallistB.meal12 = data[0].Meal12;
                    $scope.meallistB.meal13 = data[0].Meal13;
                    $scope.meallistB.meal14 = data[0].Meal14;
                    $scope.meallistB.meal15 = data[0].Meal15;
                    $scope.meallistB.meal16 = data[0].Meal16;
                    $scope.meallistB.meal17 = data[0].Meal17;
                    $scope.meallistB.meal18 = data[0].Meal18;
                    $scope.meallistB.meal19 = data[0].Meal19;
                    $scope.meallistB.meal20 = data[0].Meal20;
                    $scope.meallistB.meal21 = data[0].Meal21;
                    $scope.meallistB.meal22 = data[0].Meal22;
                    $scope.meallistB.meal23 = data[0].Meal23;
                    $scope.meallistB.meal24 = data[0].Meal24;
                    $scope.meallistB.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistB.meal12 !== null) attrib05Array = $scope.meallistB.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_B_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistB.meal09.split(",");
                    $('#Meal_B_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistB.meal14.split(",");
                    $('#Meal_B_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistB.meal15.split(",");
                    $('#Meal_B_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_B_Meal21').combobox('setValue', $scope.meallistB.meal21);
                    $('#Meal_B_Meal22').combobox('setValue', $scope.meallistB.meal22);
                    $('#Meal_B_Meal23').combobox('setValue', $scope.meallistB.meal23);
                } else {
                    clearScopeMemberObjB();
                    $('#Meal_B_Meal12').combotree('setValue', '');
                    $('#Meal_B_Meal09').combobox('setValue', '');
                    $('#Meal_B_Meal14').combobox('setValue', '');
                    $('#Meal_B_Meal15').combobox('setValue', '');
                    $('#Meal_B_Meal21').combobox('setValue', '');
                    $('#Meal_B_Meal22').combobox('setValue', '');
                    $('#Meal_B_Meal23').combobox('setValue', '');
                }
            });

            var inputObj = {
                memberid: id,
                date: date[0],
                mealtype: 1,
                type: 'C'
            }
            monthMealService.show_data(inputObj, function (data) {
                if (data.length > 0) {
                    $scope.meallistC.meal01 = data[0].Meal01;
                    $scope.meallistC.meal02 = data[0].Meal02;
                    $scope.meallistC.meal03 = data[0].Meal03;
                    $scope.meallistC.meal04 = data[0].Meal04;
                    $scope.meallistC.meal05 = data[0].Meal05;
                    $scope.meallistC.meal06 = data[0].Meal06;
                    $scope.meallistC.meal07 = data[0].Meal07;
                    $scope.meallistC.meal08 = data[0].Meal08;
                    $scope.meallistC.meal09 = data[0].Meal09;
                    $scope.meallistC.meal10 = data[0].Meal10;
                    $scope.meallistC.meal11 = data[0].Meal11;
                    $scope.meallistC.meal12 = data[0].Meal12;
                    $scope.meallistC.meal13 = data[0].Meal13;
                    $scope.meallistC.meal14 = data[0].Meal14;
                    $scope.meallistC.meal15 = data[0].Meal15;
                    $scope.meallistC.meal16 = data[0].Meal16;
                    $scope.meallistC.meal17 = data[0].Meal17;
                    $scope.meallistC.meal18 = data[0].Meal18;
                    $scope.meallistC.meal19 = data[0].Meal19;
                    $scope.meallistC.meal20 = data[0].Meal20;
                    $scope.meallistC.meal21 = data[0].Meal21;
                    $scope.meallistC.meal22 = data[0].Meal22;
                    $scope.meallistC.meal23 = data[0].Meal23;
                    $scope.meallistC.meal24 = data[0].Meal24;
                    $scope.meallistC.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistC.meal12 !== null) attrib05Array = $scope.meallistC.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_C_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistC.meal09.split(",");
                    $('#Meal_C_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistC.meal14.split(",");
                    $('#Meal_C_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistC.meal15.split(",");
                    $('#Meal_C_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_C_Meal21').combobox('setValue', $scope.meallistC.meal21);
                    $('#Meal_C_Meal22').combobox('setValue', $scope.meallistC.meal22);
                    $('#Meal_C_Meal23').combobox('setValue', $scope.meallistC.meal23);
                } else {
                    clearScopeMemberObjC();
                    $('#Meal_C_Meal12').combotree('setValue', '');
                    $('#Meal_C_Meal09').combobox('setValue', '');
                    $('#Meal_C_Meal14').combobox('setValue', '');
                    $('#Meal_C_Meal15').combobox('setValue', '');
                    $('#Meal_C_Meal21').combobox('setValue', '');
                    $('#Meal_C_Meal22').combobox('setValue', '');
                    $('#Meal_C_Meal23').combobox('setValue', '');
                }
            });
        }
    };

    //清空重填按鈕觸發事件
    $scope.clearAll = function () {

        var confirmDelete = confirm("確認刪除之前的舊訂餐嗎？    ＊假如確認，將無法恢復！");　//跳除confirm視窗詢是否刪除
        if (confirmDelete == true) {
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
        } else {
            //按下取消不做任何事情 
        }
    };

    //修改取消觸發事件
    $scope.edit_cancle = function () {
        if (month_calendar_morning.multiDatesPicker('getDates').length === 0 && month_calendar_noon.multiDatesPicker('getDates').length === 0 && month_calendar_night.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可修改!');
        } else {

            if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");

                $scope.meallistA.meal09 = ' ';
                $scope.meallistA.meal12 = ' ';
                $scope.meallistA.meal14 = ' ';
                $scope.meallistA.meal15 = ' ';
                $scope.meallistA.meal21 = ' ';
                $scope.meallistA.meal22 = ' ';
                $scope.meallistA.meal23 = ' ';

                var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_A[0],
                    mealtype: 1,
                    type: 'A'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var updateflag = false;

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var meal09Array = data[0].Meal09.split(",");
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');

                        for (let key in deleteArray) {
                            meal09Array = remove(meal09Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal09 = meal09Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var meal12Array = data[0].Meal12.split(",");
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');

                        for (let key in deleteArray) {
                            meal12Array = remove(meal12Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal12 = meal12Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var meal14Array = data[0].Meal14.split(",");
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');

                        for (let key in deleteArray) {
                            meal14Array = remove(meal14Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal14 = meal14Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal15').val() != '') {
                        var meal15Array = data[0].Meal15.split(",");
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');

                        for (let key in deleteArray) {
                            meal15Array = remove(meal15Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal15 = meal15Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal21').val() != '') {
                        var meal21Array = data[0].Meal21;
                        var deleteArray = $('#S_Meal_A_Meal21').val();

                        if (meal21Array == deleteArray) {
                            meal21Array = '';
                        }

                        $scope.meallistA.meal21 = meal21Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal22').val() != '') {
                        var meal22Array = data[0].Meal22;
                        var deleteArray = $('#S_Meal_A_Meal22').val();

                        if (meal22Array == deleteArray) {
                            meal22Array = '';
                        }

                        $scope.meallistA.meal22 = meal22Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal23').val() != '') {
                        var meal23Array = data[0].Meal23;
                        var deleteArray = $('#S_Meal_A_Meal23').val();

                        if (meal23Array == deleteArray) {
                            meal23Array = '';
                        }

                        $scope.meallistA.meal23 = meal23Array;

                        updateflag = true;
                    }

                    if (updateflag) {
                        var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                        for (let key in dates_A) {

                            let edit_join_data = {
                                memberid: id,
                                date: dates_A[key],
                                mealtype: 1,
                                type: 'A',
                                meal09: $scope.meallistA.meal09,
                                meal12: $scope.meallistA.meal12,
                                meal14: $scope.meallistA.meal14,
                                meal15: $scope.meallistA.meal15,
                                meal21: $scope.meallistA.meal21,
                                meal22: $scope.meallistA.meal22,
                                meal23: $scope.meallistA.meal23
                            }

                            monthMealService.edit_cancle_Meal(edit_join_data, function (data) {
                                if (data === '未輸入任何修改資料!') {
                                    alert(data);
                                    $.LoadingOverlay("hide");
                                } else {
                                    initial();
                                    if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                                }
                            });
                        }
                    } else {
                        alert('沒輸入修改資料！');
                        $.LoadingOverlay("hide");
                    }
                });
            }

            if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");

                $scope.meallistA.meal09 = ' ';
                $scope.meallistA.meal12 = ' ';
                $scope.meallistA.meal14 = ' ';
                $scope.meallistA.meal15 = ' ';
                $scope.meallistA.meal21 = ' ';
                $scope.meallistA.meal22 = ' ';
                $scope.meallistA.meal23 = ' ';

                var dates_A = month_calendar_noon.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_A[0],
                    mealtype: 1,
                    type: 'B'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var updateflag = false;

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var meal09Array = data[0].Meal09.split(",");
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');

                        for (let key in deleteArray) {
                            meal09Array = remove(meal09Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal09 = meal09Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var meal12Array = data[0].Meal12.split(",");
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');

                        for (let key in deleteArray) {
                            meal12Array = remove(meal12Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal12 = meal12Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var meal14Array = data[0].Meal14.split(",");
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');

                        for (let key in deleteArray) {
                            meal14Array = remove(meal14Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal14 = meal14Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal15').val() != '') {
                        var meal15Array = data[0].Meal15.split(",");
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');

                        for (let key in deleteArray) {
                            meal15Array = remove(meal15Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal15 = meal15Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal21').val() != '') {
                        var meal21Array = data[0].Meal21;
                        var deleteArray = $('#S_Meal_A_Meal21').val();

                        if (meal21Array == deleteArray) {
                            meal21Array = '';
                        }

                        $scope.meallistA.meal21 = meal21Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal22').val() != '') {
                        var meal22Array = data[0].Meal22;
                        var deleteArray = $('#S_Meal_A_Meal22').val();

                        if (meal22Array == deleteArray) {
                            meal22Array = '';
                        }

                        $scope.meallistA.meal22 = meal22Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal23').val() != '') {
                        var meal23Array = data[0].Meal23;
                        var deleteArray = $('#S_Meal_A_Meal23').val();

                        if (meal23Array == deleteArray) {
                            meal23Array = '';
                        }

                        $scope.meallistA.meal23 = meal23Array;

                        updateflag = true;
                    }

                    if (updateflag) {
                        var dates_A = month_calendar_noon.multiDatesPicker('getDates');
                        for (let key in dates_A) {

                            let edit_join_data = {
                                memberid: id,
                                date: dates_A[key],
                                mealtype: 1,
                                type: 'B',
                                meal09: $scope.meallistA.meal09,
                                meal12: $scope.meallistA.meal12,
                                meal14: $scope.meallistA.meal14,
                                meal15: $scope.meallistA.meal15,
                                meal21: $scope.meallistA.meal21,
                                meal22: $scope.meallistA.meal22,
                                meal23: $scope.meallistA.meal23
                            }

                            monthMealService.edit_cancle_Meal(edit_join_data, function (data) {
                                if (data === '未輸入任何修改資料!') {
                                    alert(data);
                                    $.LoadingOverlay("hide");
                                } else {
                                    initial();
                                    if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                                }
                            });
                        }
                    } else {
                        alert('沒輸入修改資料！');
                        $.LoadingOverlay("hide");
                    }
                });
            }
            if (month_calendar_night.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");

                $scope.meallistA.meal09 = ' ';
                $scope.meallistA.meal12 = ' ';
                $scope.meallistA.meal14 = ' ';
                $scope.meallistA.meal15 = ' ';
                $scope.meallistA.meal21 = ' ';
                $scope.meallistA.meal22 = ' ';
                $scope.meallistA.meal23 = ' ';

                var dates_A = month_calendar_night.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_A[0],
                    mealtype: 1,
                    type: 'C'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var updateflag = false;

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var meal09Array = data[0].Meal09.split(",");
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');

                        for (let key in deleteArray) {
                            meal09Array = remove(meal09Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal09 = meal09Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var meal12Array = data[0].Meal12.split(",");
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');

                        for (let key in deleteArray) {
                            meal12Array = remove(meal12Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal12 = meal12Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var meal14Array = data[0].Meal14.split(",");
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');

                        for (let key in deleteArray) {
                            meal14Array = remove(meal14Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal14 = meal14Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal15').val() != '') {
                        var meal15Array = data[0].Meal15.split(",");
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');

                        for (let key in deleteArray) {
                            meal15Array = remove(meal15Array, deleteArray[key]);
                        }
                        $scope.meallistA.meal15 = meal15Array.join(',');

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal21').val() != '') {
                        var meal21Array = data[0].Meal21;
                        var deleteArray = $('#S_Meal_A_Meal21').val();

                        if (meal21Array == deleteArray) {
                            meal21Array = '';
                        }

                        $scope.meallistA.meal21 = meal21Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal22').val() != '') {
                        var meal22Array = data[0].Meal22;
                        var deleteArray = $('#S_Meal_A_Meal22').val();

                        if (meal22Array == deleteArray) {
                            meal22Array = '';
                        }

                        $scope.meallistA.meal22 = meal22Array;

                        updateflag = true;
                    }

                    if ($('#S_Meal_A_Meal23').val() != '') {
                        var meal23Array = data[0].Meal23;
                        var deleteArray = $('#S_Meal_A_Meal23').val();

                        if (meal23Array == deleteArray) {
                            meal23Array = '';
                        }

                        $scope.meallistA.meal23 = meal23Array;

                        updateflag = true;
                    }

                    if (updateflag) {
                        var dates_A = month_calendar_night.multiDatesPicker('getDates');
                        for (let key in dates_A) {

                            let edit_join_data = {
                                memberid: id,
                                date: dates_A[key],
                                mealtype: 1,
                                type: 'C',
                                meal09: $scope.meallistA.meal09,
                                meal12: $scope.meallistA.meal12,
                                meal14: $scope.meallistA.meal14,
                                meal15: $scope.meallistA.meal15,
                                meal21: $scope.meallistA.meal21,
                                meal22: $scope.meallistA.meal22,
                                meal23: $scope.meallistA.meal23
                            }

                            monthMealService.edit_cancle_Meal(edit_join_data, function (data) {
                                if (data === '未輸入任何修改資料!') {
                                    alert(data);
                                    $.LoadingOverlay("hide");
                                } else {
                                    initial();
                                    if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                                }
                            });
                        }
                    } else {
                        alert('沒輸入修改資料！');
                        $.LoadingOverlay("hide");
                    }
                });
            }
        }
    };

    //查詢按鈕觸發事件
    $scope.show_data = function () {
        if (month_calendar_morning.multiDatesPicker('getDates').length === 0 && month_calendar_noon.multiDatesPicker('getDates').length === 0 && month_calendar_night.multiDatesPicker('getDates').length === 0 && month_calendar.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可查詢!');
        } else {
            clearScopeMemberObj();
            $('#Meal_A_Meal12').combotree('setValue', '');
            $('#Meal_A_Meal09').combobox('setValue', '');
            $('#Meal_A_Meal14').combobox('setValue', '');
            $('#Meal_A_Meal15').combobox('setValue', '');
            $('#Meal_A_Meal21').combobox('setValue', '');
            $('#Meal_A_Meal22').combobox('setValue', '');
            $('#Meal_A_Meal23').combobox('setValue', '');

            $('#Meal_B_Meal12').combotree('setValue', '');
            $('#Meal_B_Meal09').combobox('setValue', '');
            $('#Meal_B_Meal14').combobox('setValue', '');
            $('#Meal_B_Meal15').combobox('setValue', '');
            $('#Meal_B_Meal21').combobox('setValue', '');
            $('#Meal_B_Meal22').combobox('setValue', '');
            $('#Meal_B_Meal23').combobox('setValue', '');

            $('#Meal_C_Meal12').combotree('setValue', '');
            $('#Meal_C_Meal09').combobox('setValue', '');
            $('#Meal_C_Meal14').combobox('setValue', '');
            $('#Meal_C_Meal15').combobox('setValue', '');
            $('#Meal_C_Meal21').combobox('setValue', '');
            $('#Meal_C_Meal22').combobox('setValue', '');
            $('#Meal_C_Meal23').combobox('setValue', '');
            if (month_calendar.multiDatesPicker('getDates').length === 0) {

            } else {
                var date = month_calendar.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: date[0],
                    mealtype: 1,
                    type: 'A'
                }

                monthMealService.show_data(inputObj, function (data) {
                    if (data.length > 0) {
                        $scope.meallistA.meal01 = data[0].Meal01;
                        $scope.meallistA.meal02 = data[0].Meal02;
                        $scope.meallistA.meal03 = data[0].Meal03;
                        $scope.meallistA.meal04 = data[0].Meal04;
                        $scope.meallistA.meal05 = data[0].Meal05;
                        $scope.meallistA.meal06 = data[0].Meal06;
                        $scope.meallistA.meal07 = data[0].Meal07;
                        $scope.meallistA.meal08 = data[0].Meal08;
                        $scope.meallistA.meal09 = data[0].Meal09;
                        $scope.meallistA.meal10 = data[0].Meal10;
                        $scope.meallistA.meal11 = data[0].Meal11;
                        $scope.meallistA.meal12 = data[0].Meal12;
                        $scope.meallistA.meal13 = data[0].Meal13;
                        $scope.meallistA.meal14 = data[0].Meal14;
                        $scope.meallistA.meal15 = data[0].Meal15;
                        $scope.meallistA.meal16 = data[0].Meal16;
                        $scope.meallistA.meal17 = data[0].Meal17;
                        $scope.meallistA.meal18 = data[0].Meal18;
                        $scope.meallistA.meal19 = data[0].Meal19;
                        $scope.meallistA.meal20 = data[0].Meal20;
                        $scope.meallistA.meal21 = data[0].Meal21;
                        $scope.meallistA.meal22 = data[0].Meal22;
                        $scope.meallistA.meal23 = data[0].Meal23;
                        $scope.meallistA.meal24 = data[0].Meal24;
                        $scope.meallistA.meal25 = data[0].Meal25;

                        var attrib05setArray = [];
                        var attrib05Array = [];
                        if ($scope.meallistA.meal12 !== null) attrib05Array = $scope.meallistA.meal12.split(",");
                        for (key in attrib05Array) {
                            attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                        }
                        $('#Meal_A_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                        var meal09Array = $scope.meallistA.meal09.split(",");
                        $('#Meal_A_Meal09').combobox('setValues', meal09Array);

                        var meal14Array = $scope.meallistA.meal14.split(",");
                        $('#Meal_A_Meal14').combobox('setValues', meal14Array);

                        var meal15Array = $scope.meallistA.meal15.split(",");
                        $('#Meal_A_Meal15').combobox('setValues', meal15Array);

                        $('#Meal_A_Meal21').combobox('setValue', $scope.meallistA.meal21);
                        $('#Meal_A_Meal22').combobox('setValue', $scope.meallistA.meal22);
                        $('#Meal_A_Meal23').combobox('setValue', $scope.meallistA.meal23);
                    } else {
                        clearScopeMemberObjA();
                        $('#Meal_A_Meal12').combotree('setValue', '');
                        $('#Meal_A_Meal09').combobox('setValue', '');
                        $('#Meal_A_Meal14').combobox('setValue', '');
                        $('#Meal_A_Meal15').combobox('setValue', '');
                        $('#Meal_A_Meal21').combobox('setValue', '');
                        $('#Meal_A_Meal22').combobox('setValue', '');
                        $('#Meal_A_Meal23').combobox('setValue', '');
                    }

                });

                var inputObj = {
                    memberid: id,
                    date: date[0],
                    mealtype: 1,
                    type: 'B'
                }
                monthMealService.show_data(inputObj, function (data) {
                    if (data.length > 0) {
                        $scope.meallistB.meal01 = data[0].Meal01;
                        $scope.meallistB.meal02 = data[0].Meal02;
                        $scope.meallistB.meal03 = data[0].Meal03;
                        $scope.meallistB.meal04 = data[0].Meal04;
                        $scope.meallistB.meal05 = data[0].Meal05;
                        $scope.meallistB.meal06 = data[0].Meal06;
                        $scope.meallistB.meal07 = data[0].Meal07;
                        $scope.meallistB.meal08 = data[0].Meal08;
                        $scope.meallistB.meal09 = data[0].Meal09;
                        $scope.meallistB.meal10 = data[0].Meal10;
                        $scope.meallistB.meal11 = data[0].Meal11;
                        $scope.meallistB.meal12 = data[0].Meal12;
                        $scope.meallistB.meal13 = data[0].Meal13;
                        $scope.meallistB.meal14 = data[0].Meal14;
                        $scope.meallistB.meal15 = data[0].Meal15;
                        $scope.meallistB.meal16 = data[0].Meal16;
                        $scope.meallistB.meal17 = data[0].Meal17;
                        $scope.meallistB.meal18 = data[0].Meal18;
                        $scope.meallistB.meal19 = data[0].Meal19;
                        $scope.meallistB.meal20 = data[0].Meal20;
                        $scope.meallistB.meal21 = data[0].Meal21;
                        $scope.meallistB.meal22 = data[0].Meal22;
                        $scope.meallistB.meal23 = data[0].Meal23;
                        $scope.meallistB.meal24 = data[0].Meal24;
                        $scope.meallistB.meal25 = data[0].Meal25;

                        var attrib05setArray = [];
                        var attrib05Array = [];
                        if ($scope.meallistB.meal12 !== null) attrib05Array = $scope.meallistB.meal12.split(",");
                        for (key in attrib05Array) {
                            attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                        }
                        $('#Meal_B_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                        var meal09Array = $scope.meallistB.meal09.split(",");
                        $('#Meal_B_Meal09').combobox('setValues', meal09Array);

                        var meal14Array = $scope.meallistB.meal14.split(",");
                        $('#Meal_B_Meal14').combobox('setValues', meal14Array);

                        var meal15Array = $scope.meallistB.meal15.split(",");
                        $('#Meal_B_Meal15').combobox('setValues', meal15Array);

                        $('#Meal_B_Meal21').combobox('setValue', $scope.meallistB.meal21);
                        $('#Meal_B_Meal22').combobox('setValue', $scope.meallistB.meal22);
                        $('#Meal_B_Meal23').combobox('setValue', $scope.meallistB.meal23);
                    } else {
                        clearScopeMemberObjB();
                        $('#Meal_B_Meal12').combotree('setValue', '');
                        $('#Meal_B_Meal09').combobox('setValue', '');
                        $('#Meal_B_Meal14').combobox('setValue', '');
                        $('#Meal_B_Meal15').combobox('setValue', '');
                        $('#Meal_B_Meal21').combobox('setValue', '');
                        $('#Meal_B_Meal22').combobox('setValue', '');
                        $('#Meal_B_Meal23').combobox('setValue', '');
                    }
                });

                var inputObj = {
                    memberid: id,
                    date: date[0],
                    mealtype: 1,
                    type: 'C'
                }
                monthMealService.show_data(inputObj, function (data) {
                    if (data.length > 0) {
                        $scope.meallistC.meal01 = data[0].Meal01;
                        $scope.meallistC.meal02 = data[0].Meal02;
                        $scope.meallistC.meal03 = data[0].Meal03;
                        $scope.meallistC.meal04 = data[0].Meal04;
                        $scope.meallistC.meal05 = data[0].Meal05;
                        $scope.meallistC.meal06 = data[0].Meal06;
                        $scope.meallistC.meal07 = data[0].Meal07;
                        $scope.meallistC.meal08 = data[0].Meal08;
                        $scope.meallistC.meal09 = data[0].Meal09;
                        $scope.meallistC.meal10 = data[0].Meal10;
                        $scope.meallistC.meal11 = data[0].Meal11;
                        $scope.meallistC.meal12 = data[0].Meal12;
                        $scope.meallistC.meal13 = data[0].Meal13;
                        $scope.meallistC.meal14 = data[0].Meal14;
                        $scope.meallistC.meal15 = data[0].Meal15;
                        $scope.meallistC.meal16 = data[0].Meal16;
                        $scope.meallistC.meal17 = data[0].Meal17;
                        $scope.meallistC.meal18 = data[0].Meal18;
                        $scope.meallistC.meal19 = data[0].Meal19;
                        $scope.meallistC.meal20 = data[0].Meal20;
                        $scope.meallistC.meal21 = data[0].Meal21;
                        $scope.meallistC.meal22 = data[0].Meal22;
                        $scope.meallistC.meal23 = data[0].Meal23;
                        $scope.meallistC.meal24 = data[0].Meal24;
                        $scope.meallistC.meal25 = data[0].Meal25;

                        var attrib05setArray = [];
                        var attrib05Array = [];
                        if ($scope.meallistC.meal12 !== null) attrib05Array = $scope.meallistC.meal12.split(",");
                        for (key in attrib05Array) {
                            attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                        }
                        $('#Meal_C_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                        var meal09Array = $scope.meallistC.meal09.split(",");
                        $('#Meal_C_Meal09').combobox('setValues', meal09Array);

                        var meal14Array = $scope.meallistC.meal14.split(",");
                        $('#Meal_C_Meal14').combobox('setValues', meal14Array);

                        var meal15Array = $scope.meallistC.meal15.split(",");
                        $('#Meal_C_Meal15').combobox('setValues', meal15Array);

                        $('#Meal_C_Meal21').combobox('setValue', $scope.meallistC.meal21);
                        $('#Meal_C_Meal22').combobox('setValue', $scope.meallistC.meal22);
                        $('#Meal_C_Meal23').combobox('setValue', $scope.meallistC.meal23);
                    } else {
                        clearScopeMemberObjC();
                        $('#Meal_C_Meal12').combotree('setValue', '');
                        $('#Meal_C_Meal09').combobox('setValue', '');
                        $('#Meal_C_Meal14').combobox('setValue', '');
                        $('#Meal_C_Meal15').combobox('setValue', '');
                        $('#Meal_C_Meal21').combobox('setValue', '');
                        $('#Meal_C_Meal22').combobox('setValue', '');
                        $('#Meal_C_Meal23').combobox('setValue', '');
                    }
                });
            }

            if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {

            } else {
                var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_A[0],
                    mealtype: 1,
                    type: 'A'
                }
                monthMealService.show_data(inputObj, function (data) {
                    // var ContentStr = "客戶編號: " + data[0].MemberID + "\n"; //要顯示的字串
                    // ContentStr += "時段: " + inputObj.date + "/早上\n";
                    // ContentStr += "月子餐資料如下:\n";
                    // ContentStr += "-----------------------------------------------------------\n";
                    // ContentStr += "床號 : " + data[0].Meal01 + "\n";
                    // ContentStr += "手機 : " + data[0].Meal02 + "\n";
                    // ContentStr += "地址 : " + data[0].Meal03 + "\n";
                    // ContentStr += "路線 : " + data[0].Meal04 + "\n";
                    // ContentStr += "全酒半酒 : " + data[0].Meal05 + "\n";
                    // ContentStr += "麻油 : " + data[0].Meal06 + "\n";
                    // ContentStr += "酒 : " + data[0].Meal07 + "\n";
                    // ContentStr += "素 : " + data[0].Meal08 + "\n";
                    // ContentStr += "餐具 : " + data[0].Meal09 + "\n";
                    // ContentStr += "加湯罐 : " + data[0].Meal10 + "\n";
                    // ContentStr += "加飲品 : " + data[0].Meal11 + "\n";
                    // ContentStr += "禁忌 : " + data[0].Meal12 + "\n";
                    // ContentStr += "特殊禁忌 : " + data[0].Meal13 + "\n";
                    // ContentStr += "加減 : " + data[0].Meal14 + "\n";
                    // ContentStr += "其它 : " + data[0].Meal15 + "\n";
                    // ContentStr += "試吃 : " + data[0].Meal25 + ", " + data[0].Meal16 + " : " + data[0].Meal17 + "\n";
                    // ContentStr += "西式早餐 : " + data[0].Meal18 + "\n";
                    // ContentStr += "現金  : " + data[0].Meal19 + ", " + data[0].Meal20 + "元\n";
                    // ContentStr += "加飲 : " + data[0].Meal21 + "\n";
                    // ContentStr += "換飲 : " + data[0].Meal22 + "\n";
                    // ContentStr += "領飲 : " + data[0].Meal23 + "\n";
                    // ContentStr += "備註 : " + data[0].Meal24 + "\n";

                    // $("#txt_Request_Search").val(ContentStr);
                    $scope.meallistA.meal01 = data[0].Meal01;
                    $scope.meallistA.meal02 = data[0].Meal02;
                    $scope.meallistA.meal03 = data[0].Meal03;
                    $scope.meallistA.meal04 = data[0].Meal04;
                    $scope.meallistA.meal05 = data[0].Meal05;
                    $scope.meallistA.meal06 = data[0].Meal06;
                    $scope.meallistA.meal07 = data[0].Meal07;
                    $scope.meallistA.meal08 = data[0].Meal08;
                    $scope.meallistA.meal09 = data[0].Meal09;
                    $scope.meallistA.meal10 = data[0].Meal10;
                    $scope.meallistA.meal11 = data[0].Meal11;
                    $scope.meallistA.meal12 = data[0].Meal12;
                    $scope.meallistA.meal13 = data[0].Meal13;
                    $scope.meallistA.meal14 = data[0].Meal14;
                    $scope.meallistA.meal15 = data[0].Meal15;
                    $scope.meallistA.meal16 = data[0].Meal16;
                    $scope.meallistA.meal17 = data[0].Meal17;
                    $scope.meallistA.meal18 = data[0].Meal18;
                    $scope.meallistA.meal19 = data[0].Meal19;
                    $scope.meallistA.meal20 = data[0].Meal20;
                    $scope.meallistA.meal21 = data[0].Meal21;
                    $scope.meallistA.meal22 = data[0].Meal22;
                    $scope.meallistA.meal23 = data[0].Meal23;
                    $scope.meallistA.meal24 = data[0].Meal24;
                    $scope.meallistA.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistA.meal12 !== null) attrib05Array = $scope.meallistA.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_A_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistA.meal09.split(",");
                    $('#Meal_A_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistA.meal14.split(",");
                    $('#Meal_A_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistA.meal15.split(",");
                    $('#Meal_A_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_A_Meal21').combobox('setValue', $scope.meallistA.meal21);
                    $('#Meal_A_Meal22').combobox('setValue', $scope.meallistA.meal22);
                    $('#Meal_A_Meal23').combobox('setValue', $scope.meallistA.meal23);
                });
            }

            if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {

            } else {
                var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_B[0],
                    mealtype: 1,
                    type: 'B'
                }
                monthMealService.show_data(inputObj, function (data) {
                    // var ContentStr = "客戶編號: " + data[0].MemberID + "\n"; //要顯示的字串
                    // ContentStr += "時段: " + inputObj.date + "/中午\n";
                    // ContentStr += "月子餐資料如下:\n";
                    // ContentStr += "-----------------------------------------------------------\n";
                    // ContentStr += "床號 : " + data[0].Meal01 + "\n";
                    // ContentStr += "手機 : " + data[0].Meal02 + "\n";
                    // ContentStr += "地址 : " + data[0].Meal03 + "\n";
                    // ContentStr += "路線 : " + data[0].Meal04 + "\n";
                    // ContentStr += "全酒半酒 : " + data[0].Meal05 + "\n";
                    // ContentStr += "麻油 : " + data[0].Meal06 + "\n";
                    // ContentStr += "酒 : " + data[0].Meal07 + "\n";
                    // ContentStr += "素 : " + data[0].Meal08 + "\n";
                    // ContentStr += "餐具 : " + data[0].Meal09 + "\n";
                    // ContentStr += "加湯罐 : " + data[0].Meal10 + "\n";
                    // ContentStr += "加飲品 : " + data[0].Meal11 + "\n";
                    // ContentStr += "禁忌 : " + data[0].Meal12 + "\n";
                    // ContentStr += "特殊禁忌 : " + data[0].Meal13 + "\n";
                    // ContentStr += "加減 : " + data[0].Meal14 + "\n";
                    // ContentStr += "其它 : " + data[0].Meal15 + "\n";
                    // ContentStr += "試吃 : " + data[0].Meal25 + ", " + data[0].Meal16 + " : " + data[0].Meal17 + "\n";
                    // ContentStr += "西式早餐 : " + data[0].Meal18 + "\n";
                    // ContentStr += "現金  : " + data[0].Meal19 + ", " + data[0].Meal20 + "元\n";
                    // ContentStr += "加飲 : " + data[0].Meal21 + "\n";
                    // ContentStr += "換飲 : " + data[0].Meal22 + "\n";
                    // ContentStr += "領飲 : " + data[0].Meal23 + "\n";
                    // ContentStr += "備註 : " + data[0].Meal24 + "\n";

                    // $("#txt_Request_Search").val(ContentStr);
                    $scope.meallistB.meal01 = data[0].Meal01;
                    $scope.meallistB.meal02 = data[0].Meal02;
                    $scope.meallistB.meal03 = data[0].Meal03;
                    $scope.meallistB.meal04 = data[0].Meal04;
                    $scope.meallistB.meal05 = data[0].Meal05;
                    $scope.meallistB.meal06 = data[0].Meal06;
                    $scope.meallistB.meal07 = data[0].Meal07;
                    $scope.meallistB.meal08 = data[0].Meal08;
                    $scope.meallistB.meal09 = data[0].Meal09;
                    $scope.meallistB.meal10 = data[0].Meal10;
                    $scope.meallistB.meal11 = data[0].Meal11;
                    $scope.meallistB.meal12 = data[0].Meal12;
                    $scope.meallistB.meal13 = data[0].Meal13;
                    $scope.meallistB.meal14 = data[0].Meal14;
                    $scope.meallistB.meal15 = data[0].Meal15;
                    $scope.meallistB.meal16 = data[0].Meal16;
                    $scope.meallistB.meal17 = data[0].Meal17;
                    $scope.meallistB.meal18 = data[0].Meal18;
                    $scope.meallistB.meal19 = data[0].Meal19;
                    $scope.meallistB.meal20 = data[0].Meal20;
                    $scope.meallistB.meal21 = data[0].Meal21;
                    $scope.meallistB.meal22 = data[0].Meal22;
                    $scope.meallistB.meal23 = data[0].Meal23;
                    $scope.meallistB.meal24 = data[0].Meal24;
                    $scope.meallistB.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistB.meal12 !== null) attrib05Array = $scope.meallistB.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_B_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistB.meal09.split(",");
                    $('#Meal_B_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistB.meal14.split(",");
                    $('#Meal_B_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistB.meal15.split(",");
                    $('#Meal_B_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_B_Meal21').combobox('setValue', $scope.meallistB.meal21);
                    $('#Meal_B_Meal22').combobox('setValue', $scope.meallistB.meal22);
                    $('#Meal_B_Meal23').combobox('setValue', $scope.meallistB.meal23);
                });
            }

            if (month_calendar_night.multiDatesPicker('getDates').length === 0) {

            } else {
                var dates_C = month_calendar_night.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_C[0],
                    mealtype: 1,
                    type: 'C'
                }

                monthMealService.show_data(inputObj, function (data) {
                    // var ContentStr = "客戶編號: " + data[0].MemberID + "\n"; //要顯示的字串
                    // ContentStr += "時段: " + inputObj.date + "/晚上\n";
                    // ContentStr += "月子餐資料如下:\n";
                    // ContentStr += "-----------------------------------------------------------\n";
                    // ContentStr += "床號 : " + data[0].Meal01 + "\n";
                    // ContentStr += "手機 : " + data[0].Meal02 + "\n";
                    // ContentStr += "地址 : " + data[0].Meal03 + "\n";
                    // ContentStr += "路線 : " + data[0].Meal04 + "\n";
                    // ContentStr += "全酒半酒 : " + data[0].Meal05 + "\n";
                    // ContentStr += "麻油 : " + data[0].Meal06 + "\n";
                    // ContentStr += "酒 : " + data[0].Meal07 + "\n";
                    // ContentStr += "素 : " + data[0].Meal08 + "\n";
                    // ContentStr += "餐具 : " + data[0].Meal09 + "\n";
                    // ContentStr += "加湯罐 : " + data[0].Meal10 + "\n";
                    // ContentStr += "加飲品 : " + data[0].Meal11 + "\n";
                    // ContentStr += "禁忌 : " + data[0].Meal12 + "\n";
                    // ContentStr += "特殊禁忌 : " + data[0].Meal13 + "\n";
                    // ContentStr += "加減 : " + data[0].Meal14 + "\n";
                    // ContentStr += "其它 : " + data[0].Meal15 + "\n";
                    // ContentStr += "試吃 : " + data[0].Meal25 + ", " + data[0].Meal16 + " : " + data[0].Meal17 + "\n";
                    // ContentStr += "西式早餐 : " + data[0].Meal18 + "\n";
                    // ContentStr += "現金  : " + data[0].Meal19 + ", " + data[0].Meal20 + "元\n";
                    // ContentStr += "加飲 : " + data[0].Meal21 + "\n";
                    // ContentStr += "換飲 : " + data[0].Meal22 + "\n";
                    // ContentStr += "領飲 : " + data[0].Meal23 + "\n";
                    // ContentStr += "備註 : " + data[0].Meal24 + "\n";

                    // $("#txt_Request_Search").val(ContentStr);
                    $scope.meallistC.meal01 = data[0].Meal01;
                    $scope.meallistC.meal02 = data[0].Meal02;
                    $scope.meallistC.meal03 = data[0].Meal03;
                    $scope.meallistC.meal04 = data[0].Meal04;
                    $scope.meallistC.meal05 = data[0].Meal05;
                    $scope.meallistC.meal06 = data[0].Meal06;
                    $scope.meallistC.meal07 = data[0].Meal07;
                    $scope.meallistC.meal08 = data[0].Meal08;
                    $scope.meallistC.meal09 = data[0].Meal09;
                    $scope.meallistC.meal10 = data[0].Meal10;
                    $scope.meallistC.meal11 = data[0].Meal11;
                    $scope.meallistC.meal12 = data[0].Meal12;
                    $scope.meallistC.meal13 = data[0].Meal13;
                    $scope.meallistC.meal14 = data[0].Meal14;
                    $scope.meallistC.meal15 = data[0].Meal15;
                    $scope.meallistC.meal16 = data[0].Meal16;
                    $scope.meallistC.meal17 = data[0].Meal17;
                    $scope.meallistC.meal18 = data[0].Meal18;
                    $scope.meallistC.meal19 = data[0].Meal19;
                    $scope.meallistC.meal20 = data[0].Meal20;
                    $scope.meallistC.meal21 = data[0].Meal21;
                    $scope.meallistC.meal22 = data[0].Meal22;
                    $scope.meallistC.meal23 = data[0].Meal23;
                    $scope.meallistC.meal24 = data[0].Meal24;
                    $scope.meallistC.meal25 = data[0].Meal25;

                    var attrib05setArray = [];
                    var attrib05Array = [];
                    if ($scope.meallistC.meal12 !== null) attrib05Array = $scope.meallistC.meal12.split(",");
                    for (key in attrib05Array) {
                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    }
                    $('#Meal_C_Meal12').combotree('setValue', attrib05setArray);    //早餐禁忌

                    var meal09Array = $scope.meallistC.meal09.split(",");
                    $('#Meal_C_Meal09').combobox('setValues', meal09Array);

                    var meal14Array = $scope.meallistC.meal14.split(",");
                    $('#Meal_C_Meal14').combobox('setValues', meal14Array);

                    var meal15Array = $scope.meallistC.meal15.split(",");
                    $('#Meal_C_Meal15').combobox('setValues', meal15Array);

                    $('#Meal_C_Meal21').combobox('setValue', $scope.meallistC.meal21);
                    $('#Meal_C_Meal22').combobox('setValue', $scope.meallistC.meal22);
                    $('#Meal_C_Meal23').combobox('setValue', $scope.meallistC.meal23);
                });
            }
        }
    };

    //修改覆蓋按鈕觸發事件
    $scope.edit_overwrite = function () {
        if (month_calendar_morning.multiDatesPicker('getDates').length === 0 && month_calendar_noon.multiDatesPicker('getDates').length === 0 && month_calendar_night.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可修改!');
        } else {

            if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");

                //easy-ui conboxbox值設定
                $scope.meallistA.meal09 = $('#Meal_A_Meal09').val();
                $scope.meallistA.meal12 = $('#Meal_A_Meal12').val();
                $scope.meallistA.meal14 = $('#Meal_A_Meal14').val();
                $scope.meallistA.meal15 = $('#Meal_A_Meal15').val();
                $scope.meallistA.meal21 = $('#Meal_A_Meal21').val();
                $scope.meallistA.meal22 = $('#Meal_A_Meal22').val();
                $scope.meallistA.meal23 = $('#Meal_A_Meal23').val();
                $scope.meallistA.meal23 = $('#Meal_A_Meal23').val();

                var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                for (let key in dates_A) {
                    let edit_join_data = {
                        memberid: id,
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
                        meal25: $scope.meallistA.meal25
                    }
                    monthMealService.edit_overwrite_Meal(edit_join_data, function (data) {
                        initial();
                        if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                    });
                }
            }

            if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");

                //easy-ui conboxbox值設定
                $scope.meallistB.meal09 = $('#Meal_B_Meal09').val();
                $scope.meallistB.meal12 = $('#Meal_B_Meal12').val();
                $scope.meallistB.meal14 = $('#Meal_B_Meal14').val();
                $scope.meallistB.meal15 = $('#Meal_B_Meal15').val();
                $scope.meallistB.meal21 = $('#Meal_B_Meal21').val();
                $scope.meallistB.meal22 = $('#Meal_B_Meal22').val();
                $scope.meallistB.meal23 = $('#Meal_B_Meal23').val();
                $scope.meallistB.meal23 = $('#Meal_B_Meal23').val();

                var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                for (let key in dates_B) {

                    let edit_join_data = {
                        memberid: id,
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
                        meal25: $scope.meallistB.meal25
                    }
                    monthMealService.edit_overwrite_Meal(edit_join_data, function (data) {
                        initial();
                        if (key == dates_B.length - 1) $.LoadingOverlay("hide");
                    });
                }
            }

            if (month_calendar_night.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                //easy-ui conboxbox值設定
                $scope.meallistC.meal09 = $('#Meal_C_Meal09').val();
                $scope.meallistC.meal12 = $('#Meal_C_Meal12').val();
                $scope.meallistC.meal14 = $('#Meal_C_Meal14').val();
                $scope.meallistC.meal15 = $('#Meal_C_Meal15').val();
                $scope.meallistC.meal21 = $('#Meal_C_Meal21').val();
                $scope.meallistC.meal22 = $('#Meal_C_Meal22').val();
                $scope.meallistC.meal23 = $('#Meal_C_Meal23').val();
                $scope.meallistC.meal23 = $('#Meal_C_Meal23').val();

                var dates_C = month_calendar_night.multiDatesPicker('getDates');
                for (let key in dates_C) {

                    let edit_join_data = {
                        memberid: id,
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
                        meal25: $scope.meallistC.meal25
                    }
                    monthMealService.edit_overwrite_Meal(edit_join_data, function (data) {
                        initial();
                        if (key == dates_C.length - 1) $.LoadingOverlay("hide");
                    });
                }
            }
        }
    };

    //修改加入按鈕觸發事件
    $scope.edit_join = function () {
        if (month_calendar_morning.multiDatesPicker('getDates').length === 0 && month_calendar_noon.multiDatesPicker('getDates').length === 0 && month_calendar_night.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可修改!');
        } else {

            if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                //easy-ui conboxbox值設定
                $scope.meallistA.meal09 = $('#S_Meal_A_Meal09').val();
                $scope.meallistA.meal12 = $('#S_Meal_A_Meal12').val();
                $scope.meallistA.meal14 = $('#S_Meal_A_Meal14').val();
                $scope.meallistA.meal15 = $('#S_Meal_A_Meal15').val();
                $scope.meallistA.meal21 = $('#S_Meal_A_Meal21').val();
                $scope.meallistA.meal22 = $('#S_Meal_A_Meal22').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();

                var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_A[0],
                    mealtype: 1,
                    type: 'A'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var editJoin_meal09 = data[0].Meal09.split(',');
                    var editJoin_meal12 = data[0].Meal12.split(',');
                    var editJoin_meal14 = data[0].Meal14.split(',');
                    var editJoin_meal15 = data[0].Meal15.split(',');

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal09, deleteArray[key])) {
                                editJoin_meal09.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal09 = editJoin_meal09.join(',');
                    }
                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal12, deleteArray[key])) {
                                editJoin_meal12.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal12 = editJoin_meal12.join(',');
                    }
                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal14, deleteArray[key])) {
                                editJoin_meal14.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal14 = editJoin_meal14.join(',');
                    }
                    if ($('#S_Meal_A_Meal15').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal15, deleteArray[key])) {
                                editJoin_meal15.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal15 = editJoin_meal15.join(',');
                    }

                    var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                    for (let key in dates_A) {

                        let edit_join_data = {
                            memberid: id,
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
                            meal25: $scope.meallistA.meal25
                        }
                        monthMealService.edit_join_Meal(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                                $.LoadingOverlay("hide");
                            } else {
                                initial();
                                if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                            }
                        });
                    }
                });
            }

            if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                //easy-ui conboxbox值設定
                $scope.meallistA.meal09 = $('#S_Meal_A_Meal09').val();
                $scope.meallistA.meal12 = $('#S_Meal_A_Meal12').val();
                $scope.meallistA.meal14 = $('#S_Meal_A_Meal14').val();
                $scope.meallistA.meal15 = $('#S_Meal_A_Meal15').val();
                $scope.meallistA.meal21 = $('#S_Meal_A_Meal21').val();
                $scope.meallistA.meal22 = $('#S_Meal_A_Meal22').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();

                var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_B[0],
                    mealtype: 1,
                    type: 'B'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var editJoin_meal09 = data[0].Meal09.split(',');
                    var editJoin_meal12 = data[0].Meal12.split(',');
                    var editJoin_meal14 = data[0].Meal14.split(',');
                    var editJoin_meal15 = data[0].Meal15.split(',');

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal09, deleteArray[key])) {
                                editJoin_meal09.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal09 = editJoin_meal09.join(',');
                    }
                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal12, deleteArray[key])) {
                                editJoin_meal12.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal12 = editJoin_meal12.join(',');
                    }
                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal14, deleteArray[key])) {
                                editJoin_meal14.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal14 = editJoin_meal14.join(',');
                    }
                    if ($('#S_Meal_A_Meal015').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal15, deleteArray[key])) {
                                editJoin_meal15.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal15 = editJoin_meal15.join(',');
                    }

                    var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                    for (let key in dates_B) {

                        let edit_join_data = {
                            memberid: id,
                            date: dates_B[key],
                            mealtype: 1,
                            type: 'B',
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
                            meal25: $scope.meallistA.meal25
                        }
                        monthMealService.edit_join_Meal(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                                $.LoadingOverlay("hide");
                            } else {
                                initial();
                                if (key == dates_B.length - 1) $.LoadingOverlay("hide");
                            }
                        });
                    }
                });
            }

            if (month_calendar_night.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                //easy-ui conboxbox值設定
                $scope.meallistA.meal09 = $('#S_Meal_A_Meal09').val();
                $scope.meallistA.meal12 = $('#S_Meal_A_Meal12').val();
                $scope.meallistA.meal14 = $('#S_Meal_A_Meal14').val();
                $scope.meallistA.meal15 = $('#S_Meal_A_Meal15').val();
                $scope.meallistA.meal21 = $('#S_Meal_A_Meal21').val();
                $scope.meallistA.meal22 = $('#S_Meal_A_Meal22').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();
                $scope.meallistA.meal23 = $('#S_Meal_A_Meal23').val();

                var dates_C = month_calendar_night.multiDatesPicker('getDates');
                var inputObj = {
                    memberid: id,
                    date: dates_C[0],
                    mealtype: 1,
                    type: 'C'
                }
                monthMealService.show_data(inputObj, function (data) {
                    var editJoin_meal09 = data[0].Meal09.split(',');
                    var editJoin_meal12 = data[0].Meal12.split(',');
                    var editJoin_meal14 = data[0].Meal14.split(',');
                    var editJoin_meal15 = data[0].Meal15.split(',');

                    if ($('#S_Meal_A_Meal09').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal09').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal09, deleteArray[key])) {
                                editJoin_meal09.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal09 = editJoin_meal09.join(',');
                    }
                    if ($('#S_Meal_A_Meal12').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal12').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal12, deleteArray[key])) {
                                editJoin_meal12.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal12 = editJoin_meal12.join(',');
                    }
                    if ($('#S_Meal_A_Meal14').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal14').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal14, deleteArray[key])) {
                                editJoin_meal14.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal14 = editJoin_meal14.join(',');
                    }
                    if ($('#S_Meal_A_Meal15').val() != '') {
                        var deleteArray = $('#S_Meal_A_Meal15').val().split(',');
                        for (let key in deleteArray) {
                            if (!editJoin_check(editJoin_meal15, deleteArray[key])) {
                                editJoin_meal15.push(deleteArray[key]);
                            } else {
                                //原本陣列內有相同的就不做加入
                            }
                        }
                        $scope.meallistA.meal15 = editJoin_meal15.join(',');
                    }

                    var dates_C = month_calendar_night.multiDatesPicker('getDates');
                    for (let key in dates_C) {

                        let edit_join_data = {
                            memberid: id,
                            date: dates_C[key],
                            mealtype: 1,
                            type: 'C',
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
                            meal25: $scope.meallistA.meal25
                        }
                        monthMealService.edit_join_Meal(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                                $.LoadingOverlay("hide");
                            } else {
                                initial();
                                if (key == dates_C.length - 1) $.LoadingOverlay("hide");
                            }
                        });
                    }
                });
            }
        }
    };

    //刪除按鈕觸發事件
    $scope.delete = function () {
        if (month_calendar_morning.multiDatesPicker('getDates').length === 0 && month_calendar_noon.multiDatesPicker('getDates').length === 0 && month_calendar_night.multiDatesPicker('getDates').length === 0) {
            alert('請至少勾選一個日期才可刪除!');
        } else {
            if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                var meal1ac_string = ";"

                for (let key in dates_A) {
                    let delete_data = {
                        id: sessionStorage.memberid,
                        date: dates_A[key]
                    }
                    monthMealService.S_deleteMeal_A(delete_data, function (data) {
                        initial();
                        if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                    });
                }

                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                var meal1ac_initial_array = meal1ac_initial.split(";");     //依照;來切
                // console.log(meal1ac_initial_array);

                var dates = month_calendar_morning.multiDatesPicker('getDates');
                // console.log(dates);
                var set1 = new Set(meal1ac_initial_array);
                var set2 = new Set(dates);

                var subset = [];

                for (let item of set1) {
                    if (!set2.has(item)) {
                        subset.push(item);
                    }
                }
                // console.log(subset);

                if (subset.length === 0) {
                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1ac: null
                    }
                    monthMealService.S_putMeal_A(inputObj, function (data) {
                        initial();
                    });
                } else {
                    for (key in subset) {
                        meal1ac_string += subset[key] + ";";
                    }

                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1ac: meal1ac_string
                    }
                    monthMealService.S_putMeal_A(inputObj, function (data) {
                        initial();
                    });
                }
            }

            if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                var meal1bc_string = ";"

                for (let key in dates_B) {
                    let delete_data = {
                        id: sessionStorage.memberid,
                        date: dates_B[key]
                    }
                    monthMealService.S_deleteMeal_B(delete_data, function (data) {
                        initial();
                        if (key == dates_B.length - 1) $.LoadingOverlay("hide")
                    });
                }

                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
                // console.log(meal1ac_initial_array);

                var dates = month_calendar_noon.multiDatesPicker('getDates');
                // console.log(dates);
                var set1 = new Set(meal1bc_initial_array);
                var set2 = new Set(dates);

                var subset = [];

                for (let item of set1) {
                    if (!set2.has(item)) {
                        subset.push(item);
                    }
                }
                // console.log(subset);

                if (subset.length === 0) {
                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1bc: null
                    }
                    monthMealService.S_putMeal_B(inputObj, function (data) {
                        initial();
                    });
                } else {
                    for (key in subset) {
                        meal1bc_string += subset[key] + ";";
                    }

                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1bc: meal1bc_string
                    }
                    monthMealService.S_putMeal_B(inputObj, function (data) {
                        initial();
                    });
                }
            }

            if (month_calendar_night.multiDatesPicker('getDates').length === 0) {

            } else {
                $.LoadingOverlay("show");
                var dates_C = month_calendar_night.multiDatesPicker('getDates');
                var meal1cc_string = ";"

                for (let key in dates_C) {
                    let delete_data = {
                        id: sessionStorage.memberid,
                        date: dates_C[key]
                    }
                    monthMealService.S_deleteMeal_C(delete_data, function (data) {
                        initial();
                        if (key == dates_C.length - 1) $.LoadingOverlay("hide");
                    });
                }

                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
                // console.log(meal1ac_initial_array);

                var dates = month_calendar_night.multiDatesPicker('getDates');
                // console.log(dates);
                var set1 = new Set(meal1cc_initial_array);
                var set2 = new Set(dates);

                var subset = [];

                for (let item of set1) {
                    if (!set2.has(item)) {
                        subset.push(item);
                    }
                }
                // console.log(subset);

                if (subset.length === 0) {
                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1cc: null
                    }
                    monthMealService.S_putMeal_C(inputObj, function (data) {
                        initial();
                    });
                } else {
                    for (key in subset) {
                        meal1cc_string += subset[key] + ";";
                    }

                    let inputObj = {
                        id: sessionStorage.memberid,
                        mea1cc: meal1cc_string
                    }
                    monthMealService.S_putMeal_C(inputObj, function (data) {
                        initial();
                    });
                }
            }
        }
    };

    //新增按鈕觸發事件
    $scope.new = function () {

        if (!DifferenceSet_A() && !DifferenceSet_B() && !DifferenceSet_C()) {
            alert('請至少勾選一個日期才可新增!');
        } else {
            //判斷勾選的時段(早午晚)
            if (DifferenceSet_A()) {
                $.LoadingOverlay("show");
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
                        mid: sessionStorage.userId,
                        mip: $scope.meallistA.mip,
                        mid2: sessionStorage.userId,
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
                        if (key == dates_A.length - 1) $.LoadingOverlay("hide");
                    });
                }
            } else {

            }

            //判斷勾選的時段(早午晚)
            if (DifferenceSet_B()) {
                $.LoadingOverlay("show");
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
                        mid: sessionStorage.userId,
                        mip: $scope.meallistB.mip,
                        mid2: sessionStorage.userId,
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
                        if (key == dates_B.length - 1) $.LoadingOverlay("hide");
                    });
                }
            } else {

            }

            if (DifferenceSet_C()) {
                $.LoadingOverlay("show");
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
                        mid: sessionStorage.userId,
                        mip: $scope.meallistC.mip,
                        mid2: sessionStorage.userId,
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
                        if (key == dates_C.length - 1) $.LoadingOverlay("hide");
                    });
                }
            } else {

            }
        }
    };


    /**---------------------------------------function zone start------------------------------------------*/
    function initial() {
        clearScopeMemberObj();

        if (sessionStorage.loginType === '0' || sessionStorage.loginType === '1') {
            $scope.loginTypeReadonly = false;   //最高權限或管理人員可以新增或刪除
        } else {
            $scope.loginTypeReadonly = true;    //寫單人員或營養師不行新增或刪除
        }

        //判斷以防使用者用瀏覽器上下頁，沒選的話就跳回首頁
        if (sessionStorage.memberid === 'null' || sessionStorage.memberid === undefined) {
            alert('請點選會員才能進入此頁面!');
            location.href = '/#/memberData';
        } else {
            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker('destroy');
            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker('destroy');
            month_calendar_night = $('#month_calendar_night').multiDatesPicker('destroy');
            month_calendar = $('#month_calendar').multiDatesPicker('destroy');
            switch (Edit_Type) {

                // 新增按鈕
                case '1':
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
                    month_calendar = $('#month_calendar').multiDatesPicker({
                        dateFormat: "yy-mm-dd"
                    });

                    /** Meal 早 easy UI */
                    $('#Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 中午 easy UI */
                    $('#Meal_B_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 晚 easy UI */
                    $('#Meal_C_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
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
                        $scope.ChkAddress_onChange();
                        //(禁忌)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                        var attrib05setArray = [];
                        var attrib05Array = [];
                        if ($scope.meal.attrib05 !== null) attrib05Array = $scope.meal.attrib05.split(",");
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
                                $scope.MealXARemain = - meal1ac_initial_array.length; //剩餘參數塞值
                                if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = - meal1ac_initial_array.length + $scope.mealForMember.meal1a;
                                month_calendar_morning.multiDatesPicker('addDates', meal1ac_initial_array); //將選取日期值塞入
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({ addDisabledDates: meal1ac_initial_array });     //選取後的日期不能使用        
                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                $scope.MealXARemain = 0; //剩餘參數塞值
                                if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = 0 + $scope.mealForMember.meal1a;
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            $scope.MealXARemain = 0; //剩餘參數塞值
                            if ($scope.mealForMember.meal1a !== null) $scope.MealXARemain = 0 + $scope.mealForMember.meal1a;
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
                                $scope.MealXBRemain = - meal1bc_initial_array.length; //剩餘參數塞值
                                if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = - meal1bc_initial_array.length + $scope.mealForMember.meal1b;
                                month_calendar_noon.multiDatesPicker('addDates', meal1bc_initial_array);    //將選取日期值塞入
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({ addDisabledDates: meal1bc_initial_array });    //選取後的日期不能使用
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                $scope.MealXBRemain = 0; //剩餘參數塞值
                                if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = 0 + $scope.mealForMember.meal1b;
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            $scope.MealXBRemain = 0; //剩餘參數塞值
                            if ($scope.mealForMember.meal1b !== null) $scope.MealXBRemain = 0 + $scope.mealForMember.meal1b;
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
                                $scope.MealXCRemain = - meal1cc_initial_array.length; //剩餘參數塞值
                                if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = - meal1cc_initial_array.length + $scope.mealForMember.meal1c;
                                month_calendar_night.multiDatesPicker('addDates', meal1cc_initial_array);   //將選取日期值塞入
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({ addDisabledDates: meal1cc_initial_array });  //選取後的日期不能使用
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                $scope.MealXCRemain = 0; //剩餘參數塞值
                                if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = 0 + $scope.mealForMember.meal1c;
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            $scope.MealXCRemain = 0; //剩餘參數塞值
                            if ($scope.mealForMember.meal1c !== null) $scope.MealXCRemain = 0 + $scope.mealForMember.meal1c;
                        }
                    });
                    break;

                // 刪除按鈕
                case '2':

                    function enableAllTheseDays_A(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_A) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_B(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_B) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_C(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_C) != -1) {
                            return [true];
                        }
                        return [false];
                    }

                    /** Meal 早 easy UI */
                    $('#S_Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
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

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal1ac != null) {
                            if ($scope.mealForMember.meal1ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal1ac_initial.split(";");     //依照;來切
                                //日歷easyui初始化
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });

                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                enableDays_A = [];
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            enableDays_A = [];
                            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_A
                            });
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal1bc_initial.split(";");     //依照;來切
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                enableDays_B = [];
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            enableDays_B = [];
                            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_B
                            });
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal1cc_initial.split(";");     //依照;來切
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                enableDays_C = [];
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            enableDays_C = [];
                            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_C
                            });
                        }
                    });
                    break;

                // 修改加入按鈕
                case '3':

                    function enableAllTheseDays_A(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_A) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_B(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_B) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_C(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_C) != -1) {
                            return [true];
                        }
                        return [false];
                    }

                    /** Meal 早 easy UI */
                    $('#S_Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        // $scope.meal.attrib05 = data[0].Attrib05;
                        // $scope.meal.user = data[0].User;
                        // $scope.meal.attrib14 = data[0].Attrib14;
                        // $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal1sicktype = data[0].Meal1SickType;
                        $scope.mealForMember.meal1a = data[0].Meal1A;
                        $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
                        $scope.mealForMember.meal1b = data[0].Meal1B;
                        $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
                        $scope.mealForMember.meal1c = data[0].Meal1C;
                        $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal1ac != null) {
                            if ($scope.mealForMember.meal1ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal1ac_initial.split(";");     //依照;來切
                                //日歷easyui初始化
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });

                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                enableDays_A = [];
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            enableDays_A = [];
                            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_A
                            });
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal1bc_initial.split(";");     //依照;來切
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                enableDays_B = [];
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            enableDays_B = [];
                            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_B
                            });
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal1cc_initial.split(";");     //依照;來切
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                enableDays_C = [];
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            enableDays_C = [];
                            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_C
                            });
                        }
                    });
                    break;

                // 修改覆蓋按鈕
                case '5':

                    function enableAllTheseDays_A(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_A) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_B(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_B) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_C(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_C) != -1) {
                            return [true];
                        }
                        return [false];
                    }

                    $('#month_calendar').multiDatesPicker('resetDates');
                    $('#month_calendar').multiDatesPicker('resetDates', 'disabled');
                    month_calendar = $('#month_calendar').multiDatesPicker({
                        dateFormat: "yy-mm-dd",
                        maxPicks: 1
                    });

                    /** Meal 早 easy UI */
                    $('#Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 中午 easy UI */
                    $('#Meal_B_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 晚 easy UI */
                    $('#Meal_C_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        // $scope.meal.attrib05 = data[0].Attrib05;
                        // $scope.meal.user = data[0].User;
                        // $scope.meal.attrib14 = data[0].Attrib14;
                        // $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal1sicktype = data[0].Meal1SickType;
                        $scope.mealForMember.meal1a = data[0].Meal1A;
                        $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
                        $scope.mealForMember.meal1b = data[0].Meal1B;
                        $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
                        $scope.mealForMember.meal1c = data[0].Meal1C;
                        $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal1ac != null) {
                            if ($scope.mealForMember.meal1ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal1ac_initial.split(";");     //依照;來切
                                //日歷easyui初始化
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });

                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                enableDays_A = [];
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            enableDays_A = [];
                            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_A
                            });
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal1bc_initial.split(";");     //依照;來切
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                enableDays_B = [];
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            enableDays_B = [];
                            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_B
                            });
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal1cc_initial.split(";");     //依照;來切
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                enableDays_C = [];
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            enableDays_C = [];
                            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_C
                            });
                        }
                    });
                    break;

                // 查看輸入資料按鈕
                case '4':

                    function enableAllTheseDays_A(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_A) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_B(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_B) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_C(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_C) != -1) {
                            return [true];
                        }
                        return [false];
                    }

                    $('#month_calendar').multiDatesPicker('resetDates');
                    $('#month_calendar').multiDatesPicker('resetDates', 'disabled');
                    month_calendar = $('#month_calendar').multiDatesPicker({
                        dateFormat: "yy-mm-dd",
                        maxPicks: 1
                    });

                    /** Meal 早 easy UI */
                    $('#Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 中午 easy UI */
                    $('#Meal_B_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_B_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    /** Meal 晚 easy UI */
                    $('#Meal_C_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#Meal_C_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        // $scope.meal.attrib05 = data[0].Attrib05;
                        // $scope.meal.user = data[0].User;
                        // $scope.meal.attrib14 = data[0].Attrib14;
                        // $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal1sicktype = data[0].Meal1SickType;
                        $scope.mealForMember.meal1a = data[0].Meal1A;
                        $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
                        $scope.mealForMember.meal1b = data[0].Meal1B;
                        $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
                        $scope.mealForMember.meal1c = data[0].Meal1C;
                        $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal1ac != null) {
                            if ($scope.mealForMember.meal1ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal1ac_initial.split(";");     //依照;來切
                                //日歷easyui初始化
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_A
                                });

                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                enableDays_A = [];
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_A
                                });
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            enableDays_A = [];
                            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                maxPicks: 1,
                                beforeShowDay: enableAllTheseDays_A
                            });
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal1bc_initial.split(";");     //依照;來切
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                enableDays_B = [];
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            enableDays_B = [];
                            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                maxPicks: 1,
                                beforeShowDay: enableAllTheseDays_B
                            });
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal1cc_initial.split(";");     //依照;來切
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                enableDays_C = [];
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    maxPicks: 1,
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            enableDays_C = [];
                            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                maxPicks: 1,
                                beforeShowDay: enableAllTheseDays_C
                            });
                        }
                    });
                    break;

                // 修改取消按鈕
                case '6':

                    function enableAllTheseDays_A(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_A) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_B(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_B) != -1) {
                            return [true];
                        }
                        return [false];
                    }
                    function enableAllTheseDays_C(date) {
                        var sdate = $.datepicker.formatDate('yy-mm-dd', date)
                        if ($.inArray(sdate, enableDays_C) != -1) {
                            return [true];
                        }
                        return [false];
                    }

                    /** Meal 早 easy UI */
                    $('#S_Meal_A_Meal09').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueDishList',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal14').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal14',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal15').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal15',
                        method: 'get',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal21').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'get',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal22').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'post',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal23').combobox({
                        url: $rootScope.apiUrl + 'fieldvalueMeal21',
                        method: 'put',
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                    });

                    $('#S_Meal_A_Meal12').combotree({
                        url: $rootScope.apiUrl + 'fieldvalueAttrib05',
                        multiple: true,
                        cascadeCheck:'',
                        valueField: 'id',
                        textField: 'text'
                    });

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        // $scope.meal.attrib05 = data[0].Attrib05;
                        // $scope.meal.user = data[0].User;
                        // $scope.meal.attrib14 = data[0].Attrib14;
                        // $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal1sicktype = data[0].Meal1SickType;
                        $scope.mealForMember.meal1a = data[0].Meal1A;
                        $scope.mealForMember.meal1ac = data[0].Meal1AC;     //早日期
                        $scope.mealForMember.meal1b = data[0].Meal1B;
                        $scope.mealForMember.meal1bc = data[0].Meal1BC;     //午日期
                        $scope.mealForMember.meal1c = data[0].Meal1C;
                        $scope.mealForMember.meal1cc = data[0].Meal1CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal1ac != null) {
                            if ($scope.mealForMember.meal1ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal1ac_initial = $scope.mealForMember.meal1ac.substring(1, $scope.mealForMember.meal1ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal1ac_initial.split(";");     //依照;來切
                                //日歷easyui初始化
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });

                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                enableDays_A = [];
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_A
                                });
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            enableDays_A = [];
                            month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_A
                            });
                        }
                        if ($scope.mealForMember.meal1bc != null) {
                            if ($scope.mealForMember.meal1bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal1bc_initial.split(";");     //依照;來切
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                enableDays_B = [];
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_B
                                });
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            enableDays_B = [];
                            month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_B
                            });
                        }
                        if ($scope.mealForMember.meal1cc != null) {
                            if ($scope.mealForMember.meal1cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal1cc_initial.split(";");     //依照;來切
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                enableDays_C = [];
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                    dateFormat: "yy-mm-dd",
                                    beforeShowDay: enableAllTheseDays_C
                                });
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            enableDays_C = [];
                            month_calendar_night = $('#month_calendar_night').multiDatesPicker({
                                dateFormat: "yy-mm-dd",
                                beforeShowDay: enableAllTheseDays_C
                            });
                        }
                    });
                    break;

            }

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

    function clearScopeMemberObjA() {
        //用迴圈將所有值設為null
        for (var p in $scope.meallistA) {
            if ($scope.meallistA.hasOwnProperty(p)) {
                $scope.meallistA[p] = ' ';
            }
        }
        $scope.meallistA.flag = 9;
        $scope.meallistA.type = 'A';
        $scope.meallistA.mealtype = 1;
    }

    function clearScopeMemberObjB() {
        //用迴圈將所有值設為null
        for (var p in $scope.meallistB) {
            if ($scope.meallistB.hasOwnProperty(p)) {
                $scope.meallistB[p] = ' ';
            }
        }
        $scope.meallistB.flag = 9;
        $scope.meallistB.type = 'B';
        $scope.meallistB.mealtype = 1;
    }

    function clearScopeMemberObjC() {
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

    //觀測radio button選取的選項(編輯模式)
    $scope.onChange = function () {
        Edit_Type = $('[name="Edit_Type"]:checked').val();
        if (Edit_Type === '1') {
            document.getElementById("a_Link_Save_1").disabled = false;
            document.getElementById("a_Link_Save_2").disabled = true;
            document.getElementById("a_Link_Save_3").disabled = true;
            document.getElementById("a_Link_Save_4").disabled = true;
            document.getElementById("a_Link_Save_5").disabled = true;
            document.getElementById("a_Link_Save_6").disabled = true;
            setTimeout(initial, 0);
        } else if (Edit_Type === '2') {
            document.getElementById("a_Link_Save_1").disabled = true;
            document.getElementById("a_Link_Save_2").disabled = false;
            document.getElementById("a_Link_Save_3").disabled = true;
            document.getElementById("a_Link_Save_4").disabled = true;
            document.getElementById("a_Link_Save_5").disabled = true;
            document.getElementById("a_Link_Save_6").disabled = true;
            setTimeout(initial, 0);
            clearScopeMemberObj();
        } else if (Edit_Type === '3') {
            document.getElementById("a_Link_Save_1").disabled = true;
            document.getElementById("a_Link_Save_2").disabled = true;
            document.getElementById("a_Link_Save_3").disabled = false;
            document.getElementById("a_Link_Save_4").disabled = true;
            document.getElementById("a_Link_Save_5").disabled = true;
            document.getElementById("a_Link_Save_6").disabled = true;
            setTimeout(initial, 0);
            clearScopeMemberObj();
        } else if (Edit_Type === '4') {
            document.getElementById("a_Link_Save_1").disabled = true;
            document.getElementById("a_Link_Save_2").disabled = true;
            document.getElementById("a_Link_Save_3").disabled = true;
            document.getElementById("a_Link_Save_4").disabled = false;
            document.getElementById("a_Link_Save_5").disabled = true;
            document.getElementById("a_Link_Save_6").disabled = true;
            setTimeout(initial, 0);
            clearScopeMemberObj();
        } else if (Edit_Type === '5') {
            document.getElementById("a_Link_Save_1").disabled = true;
            document.getElementById("a_Link_Save_2").disabled = true;
            document.getElementById("a_Link_Save_3").disabled = true;
            document.getElementById("a_Link_Save_4").disabled = true;
            document.getElementById("a_Link_Save_5").disabled = false;
            document.getElementById("a_Link_Save_6").disabled = true;
            setTimeout(initial, 0);
            clearScopeMemberObj();
        } else if (Edit_Type === '6') {
            document.getElementById("a_Link_Save_1").disabled = true;
            document.getElementById("a_Link_Save_2").disabled = true;
            document.getElementById("a_Link_Save_3").disabled = true;
            document.getElementById("a_Link_Save_4").disabled = true;
            document.getElementById("a_Link_Save_5").disabled = true;
            document.getElementById("a_Link_Save_6").disabled = false;
            setTimeout(initial, 0);
            clearScopeMemberObj();
        }
    }
    /**---------------------------------------function zone end--------------------------------------------*/
});