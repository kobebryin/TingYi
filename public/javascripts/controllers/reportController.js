angular.module('TinYi').controller('reportController', function ($rootScope, $scope, reportService) {

    $scope.Meal_1 = null;

    $scope.exportexcel = function () {
 
    };

    //查詢按鈕點擊事件
    $scope.doSearch = function () {
        if ($scope.Meal_1 != null) {
            var SearchArray = {
                searchDate: null,
                searchType: null,
                searchTime: null
            }

            SearchArray.searchDate = $('#datepicker').val();
            SearchArray.searchType = parseInt($scope.Meal_1.split(",")[0]);
            SearchArray.searchTime = $scope.Meal_1.split(",")[1];

            //月子餐名條
            if (SearchArray.searchType === 1) {
                reportService.postSearch(SearchArray, function (data) {
                    console.log(data);
                    $('#dg').datagrid({
                        title: "月子餐名單",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
                            { field: 'ID', title: '編號', width: '24%', align: 'center' },
                            { field: 'Meal01', title: '床號', width: '24%', align: 'center' },
                            { field: 'Attrib01', title: '姓名', width: '24%', align: 'center' },
                            { field: 'Meal24', title: '備註', width: '24%', align: 'center' }
                        ]]
                    });
                });
            }
            //調理餐名條
            if (SearchArray.searchType === 2) {
                reportService.postSearch(SearchArray, function (data) {
                    console.log(data);
                    $('#dg').datagrid({
                        title: "調理餐名單",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
                            { field: 'ID', title: '編號', width: '14%', align: 'center' },
                            { field: 'Attrib01', title: '姓名', width: '14%', align: 'center' },
                            { field: 'Meal05', title: '調理內容', width: '14%', align: 'center' },
                            { field: 'Meal06', title: '禁忌', width: '14%', align: 'center' },
                            { field: 'Meal08', title: '湯換飲品', width: '14%', align: 'center' },
                            { field: 'Meal07', title: '加減', width: '14%', align: 'center' }
                        ]]

                    });
                });
            }
            //一般餐名條
            if (SearchArray.searchType === 3) {
                reportService.postSearch(SearchArray, function (data) {
                    console.log(data);
                    $('#dg').datagrid({
                        title: "一般餐統計",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
                            { field: 'ID', title: '編號', width: '24%', align: 'center' },
                            { field: 'Attrib01', title: '姓名', width: '24%', align: 'center' },
                            { field: 'Meal01', title: '數量', width: '24%', align: 'center' },
                            { field: 'Meal12', title: '餐票', width: '24%', align: 'center' },
                            { field: 'Meal21', title: '月結', width: '24%', align: 'center' },
                            { field: 'Meal16', title: '現金', width: '24%', align: 'center' },
                            { field: 'Meal24', title: '備註', width: '24%', align: 'center' }
                        ]]
                    });
                });
            }
            //送餐報表
            if (SearchArray.searchType === 4) {
                reportService.postAllSearch(SearchArray, function (data) {
                    console.log(data);
                    $('#dg').datagrid({
                        title: "一般餐統計",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
                            { field: 'ID', title: '編號', width: '9%', align: 'center' },
                            { field: 'Attrib01', title: '姓名', width: '9%', align: 'center' },
                            { field: 'MealType', title: '餐別', width: '9%', align: 'center' },
                            { field: 'User', title: '手機', width: '9%', align: 'center' },
                            { field: 'Attrib10', title: '住家電話', width: '9%', align: 'center' },
                            { field: 'Meal03', title: '地址', width: '9%', halign: 'center' },
                            { field: 'Meal20', title: '現金', width: '9%', align: 'center' },
                            { field: 'Meal04', title: '路線', width: '9%', align: 'center' },
                            { field: 'Meal24', title: '備註', width: '9%', align: 'center' }
                        ]]
                    });
                });
            }
        } else {
            alert("請選擇餐點種類，謝謝！");
        }
    };

   


    /**---------------------------以下為起始初始化的UI----------------------------------------- */
    $('#dg').datagrid({
        title: "調理餐名單",
        //url:'http://127.0.0.1:8080/searchConditionMealApi',
        rownumbers: true,
        singleSelect: true,
        columns: [[
            { field: 'ID', title: '編號', width: 100 },
            { field: 'Address', title: '床號', width: 100 },
            { field: 'Name', title: '姓名', width: 100 },
            { field: 'Memo', title: '備註', width: 100, align: 'right' }
        ]]
    });

    var date = $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd', changeMonth: true,
        changeYear: true
    });

    $("#datepicker").datepicker("setDate", new Date());
});    