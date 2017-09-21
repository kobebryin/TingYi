angular.module('TinYi').controller('monthMealController', function ($rootScope, $scope, MemberService) {
    var id = 11967;//$rootScope.id; //11960;
    var month_calendar_morning;
    var month_calendar_noon;
    var month_calendar_night;
    
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
    $scope.meallist = {
        
    }

    initial();

    //新增按鈕觸發事件
    $scope.new = function () {

        var dates_A = month_calendar_morning.multiDatesPicker('getDates');
        var dates_B = month_calendar_noon.multiDatesPicker('getDates');
        var dates_C = month_calendar_night.multiDatesPicker('getDates');
        $scope.mealForMember.meal1ac = ";";
        for (key in dates_A) {
            $scope.mealForMember.meal1ac += dates_A[key] + ";";
        }
        $scope.mealForMember.meal1bc = ";";
        for (key in dates_B) {
            $scope.mealForMember.meal1bc += dates_B[key] + ";";
        }
        $scope.mealForMember.meal1cc = ";";
        for (key in dates_C) {
            $scope.mealForMember.meal1cc += dates_C[key] + ";";
        }

        $scope.mealForMember.id = id;
        MemberService.putMEMBERforMonthMeal($scope.mealForMember, function (data) {
            initial();
        });
    };

    $scope.a = function () {
        var dates = month_calendar_morning.multiDatesPicker('getDates');
        console.log(dates);


    };


    /**---------------------------------------function zone start------------------------------------------*/
    function initial() {
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
            $scope.mealForMember.meal1ac = data[0].Meal1AC;
            $scope.mealForMember.meal1b = data[0].Meal1B;
            $scope.mealForMember.meal1bc = data[0].Meal1BC;
            $scope.mealForMember.meal1c = data[0].Meal1C;
            $scope.mealForMember.meal1cc = data[0].Meal1CC;

            //塞值到前端
            $scope.Meal_A_Meal02 = $scope.meal.user;    //手機
            $scope.Meal_B_Meal02 = $scope.meal.user;    //手機  
            $scope.Meal_C_Meal02 = $scope.meal.user;    //手機
            $scope.Meal_A_Meal03 = $scope.meal.attrib14;    //早餐地址
            $scope.Meal_B_Meal03 = $scope.meal.attrib14;    //午餐地址
            $scope.Meal_C_Meal03 = $scope.meal.attrib15;    //晚餐地址
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
                }
            }
            if ($scope.mealForMember.meal1ac != null) {
                if ($scope.mealForMember.meal1bc.length > 9) {
                    //午餐的日曆值塞入
                    var meal1bc_initial = $scope.mealForMember.meal1bc.substring(1, $scope.mealForMember.meal1bc.length - 1);   //先去頭去尾';'
                    var meal1bc_initial_array = meal1bc_initial.split(";");     //依照;來切
                    month_calendar_noon.multiDatesPicker('addDates', meal1bc_initial_array);    //將選取日期值塞入
                    month_calendar_noon = $('#month_calendar_noon').multiDatesPicker({ addDisabledDates: meal1bc_initial_array });    //選取後的日期不能使用
                }
            }
            if ($scope.mealForMember.meal1ac != null) {
                if ($scope.mealForMember.meal1bc.length > 9) {
                    //晚餐的日曆值塞入
                    var meal1cc_initial = $scope.mealForMember.meal1cc.substring(1, $scope.mealForMember.meal1cc.length - 1);   //先去頭去尾';'
                    var meal1cc_initial_array = meal1cc_initial.split(";");     //依照;來切
                    month_calendar_night.multiDatesPicker('addDates', meal1cc_initial_array);   //將選取日期值塞入
                    month_calendar_night = $('#month_calendar_night').multiDatesPicker({ addDisabledDates: meal1cc_initial_array });  //選取後的日期不能使用
                }
            }
        });
    }
    /**---------------------------------------function zone end--------------------------------------------*/
});