angular.module('TinYi').controller('monthMealController', function ($rootScope, $scope, MemberService) {
    var id = $rootScope.id; //11960;
    $scope.meal = {
        attrib05: null,
        user: null,
        attrib14: null,
        attrib15: null
    }

    initial();


    MemberService.getOneMEMBER(id, function (data) {
        $scope.meal.attrib05 = data[0].Attrib05;
        $scope.meal.user = data[0].User;
        $scope.meal.attrib14 = data[0].Attrib14;
        $scope.meal.attrib15 = data[0].Attrib15;

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


    });

    $scope.a = function () {
        var dates = month_calendar_morning.multiDatesPicker('getDates');
        console.log(dates);
    };


    /**---------------------------------------function zone start------------------------------------------*/
    function initial() {
        //日歷easyui初始化
        var month_calendar_morning = $('#month_calendar_morning').multiDatesPicker();
        var month_calendar_noon = $('#month_calendar_noon').multiDatesPicker();
        var month_calendar_night = $('#month_calendar_night').multiDatesPicker();

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
    }
    /**---------------------------------------function zone end--------------------------------------------*/
});