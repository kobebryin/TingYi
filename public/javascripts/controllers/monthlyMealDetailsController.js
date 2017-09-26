angular.module('TinYi').controller('monthlyMealDetailsController', function ($rootScope, $scope, searchMonthMealService) {
    // $("#datepicker").datepicker(    );

    initial();

    /**-----------------------------------------click event zone start----------------------------------------- */
    $scope.clean = function () {
        initial();
    }

    $scope.search = function () {

        var SearchArray = {
            date: null,
            mealtype: 1,
            type: null,
            data: []
        }

        SearchArray.date = $('#datepicker').val();
        SearchArray.type = $scope.Meal_Type;

        if ($('#id_input_Meal_Meal12').val() != "") {
            var obj = { Meal12: $('#id_input_Meal_Meal12').val() };
            SearchArray.data.push(obj);
        }
        if ($('#id_input_Meal_Meal14').val() != "") {
            var obj = { Meal14: $('#id_input_Meal_Meal14').val() };
            SearchArray.data.push(obj);
        }
        if ($('#id_input_Meal_Meal15').val() != "") {
            var obj = { Meal15: $('#id_input_Meal_Meal15').val() };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal19 != "") {
            var obj = { Meal19: $scope.Meal19 };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal25 != "") {
            var obj = { Meal25: $scope.Meal25 };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal05 != null) {
            var obj = { Meal05: $scope.Meal05 };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal06 != null) {
            var obj = { Meal06: $scope.Meal06 };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal07 != null) {
            var obj = { Meal07: $scope.Meal07 };
            SearchArray.data.push(obj);
        }
        if ($scope.Meal08 != null) {
            var obj = { Meal08: $scope.Meal08 };
            SearchArray.data.push(obj);
        }
        if ($('#id_input_Meal_Meal21').val() != "") {
            var obj = { Meal21: $('#id_input_Meal_Meal21').val() };
            SearchArray.data.push(obj);
        }
        if ($('#id_input_Meal_Meal22').val() != "") {
            var obj = { Meal22: $('#id_input_Meal_Meal22').val() };
            SearchArray.data.push(obj);
        }
        if ($('#id_input_Meal_Meal23').val() != "") {
            var obj = { Meal23: $('#id_input_Meal_Meal23').val() };
            SearchArray.data.push(obj);
        }
        console.log(SearchArray);

        searchMonthMealService.postSearch(SearchArray, function (data) {
            console.log('1111');
            console.log(data);
            // var total=data[0].total;
            // var ContentStr="查詢到 "+total+" 個客戶\n";
    
            // $("#txt_Request_Search").val(ContentStr);
        });        
    };
    /**-----------------------------------------click event zone end-------------------------------------------- */


    /**-----------------------------------------function zone start---------------------------------------------- */
    function initial() {
        $scope.Meal_Type = "A";
        $scope.Meal05 = null;
        $scope.Meal06 = null;
        $scope.Meal07 = null;
        $scope.Meal08 = null;
        $scope.Meal19 = '';
        $scope.Meal25 = '';

        var date = $('#datepicker').datepicker({
            dateFormat: 'yy-mm-dd', changeMonth: true,
            changeYear: true
        });

        $('#id_input_Meal_Meal12').combotree({
            url: 'http://127.0.0.1:8080/fieldvalueAttrib05',
            multiple: true,
            valueField: 'id',
            textField: 'text',
            cascadeCheck: '',
            fontsize: '12px',
            editable: false
        });

        $('#id_input_Meal_Meal14').combobox({
            url: 'http://127.0.0.1:8080/fieldvalueMeal14',
            method: 'get',
            editable: false,
            multiple: true,
            valueField: 'id',
            textField: 'text'
        });

        $('#id_input_Meal_Meal15').combobox({
            url: 'http://127.0.0.1:8080/fieldvalueMeal15',
            method: 'get',
            editable: false,
            multiple: true,
            valueField: 'id',
            textField: 'text'
        });

        $('#id_input_Meal_Meal21').combobox({
            url: 'http://127.0.0.1:8080/fieldvalueMeal21',
            method: 'get',
            editable: false,
            valueField: 'id',
            textField: 'text'
        });

        $('#id_input_Meal_Meal22').combobox({
            url: 'http://127.0.0.1:8080/fieldvalueMeal21',
            method: 'post',
            editable: false,
            valueField: 'id',
            textField: 'text'
        });

        $('#id_input_Meal_Meal23').combobox({
            url: 'http://127.0.0.1:8080/fieldvalueMeal21',
            method: 'put',
            editable: false,
            valueField: 'id',
            textField: 'text'
        });
    }
    /**-------------------------------------------function zone end---------------------------------------------- */

});