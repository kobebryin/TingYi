angular.module('TinYi').controller('reportController', function ($rootScope, $scope, reportService) {

    $scope.Meal_1 = null;

    $scope.jsonToExport = null;

    //按鈕修改暫時不用了
    /*$scope.exportexcel = function () {
        // var json = JSON.stringify([{
        //     foo: '22',
        //     qux: '33',
        //     poo: 123,
        //     stux: new Date()
        // },
        // {
        //     foo: '11',
        //     qux: '44',
        //     poo: 345,
        //     stux: new Date()
        // }]);



        // location.href = "http://192.168.1.15:8080/exportExcelApi?DATA=" + json;
    };*/

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
                    //console.log(data);

                    //export excel zone
                    if (SearchArray.searchTime === 'A')
                        var excel_title = SearchArray.searchDate + '月子餐名條(早)';
                    if (SearchArray.searchTime === 'B')
                        var excel_title = SearchArray.searchDate + '月子餐名條(午)';
                    if (SearchArray.searchTime === 'C')
                        var excel_title = SearchArray.searchDate + '月子餐名條(晚)';

                    $scope.jsonToExport = data;
                    // Prepare Excel data:
                    $scope.fileName = excel_title;
                    $scope.exportData = [];
                    // Headers: 
                    $scope.exportData.push(["", excel_title, ""]);
                    $scope.exportData.push(["床號", "姓名", "備註"]);
                    // Data:
                    angular.forEach($scope.jsonToExport, function (value, key) {
                        $scope.exportData.push([value.Meal01, value.Attrib01, value.Meal24]);
                    });

                    //ui datagrid show data
                    $('#dg').datagrid({
                        title: "月子餐名單",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
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
                    // console.log(data);

                    //export excel zone
                    if (SearchArray.searchTime === 'A')
                        var excel_title = SearchArray.searchDate + '調理餐名條(早)';
                    if (SearchArray.searchTime === 'B')
                        var excel_title = SearchArray.searchDate + '調理餐名條(午)';
                    if (SearchArray.searchTime === 'C')
                        var excel_title = SearchArray.searchDate + '調理餐名條(晚)';

                    $scope.jsonToExport = data;
                    // Prepare Excel data:
                    $scope.fileName = excel_title;
                    $scope.exportData = [];
                    // Headers: 
                    $scope.exportData.push(["", excel_title, ""]);
                    $scope.exportData.push(["姓名", "調理內容", "禁忌", "湯換飲品", "加減"]);
                    // Data:
                    angular.forEach($scope.jsonToExport, function (value, key) {
                        $scope.exportData.push([value.Attrib01, value.Meal05, value.Meal06, value.Meal08, value.Meal07]);
                    });

                    //ui datagrid show data
                    $('#dg').datagrid({
                        title: "調理餐名單",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[                           
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
                    // console.log(data);

                    //export excel zone
                    if (SearchArray.searchTime === 'A')
                        var excel_title = SearchArray.searchDate + '一般餐統計(早)';
                    if (SearchArray.searchTime === 'B')
                        var excel_title = SearchArray.searchDate + '一般餐統計(午)';
                    if (SearchArray.searchTime === 'C')
                        var excel_title = SearchArray.searchDate + '一般餐統計(晚)';

                    $scope.jsonToExport = data;
                    // Prepare Excel data:
                    $scope.fileName = excel_title;
                    $scope.exportData = [];
                    // Headers: 
                    $scope.exportData.push(["", excel_title, ""]);
                    $scope.exportData.push(["姓名", "數量", "餐票", "月結", "現金", "備註"]);
                    // Data:
                    angular.forEach($scope.jsonToExport, function (value, key) {
                        $scope.exportData.push([value.Attrib01, value.Meal01, value.Meal12, value.Meal21, value.Meal16, value.Meal24]);
                    });

                    //ui datagrid show data
                    $('#dg').datagrid({
                        title: "一般餐統計",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[                           
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
                    // console.log(data);

                    //export excel zone
                    if (SearchArray.searchTime === 'A')
                        var excel_title = SearchArray.searchDate + '送餐報表(早)';
                    if (SearchArray.searchTime === 'B')
                        var excel_title = SearchArray.searchDate + '送餐報表(午)';
                    if (SearchArray.searchTime === 'C')
                        var excel_title = SearchArray.searchDate + '送餐報表(晚)';

                    $scope.jsonToExport = data;
                    // Prepare Excel data:
                    $scope.fileName = excel_title;
                    $scope.exportData = [];
                    // Headers: 
                    $scope.exportData.push(["", excel_title, ""]);
                    $scope.exportData.push(["姓名", "餐別", "手機", "住家電話", "地址", "現金", "路線", "備註"]);
                    // Data:
                    angular.forEach($scope.jsonToExport, function (value, key) {
                        $scope.exportData.push([value.Attrib01, value.MealType, value.User, value.Attrib10, value.Meal03, value.Meal20, value.Meal04, value.Meal24]);
                    });

                    //ui datagrid show data
                    $('#dg').datagrid({
                        title: "一般餐統計",
                        rownumbers: true,
                        singleSelect: true,
                        data: data,
                        columns: [[
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
        //url:$rootScope.apiUrl + 'searchConditionMealApi',
        rownumbers: true,
        singleSelect: true,
        columns: [[
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