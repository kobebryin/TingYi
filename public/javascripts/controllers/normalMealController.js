angular.module('TinYi').controller('normalMealController', function ($rootScope, $scope, MemberService, monthMealService) {

    var id = sessionStorage.memberid;
    $scope.UserName = id;
    var month_calendar_morning;
    var month_calendar_noon;
    var month_calendar_night;
    var Today = new Date();           //日期
    var client_ip;              //客戶端IP位置

    var Edit_Type = '1';
    // $scope.Edit_Type_2 = '1';   //編輯模式ng-model預設   
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
        meal3sicktype: null,
        meal3a: null,
        meal3ac: null,
        meal3b: null,
        meal3bc: null,
        meal3c: null,
        meal3cc: null,
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
        mealtype: 3,
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
        mealtype: 3,
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
        mealtype: 3,
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
    Edit_Type_check();

    //取得客戶單IP位址
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        client_ip = data.ip;
        console.log(data.ip);
    });

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

    //清空重填按鈕
    $scope.clearAll = function () {
        var confirmDelete = confirm("確認刪除之前的舊訂餐嗎？    ＊假如確認，將無法恢復！");　//跳除confirm視窗詢是否刪除
        if (confirmDelete == true) {
            //左邊框架的變數
            let mealForMember = {
                meal3sicktype: null,
                meal3a: null,
                meal3ac: null,
                meal3b: null,
                meal3bc: null,
                meal3c: null,
                meal3cc: null,
                recordtime: null,
                showtime: null,
                id: id
            }

            mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
            mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

            MemberService.putMEMBERforNormalMeal(mealForMember, function (data) {
                initial();
            });

            monthMealService.deleteMeal_C(id, function (data) {
                initial();
            });
        } else {
            //按下取消不做任何事情 
        }
    };

    $scope.edit_join = function () {
        if (!$scope.cb_morningFalg && !$scope.cb_noonFalg && !$scope.cb_nightFalg) {
            alert('請至少勾選一個時段才可新增!');
        } else {
            if ($scope.cb_morningFalg) {
                if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {
                    var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                    for (let key in dates_A) {

                        let edit_join_data = {
                            memberid: id,
                            date: dates_A[key],
                            mealtype: 3,
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
                            meal24: $scope.meallistA.meal24
                        }
                        monthMealService.edit_join_Meal3(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                            } else {
                                initial();
                            }
                        });
                    }  
                }
            }
            if ($scope.cb_noonFalg) {
                if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {

                    var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                    for (let key in dates_B) {

                        let edit_join_data = {
                            memberid: id,
                            date: dates_B[key],
                            mealtype: 3,
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
                            meal24: $scope.meallistA.meal24
                        }
                        monthMealService.edit_join_Meal3(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                            } else {
                                initial();
                            }
                        });
                    }  
                }
            }
            if ($scope.cb_nightFalg) {
                if (month_calendar_night.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {

                    var dates_C = month_calendar_night.multiDatesPicker('getDates');
                    for (let key in dates_C) {

                        let edit_join_data = {
                            memberid: id,
                            date: dates_C[key],
                            mealtype: 3,
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
                            meal24: $scope.meallistA.meal24
                        }
                        monthMealService.edit_join_Meal3(edit_join_data, function (data) {
                            if (data === '未輸入任何修改資料!') {
                                alert(data);
                            } else {
                                initial();
                            }
                        });
                    } 
                }
            }
        }
    };

    $scope.delete = function () {
        if (!$scope.cb_morningFalg && !$scope.cb_noonFalg && !$scope.cb_nightFalg) {
            alert('請至少勾選一個時段才可新增!');
        } else {
            if ($scope.cb_morningFalg) {
                if (month_calendar_morning.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {

                    var dates_A = month_calendar_morning.multiDatesPicker('getDates');
                    var meal3ac_string = ";"

                    for (let key in dates_A) {

                        let delete_data = {
                            id: sessionStorage.memberid,
                            date: dates_A[key]
                        }
                        monthMealService.S3_deleteMeal_A(delete_data, function (data) {
                            initial();
                        });
                    }

                    var meal3ac_initial = $scope.mealForMember.meal3ac.substring(1, $scope.mealForMember.meal3ac.length - 1);   //先去頭去尾';'
                    var meal3ac_initial_array = meal3ac_initial.split(";");     //依照;來切
                    // console.log(meal3ac_initial_array);

                    var dates = month_calendar_morning.multiDatesPicker('getDates');
                    // console.log(dates);
                    var set1 = new Set(meal3ac_initial_array);
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
                            mea3ac: null
                        }
                        monthMealService.S3_putMeal_A(inputObj, function (data) {
                            initial();
                        });
                    } else {
                        for (key in subset) {
                            meal3ac_string += subset[key] + ";";
                        }

                        let inputObj = {
                            id: sessionStorage.memberid,
                            mea3ac: meal3ac_string
                        }
                        monthMealService.S3_putMeal_A(inputObj, function (data) {
                            initial();
                        });
                    }
                }
            }

            if ($scope.cb_noonFalg) {
                if (month_calendar_noon.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {
                    var dates_B = month_calendar_noon.multiDatesPicker('getDates');
                    var meal3bc_string = ";"

                    for (let key in dates_B) {

                        let delete_data = {
                            id: sessionStorage.memberid,
                            date: dates_B[key]
                        }
                        monthMealService.S3_deleteMeal_B(delete_data, function (data) {
                            initial();
                        });
                    }

                    var meal3bc_initial = $scope.mealForMember.meal3bc.substring(1, $scope.mealForMember.meal3bc.length - 1);   //先去頭去尾';'
                    var meal3bc_initial_array = meal3bc_initial.split(";");     //依照;來切
                    // console.log(meal3ac_initial_array);

                    var dates = month_calendar_noon.multiDatesPicker('getDates');
                    // console.log(dates);
                    var set1 = new Set(meal3bc_initial_array);
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
                            mea3bc: null
                        }
                        monthMealService.S3_putMeal_B(inputObj, function (data) {
                            initial();
                        });
                    } else {
                        for (key in subset) {
                            meal3bc_string += subset[key] + ";";
                        }

                        let inputObj = {
                            id: sessionStorage.memberid,
                            mea3bc: meal3bc_string
                        }
                        monthMealService.S3_putMeal_B(inputObj, function (data) {
                            initial();
                        });
                    }
                }
            }

            if ($scope.cb_nightFalg) {
                if (month_calendar_night.multiDatesPicker('getDates').length === 0) {
                    alert('請至少勾選一個日期才可新增!');
                } else {
                    var dates_C = month_calendar_night.multiDatesPicker('getDates');
                    var meal3cc_string = ";"

                    for (let key in dates_C) {

                        let delete_data = {
                            id: sessionStorage.memberid,
                            date: dates_C[key]
                        }
                        monthMealService.S3_deleteMeal_C(delete_data, function (data) {
                            initial();
                        });
                    }

                    var meal3cc_initial = $scope.mealForMember.meal3cc.substring(1, $scope.mealForMember.meal3cc.length - 1);   //先去頭去尾';'
                    var meal3cc_initial_array = meal3cc_initial.split(";");     //依照;來切
                    // console.log(meal3ac_initial_array);

                    var dates = month_calendar_night.multiDatesPicker('getDates');
                    // console.log(dates);
                    var set1 = new Set(meal3cc_initial_array);
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
                            mea3cc: null
                        }
                        monthMealService.S3_putMeal_C(inputObj, function (data) {
                            initial();
                        });
                    } else {
                        for (key in subset) {
                            meal3cc_string += subset[key] + ";";
                        }

                        let inputObj = {
                            id: sessionStorage.memberid,
                            mea3cc: meal3cc_string
                        }
                        monthMealService.S3_putMeal_C(inputObj, function (data) {
                            initial();
                        });
                    }
                }
            }
        }
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
                    $scope.mealForMember.meal3ac = ";";
                    for (key in dates_A) {
                        $scope.mealForMember.meal3ac += dates_A[key] + ";";
                    }
                    $scope.mealForMember.id = id;
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal3sicktype: $scope.mealForMember.meal3sicktype,
                        meal3a: $scope.mealForMember.meal3a,
                        meal3ac: $scope.mealForMember.meal3ac,
                        meal3b: $scope.mealForMember.meal3b,
                        meal3bc: $scope.mealForMember.meal3bc,
                        meal3c: $scope.mealForMember.meal3c,
                        meal3cc: $scope.mealForMember.meal3cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforNormalMeal(mealForMember, function (data) {
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
                            mealtype: 3,
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
                    $scope.mealForMember.meal3bc = ";";
                    for (key in dates_B) {
                        $scope.mealForMember.meal3bc += dates_B[key] + ";";
                    }
                    $scope.mealForMember.id = id;
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal3sicktype: $scope.mealForMember.meal3sicktype,
                        meal3a: $scope.mealForMember.meal3a,
                        meal3ac: $scope.mealForMember.meal3ac,
                        meal3b: $scope.mealForMember.meal3b,
                        meal3bc: $scope.mealForMember.meal3bc,
                        meal3c: $scope.mealForMember.meal3c,
                        meal3cc: $scope.mealForMember.meal3cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforNormalMeal(mealForMember, function (data) {
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
                            mealtype: 3,
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
                    $scope.mealForMember.meal3cc = ";";
                    for (key in dates_C) {
                        $scope.mealForMember.meal3cc += dates_C[key] + ";";
                    }
                    $scope.mealForMember.id = id;
                    $scope.mealForMember.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.mealForMember.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    let mealForMember = {
                        meal3sicktype: $scope.mealForMember.meal3sicktype,
                        meal3a: $scope.mealForMember.meal3a,
                        meal3ac: $scope.mealForMember.meal3ac,
                        meal3b: $scope.mealForMember.meal3b,
                        meal3bc: $scope.mealForMember.meal3bc,
                        meal3c: $scope.mealForMember.meal3c,
                        meal3cc: $scope.mealForMember.meal3cc,
                        recordtime: $scope.mealForMember.recordtime,
                        showtime: $scope.mealForMember.showtime,
                        id: $scope.mealForMember.id
                    }
                    MemberService.putMEMBERforNormalMeal(mealForMember, function (data) {
                        initial();
                    });

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.meallistC.createtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistC.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.meallistC.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    //存入客戶端IP
                    $scope.meallistC.mip = client_ip;
                    $scope.meallistC.mip2 = client_ip;

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
                            mealtype: 3,
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

            switch (Edit_Type) {
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

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        $scope.meal.attrib05 = data[0].Attrib05;
                        $scope.meal.user = data[0].User;
                        $scope.meal.attrib14 = data[0].Attrib14;
                        $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal3sicktype = data[0].Meal3SickType;
                        $scope.mealForMember.meal3a = data[0].Meal3A;
                        $scope.mealForMember.meal3ac = data[0].Meal3AC;     //早日期
                        $scope.mealForMember.meal3b = data[0].Meal3B;
                        $scope.mealForMember.meal3bc = data[0].Meal3BC;     //午日期
                        $scope.mealForMember.meal3c = data[0].Meal3C;
                        $scope.mealForMember.meal3cc = data[0].Meal3CC;     //晚日期

                        //塞值到前端
                        $scope.meallistA.meal02 = $scope.meal.user;    //手機
                        $scope.meallistB.meal02 = $scope.meal.user;    //手機  
                        $scope.meallistC.meal02 = $scope.meal.user;    //手機
                        $scope.meallistA.meal03 = $scope.meal.attrib14;    //早餐地址
                        $scope.meallistB.meal03 = $scope.meal.attrib14;    //午餐地址
                        $scope.meallistC.meal03 = $scope.meal.attrib15;    //晚餐地址

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal3ac != null) {
                            if ($scope.mealForMember.meal3ac.length > 9) {
                                //早餐的日曆值塞入
                                var meal3ac_initial = $scope.mealForMember.meal3ac.substring(1, $scope.mealForMember.meal3ac.length - 1);   //先去頭去尾';'
                                var meal3ac_initial_array = meal3ac_initial.split(";");     //依照;來切
                                month_calendar_morning.multiDatesPicker('addDates', meal3ac_initial_array); //將選取日期值塞入
                                month_calendar_morning = $('#month_calendar_morning').multiDatesPicker({ addDisabledDates: meal3ac_initial_array });     //選取後的日期不能使用        
                            } else {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                            }
                        } else {
                            $('#month_calendar_morning').multiDatesPicker('resetDates');
                            $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                        }
                        if ($scope.mealForMember.meal3bc != null) {
                            if ($scope.mealForMember.meal3bc.length > 9) {
                                //午餐的日曆值塞入
                                var meal3bc_initial = $scope.mealForMember.meal3bc.substring(1, $scope.mealForMember.meal3bc.length - 1);   //先去頭去尾';'
                                var meal3bc_initial_array = meal3bc_initial.split(";");     //依照;來切
                                month_calendar_noon.multiDatesPicker('addDates', meal3bc_initial_array);    //將選取日期值塞入
                                month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({ addDisabledDates: meal3bc_initial_array });    //選取後的日期不能使用
                            } else {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                            }
                        } else {
                            $('#month_calendar_noon').multiDatesPicker('resetDates');
                            $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                        }
                        if ($scope.mealForMember.meal3cc != null) {
                            if ($scope.mealForMember.meal3cc.length > 9) {
                                //晚餐的日曆值塞入
                                var meal3cc_initial = $scope.mealForMember.meal3cc.substring(1, $scope.mealForMember.meal3cc.length - 1);   //先去頭去尾';'
                                var meal3cc_initial_array = meal3cc_initial.split(";");     //依照;來切
                                month_calendar_night.multiDatesPicker('addDates', meal3cc_initial_array);   //將選取日期值塞入
                                month_calendar_night = $('#month_calendar_night').multiDatesPicker({ addDisabledDates: meal3cc_initial_array });  //選取後的日期不能使用
                            } else {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                            }
                        } else {
                            $('#month_calendar_night').multiDatesPicker('resetDates');
                            $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                        }
                    });
                    break;

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

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        $scope.meal.attrib05 = data[0].Attrib05;
                        $scope.meal.user = data[0].User;
                        $scope.meal.attrib14 = data[0].Attrib14;
                        $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal3sicktype = data[0].Meal3SickType;
                        $scope.mealForMember.meal3a = data[0].Meal3A;
                        $scope.mealForMember.meal3ac = data[0].Meal3AC;     //早日期
                        $scope.mealForMember.meal3b = data[0].Meal3B;
                        $scope.mealForMember.meal3bc = data[0].Meal3BC;     //午日期
                        $scope.mealForMember.meal3c = data[0].Meal3C;
                        $scope.mealForMember.meal3cc = data[0].Meal3CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal3ac != null) {
                            if ($scope.mealForMember.meal3ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal3ac_initial = $scope.mealForMember.meal3ac.substring(1, $scope.mealForMember.meal3ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal3ac_initial.split(";");     //依照;來切
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
                        if ($scope.mealForMember.meal3bc != null) {
                            if ($scope.mealForMember.meal3bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal3bc_initial = $scope.mealForMember.meal3bc.substring(1, $scope.mealForMember.meal3bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal3bc_initial.split(";");     //依照;來切
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
                        if ($scope.mealForMember.meal3cc != null) {
                            if ($scope.mealForMember.meal3cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal3cc_initial = $scope.mealForMember.meal3cc.substring(1, $scope.mealForMember.meal3cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal3cc_initial.split(";");     //依照;來切
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

                    //將初始欄位值塞到前端欄位
                    MemberService.getOneMEMBER(id, function (data) {
                        // $scope.meal.attrib05 = data[0].Attrib05;
                        // $scope.meal.user = data[0].User;
                        // $scope.meal.attrib14 = data[0].Attrib14;
                        // $scope.meal.attrib15 = data[0].Attrib15;

                        $scope.mealForMember.meal3sicktype = data[0].Meal3SickType;
                        $scope.mealForMember.meal3a = data[0].Meal3A;
                        $scope.mealForMember.meal3ac = data[0].Meal3AC;     //早日期
                        $scope.mealForMember.meal3b = data[0].Meal3B;
                        $scope.mealForMember.meal3bc = data[0].Meal3BC;     //午日期
                        $scope.mealForMember.meal3c = data[0].Meal3C;
                        $scope.mealForMember.meal3cc = data[0].Meal3CC;     //晚日期

                        //日曆塞值：  第一層判斷式：判斷之前有無輸入日期，第二層判斷式：判斷長度有無至少一個日期
                        if ($scope.mealForMember.meal3ac != null) {
                            if ($scope.mealForMember.meal3ac.length > 9) {
                                $('#month_calendar_morning').multiDatesPicker('resetDates');
                                $('#month_calendar_morning').multiDatesPicker('resetDates', 'disabled');
                                //早餐的日曆值塞入
                                var meal3ac_initial = $scope.mealForMember.meal3ac.substring(1, $scope.mealForMember.meal3ac.length - 1);   //先去頭去尾';'
                                enableDays_A = meal3ac_initial.split(";");     //依照;來切
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
                        if ($scope.mealForMember.meal3bc != null) {
                            if ($scope.mealForMember.meal3bc.length > 9) {
                                $('#month_calendar_noon').multiDatesPicker('resetDates');
                                $('#month_calendar_noon').multiDatesPicker('resetDates', 'disabled');
                                //午餐的日曆值塞入
                                var meal3bc_initial = $scope.mealForMember.meal3bc.substring(1, $scope.mealForMember.meal3bc.length - 1);   //先去頭去尾';'
                                enableDays_B = meal3bc_initial.split(";");     //依照;來切
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
                        if ($scope.mealForMember.meal3cc != null) {
                            if ($scope.mealForMember.meal3cc.length > 9) {
                                $('#month_calendar_night').multiDatesPicker('resetDates');
                                $('#month_calendar_night').multiDatesPicker('resetDates', 'disabled');
                                //晚餐的日曆值塞入
                                var meal3cc_initial = $scope.mealForMember.meal3cc.substring(1, $scope.mealForMember.meal3cc.length - 1);   //先去頭去尾';'
                                enableDays_C = meal3cc_initial.split(";");     //依照;來切
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

    function clearScopeMemberObj() {
        //用迴圈將所有值設為null
        for (var p in $scope.meallistA) {
            if ($scope.meallistA.hasOwnProperty(p)) {
                $scope.meallistA[p] = ' ';
            }
        }
        $scope.meallistA.flag = 9;
        $scope.meallistA.type = 'A';
        $scope.meallistA.mealtype = 3;

        //用迴圈將所有值設為null
        for (var p in $scope.meallistB) {
            if ($scope.meallistB.hasOwnProperty(p)) {
                $scope.meallistB[p] = ' ';
            }
        }
        $scope.meallistB.flag = 9;
        $scope.meallistB.type = 'B';
        $scope.meallistB.mealtype = 3;

        //用迴圈將所有值設為null
        for (var p in $scope.meallistC) {
            if ($scope.meallistC.hasOwnProperty(p)) {
                $scope.meallistC[p] = ' ';
            }
        }
        $scope.meallistC.flag = 9;
        $scope.meallistC.type = 'C';
        $scope.meallistC.mealtype = 3;
    }

    //抓早日期差集
    function DifferenceSet_A() {
        if ($scope.mealForMember.meal3ac === null) {
            var dates = month_calendar_morning.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_A = dates;
                return true;
            }
        } else {
            var meal3ac_initial = $scope.mealForMember.meal3ac.substring(1, $scope.mealForMember.meal3ac.length - 1);   //先去頭去尾';'
            var meal3ac_initial_array = meal3ac_initial.split(";");     //依照;來切
            // console.log(meal3ac_initial_array);

            var dates = month_calendar_morning.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal3ac_initial_array);

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
        if ($scope.mealForMember.meal3bc === null) {
            var dates = month_calendar_noon.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_B = dates;
                return true;
            }
        } else {
            var meal3bc_initial = $scope.mealForMember.meal3bc.substring(1, $scope.mealForMember.meal3bc.length - 1);   //先去頭去尾';'
            var meal3bc_initial_array = meal3bc_initial.split(";");     //依照;來切
            // console.log(meal3bc_initial_array);

            var dates = month_calendar_noon.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal3bc_initial_array);

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
        if ($scope.mealForMember.meal3cc === null) {
            var dates = month_calendar_night.multiDatesPicker('getDates');
            if (dates.length === 0) {
                return false;
            } else {
                subset_calendar_C = dates;
                return true;
            }
        } else {
            var meal3cc_initial = $scope.mealForMember.meal3cc.substring(1, $scope.mealForMember.meal3cc.length - 1);   //先去頭去尾';'
            var meal3cc_initial_array = meal3cc_initial.split(";");     //依照;來切
            // console.log(meal3cc_initial_array);

            var dates = month_calendar_night.multiDatesPicker('getDates');
            // console.log(dates);
            var set1 = new Set(dates);
            var set2 = new Set(meal3cc_initial_array);

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
    function Edit_Type_check() {
        $(document).on("change", "input[name=Edit_Type_2]", function () {
            Edit_Type = $('[name="Edit_Type_2"]:checked').val();
            if (Edit_Type === '1') {
                document.getElementById("a_Link_Save_1").disabled = false;
                document.getElementById("a_Link_Save_2").disabled = true;
                document.getElementById("a_Link_Save_3").disabled = true;
                document.getElementById("a_Link_Save_4").disabled = true;
                document.getElementById("a_Link_Save_5").disabled = true;
                initial();
            } else if (Edit_Type === '2') {
                document.getElementById("a_Link_Save_1").disabled = true;
                document.getElementById("a_Link_Save_2").disabled = false;
                document.getElementById("a_Link_Save_3").disabled = true;
                document.getElementById("a_Link_Save_4").disabled = true;
                document.getElementById("a_Link_Save_5").disabled = true;
                initial();
            } else if (Edit_Type === '3') {
                document.getElementById("a_Link_Save_1").disabled = true;
                document.getElementById("a_Link_Save_2").disabled = true;
                document.getElementById("a_Link_Save_3").disabled = false;
                document.getElementById("a_Link_Save_4").disabled = true;
                document.getElementById("a_Link_Save_5").disabled = true;
                initial();
            } else if (Edit_Type === '4') {
                document.getElementById("a_Link_Save_1").disabled = true;
                document.getElementById("a_Link_Save_2").disabled = true;
                document.getElementById("a_Link_Save_3").disabled = true;
                document.getElementById("a_Link_Save_4").disabled = false;
                document.getElementById("a_Link_Save_5").disabled = true;
            } else if (Edit_Type === '5') {
                document.getElementById("a_Link_Save_1").disabled = true;
                document.getElementById("a_Link_Save_2").disabled = true;
                document.getElementById("a_Link_Save_3").disabled = true;
                document.getElementById("a_Link_Save_4").disabled = true;
                document.getElementById("a_Link_Save_5").disabled = false;
            }
        });
    }

});    