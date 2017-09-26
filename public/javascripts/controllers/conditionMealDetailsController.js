angular.module('TinYi').controller('conditionMealDetailsController', function ($rootScope, $scope, searchConditionMealService) {
        // $("#datepicker").datepicker(    );.

        initial();

        /**-----------------------------------------click event zone start----------------------------------------- */
        //清空按鈕點擊事件
        $scope.clean = function () {
                initial();  //清空function
        }

        //查詢按鈕點擊事件
        $scope.search = function () {

                //日期必輸項，判斷有沒有輸入日期
                if ($('#datepicker').val() != "") {

                        //初始搜尋物件
                        var SearchArray = {
                                date: null,
                                mealtype: 2,
                                type: null,
                                data: []
                        }

                        //塞進日期與早午晚類別進物件
                        SearchArray.date = $('#datepicker').val();
                        SearchArray.type = $scope.Meal_Type;

                        if ($('#id_input_Meal_Meal06').val() != "") {
                                var obj = { Meal06: $('#id_input_Meal_Meal06').val() };
                                SearchArray.data.push(obj);
                        }
                        if ($('#id_input_Meal_Meal07').val() != "") {
                                var obj = { Meal07: $('#id_input_Meal_Meal07').val() };
                                SearchArray.data.push(obj);
                        }
                        if ($('#id_input_Meal_Meal08').val() != "") {
                                var obj = { Meal08: $('#id_input_Meal_Meal08').val() };
                                SearchArray.data.push(obj);
                        }

                        //查詢ＳＥＲＶＩＣＥ呼叫
                        searchConditionMealService.postSearch(SearchArray, function (data) {
                                var total = data.length;    //取得回傳資料陣列長度
                                var ContentStr = "查詢到 " + total + " 個客戶\n"; //要顯示的字串

                                //判斷長度是否大於0，因為0等於沒資料
                                if (total != 0) {
                                        ContentStr += "---------------------------------------------------------------------------------------------------------------------\n";
                                        ContentStr += "日期：" + $('#datepicker').val() + " ";
                                        var Type = $scope.Meal_Type;
                                        if (Type === "A") ContentStr += "早";
                                        if (Type === "B") ContentStr += "午";
                                        if (Type === "C") ContentStr += "晚";
                                        ContentStr += "\n查詢結果如下：\n";
                                        for (var key in data) {
                                                ContentStr += "地址：" + data[key].Meal03 + "，姓名：" + data[key].Attrib01 + "\n";
                                        }
                                }
                                $("#txt_Request_Search").val(ContentStr);
                        });

                } else {
                        alert('日期為必輸項，請先輸入日期!');
                }

        }


        /**-----------------------------------------click event zone end-------------------------------------------- */


        /**-----------------------------------------function zone start---------------------------------------------- */
        function initial() {
                $scope.Meal_Type = "A";

                var date = $('#datepicker').datepicker({
                        dateFormat: 'yy-mm-dd', changeMonth: true,
                        changeYear: true
                }).val();

                $('#id_input_Meal_Meal06').combotree({
                        url: 'http://127.0.0.1:8080/fieldvalueAttrib05',
                        multiple: true,
                        valueField: 'id',
                        textField: 'text',
                        cascadeCheck: '',
                        fontsize: '12px',
                        editable: false
                });

                $('#id_input_Meal_Meal07').combobox({
                        url: 'http://127.0.0.1:8080/fieldvalueMeal0708',
                        method: 'get',
                        multiple: true,
                        editable: false,
                        valueField: 'id',
                        textField: 'text'
                });

                $('#id_input_Meal_Meal08').combobox({
                        url: 'http://127.0.0.1:8080/fieldvalueMeal0708',
                        method: 'post',
                        editable: false,
                        multiple: true,
                        valueField: 'id',
                        textField: 'text'
                });

        }
        /**-------------------------------------------function zone end---------------------------------------------- */

});