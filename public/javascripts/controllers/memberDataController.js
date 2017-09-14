angular.module('TinYi').controller('memberDataController', function ($rootScope, $scope, MemberService) {
    $scope.readonly = false;    //欄位唯獨狀態變數
    var table;                  //將JQUERY dataTables 設為全域變數

    //會員類型分類
    $scope.typeMapping = [
        { value: 0, name: '最高權限管理人員' },
        { value: 1, name: '管理人員' },
        { value: 2, name: '寫單人員' },
        { value: 3, name: '營養顧問' },
        { value: 4, name: '醫院' },
        { value: 5, name: '客戶' }];

    //生產日期-生產類型分費
    $scope.bornType = [
        { value: '自然', name: '自然' },
        { value: '剖腹', name: '剖腹' },
        { value: '小產', name: '小產' },
        { value: '術後', name: '術後' }];

    //供餐時間-供餐類型早午晚分費
    $scope.mealTimeType = [
        { value: '早', name: '早' },
        { value: '午', name: '午' },
        { value: '晚', name: '晚' }];

    //月份分類
    $scope.months = [
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' },
        { value: '8', name: '8' },
        { value: '9', name: '9' },
        { value: '10', name: '10' },
        { value: '11', name: '11' },
        { value: '12', name: '12' }];

    //日期分類
    $scope.days = [
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' },
        { value: '8', name: '8' },
        { value: '9', name: '9' },
        { value: '10', name: '10' },
        { value: '11', name: '11' },
        { value: '12', name: '12' },
        { value: '13', name: '13' },
        { value: '14', name: '14' },
        { value: '15', name: '15' },
        { value: '16', name: '16' },
        { value: '17', name: '17' },
        { value: '18', name: '18' },
        { value: '19', name: '19' },
        { value: '20', name: '20' },
        { value: '21', name: '21' },
        { value: '22', name: '22' },
        { value: '23', name: '23' },
        { value: '24', name: '24' },
        { value: '25', name: '25' },
        { value: '26', name: '26' },
        { value: '27', name: '27' },
        { value: '28', name: '28' },
        { value: '29', name: '29' },
        { value: '30', name: '30' },
        { value: '31', name: '31' }];

    //member table資料表欄位
    $scope.member = {
        id: null,
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

    initial();  //  此頁開始時先呼叫initial()

    
    /**-----------------------------------------click event zone start----------------------------------------- */
    //新增資料上ＭySQL
    $scope.postMEMBER = function () {

        if ($scope.member.attrib01 == null) {   //判斷使用者必輸項有無輸入，如果沒輸入跳出提醒
            clearScopeMemberObj(); //清空$scope.member 物件
            alert("欄位 [姓名] 為必輸項!");
        } else if ($scope.member.user == null) {
            clearScopeMemberObj(); //清空$scope.member 物件
            alert("欄位 [手機] 為必輸項!");
        } else {
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
                table.destroy();    //摧毀dataTables
                initial();          //reload dataTables

                clearScopeMemberObj(); //清空$scope.member 物件
                console.log(data);
            });
        }
    };

    //新增清空欄位
    $scope.createNewMEMBER = function () {
        //datatables假如有欄位被選擇反白，將反白取消。
        table.$('tr.selected').removeClass('selected');

        //將欄位唯獨關閉
        $scope.readonly = false;

        clearScopeMemberObj(); //清空$scope.member 物件
    };

    //刪除資料庫內選取會員的欄位
    $scope.deleteMEMBER = function () {
        // console.log($scope.member.id);

        if ($scope.member.id == null) {     //判斷有無選取會員，如無選取會員則跳出提示請使用者選取會員後再做刪除
            alert("請選取要刪除的會員");
        } else {
            var confirmDelete = confirm("確定要刪除這筆會員資料？　＊注意!　此動作無法復原！！");　//跳除confirm視窗詢是否刪除
            if (confirmDelete == true) {
                // 抓取ＩＤ
                var id = $scope.member.id;
                //假設按下確定，呼叫刪除function
                MemberService.deleteMEMBER(id, function (data) {
                    table.destroy();    //摧毀dataTables
                    initial();          //reload dataTables

                    clearScopeMemberObj(); //清空$scope.member 物件
                });
            } else {
                //按下取消不做任何事情
            }
        }
    };
    /**-----------------------------------------click event zone end-------------------------------------------- */


    /**-----------------------------------------function zone start---------------------------------------------- */
    //initial() 開始時會做的事: 1.顯示LoadingOverlay 2.營養顧問dropdown list名單抓取 3.會員資料初始取得存入datatables
    function initial() {
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

            //先讓資料用timeout讀入datatables，再call其他
            setTimeout(function () {
                //呼叫datatables
                $(document).ready(function () {
                    table = $('#example').DataTable({
                        "order": [[0, "desc"]],         //用ＩＤ當排序，遞減
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

                    //row點擊事件，get遭點擊的會員資料，並顯示到表格上
                    $('#example tbody').on('click', 'tr', function () {
                        //點選row會有顏色改變，注解掉的部分是因為不希望重複點集會取消顏色
                        /*if ( $(this).hasClass('selected') ) {
                            $(this).removeClass('selected');
                        }
                        else {*/
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        //}

                        $scope.readonly = true;     //將欄位都變唯獨

                        //存取抓出選取會員資料的變數
                        var data = table.row(this).data();
                        var id = data[0];
                        //開始抓取
                        MemberService.getOneMEMBER(id, function (data) {
                            //console.log(data);
                            $scope.member.attrib09 = data[0].Attrib09;
                            $scope.member.attrib01 = data[0].Attrib01;
                            $scope.member.attrib05 = data[0].Attrib05;
                            $scope.member.attrib19 = data[0].Attrib19;
                            $scope.member.attrib20 = data[0].Attrib20;
                            $scope.member.attrib21 = data[0].Attrib21;
                            $scope.member.attrib08 = data[0].Attrib08;
                            $scope.member.user = data[0].User;
                            $scope.member.attrib10 = data[0].Attrib10;
                            $scope.member.attrib11 = data[0].Attrib11;
                            $scope.member.attrib25 = data[0].Attrib25;
                            $scope.member.attrib12 = data[0].Attrib12;
                            $scope.member.attrib13 = data[0].Attrib13;
                            $scope.member.attrib14 = data[0].Attrib14;
                            $scope.member.attrib15 = data[0].Attrib15;
                            $scope.member.id = data[0].ID;
                            $scope.member.type = data[0].Type;
                            //console.log(data[0].Attrib04);

                            //資料庫沒正規劃，所以要判端預產期是否為null，是的話不做事把變數歸零，不是的話傳上去表單顯示
                            if (data[0].Attrib04) {
                                $scope.attrib04_0_TMP = data[0].Attrib04.split("<br>")[0];
                                $scope.attrib04_1_TMP = data[0].Attrib04.split("<br>")[1];
                                $scope.attrib04_2_TMP = data[0].Attrib04.split("<br>")[2];
                                // console.log(data[0].Attrib04.split("<br>")[1])
                            } else {
                                $scope.attrib04_0_TMP = '';
                                $scope.attrib04_1_TMP = '';
                                $scope.attrib04_2_TMP = '';
                            }
                            if (data[0].Attrib03) {
                                $scope.attrib03_0_TMP = data[0].Attrib03.split("<br>")[0];
                                $scope.attrib03_1_TMP = data[0].Attrib03.split("<br>")[1];
                                $scope.attrib03_2_TMP = data[0].Attrib03.split("<br>")[2];
                                // console.log(data[0].Attrib04.split("<br>")[1])
                            } else {
                                $scope.attrib03_0_TMP = '';
                                $scope.attrib03_1_TMP = '';
                                $scope.attrib03_2_TMP = '';
                            }
                            if (data[0].Attrib02) {
                                $scope.attrib02_0_TMP = data[0].Attrib02.split("<br>")[0];
                                $scope.attrib02_1_TMP = data[0].Attrib02.split("<br>")[1];
                                $scope.attrib02_2_TMP = data[0].Attrib02.split("<br>")[2];
                                // console.log(data[0].Attrib04.split("<br>")[1])
                            } else {
                                $scope.attrib02_0_TMP = '';
                                $scope.attrib02_1_TMP = '';
                                $scope.attrib02_2_TMP = '';
                            }
                            if (data[0].Attrib16) {
                                $scope.attrib16_0_TMP = data[0].Attrib16.split("<br>")[0];
                                $scope.attrib16_1_TMP = data[0].Attrib16.split("<br>")[1];
                                $scope.attrib16_2_TMP = data[0].Attrib16.split("<br>")[2];
                                // console.log(data[0].Attrib04.split("<br>")[1])
                            } else {
                                $scope.attrib16_0_TMP = '';
                                $scope.attrib16_1_TMP = '';
                                $scope.attrib16_2_TMP = '';
                            }
                            if (data[0].Attrib17) {
                                $scope.attrib17_0_TMP = data[0].Attrib17.split("<br>")[0];
                                $scope.attrib17_1_TMP = data[0].Attrib17.split("<br>")[1];
                                $scope.attrib17_2_TMP = data[0].Attrib17.split("<br>")[2];
                                // console.log(data[0].Attrib04.split("<br>")[1])
                            } else {
                                $scope.attrib17_0_TMP = '';
                                $scope.attrib17_1_TMP = '';
                                $scope.attrib17_2_TMP = '';
                            }

                            $scope.member.attrib22 = data[0].Attrib22;
                            $scope.member.attrib23 = data[0].Attrib23;
                            $scope.member.attrib24 = data[0].Attrib24;
                            $scope.member.upid = data[0].UpID;  //營養顧問

                            // console.log($scope.member);
                        });

                        //alert('You clicked on ' + data[0] + '\'s row');
                    });
                    // Hide it after 0.1 seconds
                    $.LoadingOverlay("hide");
                }, 200);
            });
        });
    }

    function clearScopeMemberObj() {
        //用迴圈將所有值設為null
        for (var p in $scope.member) {
            if ($scope.member.hasOwnProperty(p)) {
                $scope.member[p] = null;
            }
        }
        $scope.attrib04_0_TMP = null;
        $scope.attrib04_1_TMP = null;
        $scope.attrib04_2_TMP = null;
        $scope.attrib03_0_TMP = null;
        $scope.attrib03_1_TMP = null;
        $scope.attrib03_2_TMP = null;
        $scope.attrib02_0_TMP = null;
        $scope.attrib02_1_TMP = null;
        $scope.attrib02_2_TMP = null;
        $scope.attrib16_0_TMP = null;
        $scope.attrib16_1_TMP = null;
        $scope.attrib16_2_TMP = null;
        $scope.attrib17_0_TMP = null;
        $scope.attrib17_1_TMP = null;
        $scope.attrib17_2_TMP = null;
    }
    /**-------------------------------------------function zone end---------------------------------------------- */
});