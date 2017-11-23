angular.module('TinYi').controller('memberDataController', function ($rootScope, $scope, MemberService) {
    $scope.readonly = false;    //欄位唯獨狀態變數
    var table;                  //將JQUERY dataTables 設為全域變數
    var save_falg = false;      //判斷是否可以按下保存的flag
    var saveORupdate_falr = true;   //判斷使用者是選擇新增或是修改，true回新增、false為修改
    var Today = new Date();           //日期
    var client_ip;              //客戶端IP位置
    $scope.tabFlag = true;  //餐類按鈕可否點擊flag
    $scope.searchName = '';

    //購買餐類checkbox物件
    $scope.checkboxModel = {
        value1: false,
        value2: false,
        value3: false,
        value4: false,
        value5: false,
        value6: false,
        value7: false,
        value8: false,
        value9: false,
        value10: false
    };

    //dataTables用的會員類型分類
    $scope.typeMappingForDataTables = [
        { value: 0, name: '最高權限管理人員' },
        { value: 1, name: '管理人員' },
        { value: 2, name: '寫單人員' },
        { value: 3, name: '營養顧問' },
        { value: 4, name: '醫院' },
        { value: 5, name: '客戶' }];

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

    //  此頁開始時先呼叫initial()
    initial();

    //取得客戶單IP位址
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        client_ip = data.ip;
        console.log(data.ip);
    });;

    /**-----------------------------------------click event zone start----------------------------------------- */
    //進入月子餐頁面
    $scope.goToMonthMeal = function () {
        location.href = '/#/monthMeal';
        sessionStorage.memberid = $scope.member.id;
        sessionStorage.membername = $scope.member.attrib01;
    };

    $rootScope.goToConditionMeal = function () {
        location.href = '/#/conditionMeal';
        sessionStorage.memberid = $scope.member.id;
        sessionStorage.membername = $scope.member.attrib01;
    };

    $rootScope.goToNormalMeal = function () {
        location.href = '/#/normalMeal';
        sessionStorage.memberid = $scope.member.id;
        sessionStorage.membername = $scope.member.attrib01;
    };

    //新增資料上ＭySQL
    $scope.postMEMBER = function () {

        if (!save_falg) {
            alert("請點選[新增]或者[修改]");
        } else {

            if (saveORupdate_falr) {    //做新增會員的部分
                if ($scope.member.attrib01 == null) {   //判斷使用者必輸項有無輸入，如果沒輸入跳出提醒
                    clearScopeMemberObj(); //清空$scope.member 物件
                    alert("欄位 [姓名] 為必輸項!");
                } else if ($scope.member.user == null) {
                    clearScopeMemberObj(); //清空$scope.member 物件
                    alert("欄位 [手機] 為必輸項!");
                } else {
                    //存入登入者ID
                    $scope.member.mid = sessionStorage.userId;
                    $scope.member.mid2 = sessionStorage.userId;
                    $scope.member.flag = 9;

                    //存入客戶端IP
                    $scope.member.mip = client_ip;
                    $scope.member.mip2 = client_ip;

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

                    //午,晚餐easy-ui conboxbox值設定
                    easy_ui_setting();

                    //購買餐類的塞值
                    checkboxModel();

                    //先判斷有無輸入資料、有的話:餐點修改、特殊情況新增(加入年-月-日 : content)
                    if ($scope.attrib06_TMP != null) {
                        $scope.member.attrib06 = Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib06_TMP;
                    } else { }
                    if ($scope.attrib07_TMP != null) {
                        $scope.member.attrib07 = Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib07_TMP;
                    } else { }

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.member.createtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.member.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.member.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    //console.log($scope.member);

                    MemberService.postMEMBER($scope.member, function (data) {
                        table.destroy();    //摧毀dataTables
                        initial();          //reload dataTables

                        clearScopeMemberObj(); //清空$scope.member 物件
                        console.log(data);
                    });
                }
            } else {    //做修改會員的部分

                if ($scope.member.attrib01 == null) {   //判斷使用者必輸項有無輸入，如果沒輸入跳出提醒
                    clearScopeMemberObj(); //清空$scope.member 物件
                    alert("欄位 [姓名] 為必輸項!");
                } else if ($scope.member.user == null) {
                    clearScopeMemberObj(); //清空$scope.member 物件
                    alert("欄位 [手機] 為必輸項!");
                } else {
                    //存入登入者ID
                    $scope.member.mid = sessionStorage.userId;
                    $scope.member.mid2 = sessionStorage.userId;
                    $scope.member.flag = 9;

                    //存入客戶端IP
                    $scope.member.mip = client_ip;
                    $scope.member.mip2 = client_ip;

                    //修改手機會造成密碼消失所以加入以下:
                    $scope.member.password = $scope.member.user;

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

                    //午,晚餐easy-ui conboxbox值設定
                    easy_ui_setting();
                    //購買餐類的塞值
                    checkboxModel();

                    //先判斷有無輸入資料、有的話:餐點修改、特殊情況新增(加入<br>年-月-日 : content)
                    if ($scope.attrib06_TMP != null) {
                        if ($scope.member.attrib06 != null) {
                            $scope.member.attrib06 += '<br>' + Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib06_TMP;
                        } else {
                            $scope.member.attrib06 = Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib06_TMP;
                        }
                    } else { }
                    if ($scope.attrib07_TMP != null) {
                        if ($scope.member.attrib07 != null) {
                            $scope.member.attrib07 += '<br>' + Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib07_TMP;
                        } else {
                            $scope.member.attrib07 = Today.getFullYear() + '-' + (Today.getMonth() + 1) + '-' + Today.getDate() + ':' + $scope.attrib07_TMP;
                        }
                    } else { }

                    //CreateTime、RecordTime、ShowTime initialize
                    $scope.member.recordtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();
                    $scope.member.showtime = Today.getUTCFullYear() + '-' + (Today.getUTCMonth() + 1) + '-' + Today.getUTCDate() + " " + Today.getUTCHours() + ":" + Today.getUTCMinutes() + ":" + Today.getUTCSeconds();

                    // console.log($scope.member);

                    MemberService.putMEMBER($scope.member, function (data) {
                        table.destroy();    //摧毀dataTables
                        initial();          //reload dataTables

                        clearScopeMemberObj(); //清空$scope.member 物件
                    });
                }
            }
        }
    };

    //修改按鈕
    $scope.updateMEMBER = function () {
        if ($scope.member.id == null) {     //判斷有無選取會員，如無選取會員則跳出提示請使用者選取會員後再做修改
            alert("請選取要修改的會員");
        } else {
            //將欄位唯獨關閉
            close_readonly();

            //改成修改模式
            saveORupdate_falr = false;

            //餐點修改、特殊情況欄位清空
            $scope.attrib06_TMP = null;
            $scope.attrib07_TMP = null;

            //可以按下保存
            save_falg = true;

        }
    };

    //新增清空欄位
    $scope.createNewMEMBER = function () {
        //datatables假如有欄位被選擇反白，將反白取消。
        table.$('tr.selected').removeClass('selected');

        //TAB按鈕不能按因為沒點選客戶
        $scope.tabFlag = true;

        //將欄位唯獨關閉
        close_readonly();

        //改成修改模式
        saveORupdate_falr = true;

        //可以按下保存
        save_falg = true;

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

    //搜尋會員資料按鈕觸發事件
    $scope.searchMember = function () {

        if ($scope.searchName !== '') {
            $("#example").dataTable().fnDestroy();
            // Show full page LoadingOverlay
            $.LoadingOverlay("show");

            MemberService.getMEMBERver2($scope.searchName, function (data) {
                $scope.getMember = data;

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
                            //有點選會員時不行按下保存
                            save_falg = false;
                            $scope.tabFlag = false;

                            //點選row會有顏色改變，注解掉的部分是因為不希望重複點集會取消顏色
                            /*if ( $(this).hasClass('selected') ) {
                                $(this).removeClass('selected');
                            }
                            else {*/
                            table.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            //}

                            //將欄位都變唯獨
                            open_readonly();

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
                                $('#dinner_addr').combobox('setValue', $scope.member.attrib15);
                                $('#lunch_addr').combobox('setValue', $scope.member.attrib14);

                                //(禁忌)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                                if ($scope.member.attrib05 != null) {
                                    var attrib05setArray = [];
                                    var attrib05Array = $scope.member.attrib05.split(",");
                                    for (key in attrib05Array) {
                                        attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                                    }
                                    $('#id_input_Member_Info_Attrib05').combotree('setValue', attrib05setArray);
                                } else {
                                    $('#id_input_Member_Info_Attrib05').combotree('setValue', '');
                                }

                                //(贈品)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                                if ($scope.member.attrib08 != null) {
                                    var attrib08setArray = [];
                                    var attrib08Array = $scope.member.attrib08.split(",");
                                    for (key in attrib08Array) {
                                        attrib08setArray.push({ id: attrib08Array[key], text: attrib08Array[key] });
                                    }
                                    $('#id_input_Member_Info_Attrib08').combotree('setValue', attrib08setArray);
                                } else {
                                    $('#id_input_Member_Info_Attrib08').combotree('setValue', '');
                                }

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
                                $scope.member.attrib06 = data[0].Attrib06;
                                $scope.member.attrib07 = data[0].Attrib07;
                                $scope.member.attrib18 = data[0].Attrib18;  //購買餐類
                                //CreateTime、RecordTime、ShowTime initialize
                                $scope.member.createtime = data[0].CreateTime;
                                $scope.member.recordtime = data[0].RecordTime;
                                $scope.member.showtime = data[0].ShowTime;

                                //餐點修改、特殊情況要判斷使否有值，有的話再切
                                if ($scope.member.attrib06 != null) {
                                    $scope.attrib06_TMP = $scope.member.attrib06.split('<br>'); //餐點修改
                                } else { }
                                if ($scope.member.attrib07 != null) {
                                    $scope.attrib07_TMP = $scope.member.attrib07.split('<br>'); //特殊情況
                                } else { }

                                //清空checkboxModel
                                clearScopeCheckModelObj();
                                //購買餐類checkbox要判斷使否有值，有的話再切
                                if ($scope.member.attrib18 != null) {
                                    var attrib18 = [];
                                    attrib18 = $scope.member.attrib18.split("<br><br>itoscarbr");
                                    for (key in attrib18) {
                                        if (attrib18[key].split("<br>")[0] === "經典住院餐") {
                                            $scope.checkboxModel.value1 = true;
                                            $scope.Attrib18_TMP_1 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "經典月子餐") {
                                            $scope.checkboxModel.value2 = true;
                                            $scope.Attrib18_TMP_2 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "溫馨住院餐") {
                                            $scope.checkboxModel.value3 = true;
                                            $scope.Attrib18_TMP_3 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "溫馨月子餐") {
                                            $scope.checkboxModel.value4 = true;
                                            $scope.Attrib18_TMP_4 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "經典小產餐") {
                                            $scope.checkboxModel.value5 = true;
                                            $scope.Attrib18_TMP_5 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "經典孕哺餐") {
                                            $scope.checkboxModel.value6 = true;
                                            $scope.Attrib18_TMP_6 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "經典孕期餐") {
                                            $scope.checkboxModel.value7 = true;
                                            $scope.Attrib18_TMP_7 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "術後調理餐") {
                                            $scope.checkboxModel.value8 = true;
                                            $scope.Attrib18_TMP_8 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "調理餐") {
                                            $scope.checkboxModel.value9 = true;
                                            $scope.Attrib18_TMP_9 = attrib18[key].split("<br>")[1];
                                        }
                                        if (attrib18[key].split("<br>")[0] === "一般餐") {
                                            $scope.checkboxModel.value10 = true;
                                            $scope.Attrib18_TMP_10 = attrib18[key].split("<br>")[1];
                                        }
                                    }
                                } else { }

                                // console.log( $scope.member.attrib07.split('<br>'));
                            });

                            //alert('You clicked on ' + data[0] + '\'s row');
                        });
                        // Hide it after 0.1 seconds
                        $.LoadingOverlay("hide");
                    }, 200);
                });
                $.LoadingOverlay("hide");
            });
        } else {
            alert('請輸入欲查詢之會員姓名!');
        }
    };

    /**-----------------------------------------click event zone end-------------------------------------------- */


    /**-----------------------------------------function zone start---------------------------------------------- */
    //initial() 開始時會做的事: 1.顯示LoadingOverlay 2.營養顧問dropdown list名單抓取 3.會員資料初始取得存入datatables
    function initial() {

        sessionStorage.memberid = null;　    //將點選會員的ID從SessionStorage中清空
        sessionStorage.membername = null;　    //將點選會員的ID從SessionStorage中清空        
        $rootScope.id = null;

        //營養顧問dropdown list名單抓取
        MemberService.getSalesList(function (data) {
            $scope.saleslist = data;

            // 營養顧問dropdown list名單預設
            for (key in $scope.saleslist) {
                // console.log(data.id == $scope.saleslist[key].ID);
                if ( sessionStorage.userId == $scope.saleslist[key].ID) $scope.member.upid =  parseInt(sessionStorage.userId);
            }

        });

        //午,晚餐地址combobox設定
        $('#dinner_addr').combobox({
            url: $rootScope.apiUrl + 'fieldvalue',
            valueField: 'id',
            textField: 'text'
        });
        $('#lunch_addr').combobox({
            url: $rootScope.apiUrl + 'fieldvalue',
            valueField: 'id',
            textField: 'text'
        });
        $('#id_input_Member_Info_Attrib05').combotree({
            url: $rootScope.apiUrl + 'fieldvalueAttrib05',
            multiple: true,
            cascadeCheck:'',
            valueField: 'id',
            textField: 'text'
        });
        $('#id_input_Member_Info_Attrib08').combotree({
            url: $rootScope.apiUrl + 'fieldvalueAttrib08',
            multiple: true,
            valueField: 'id',
            textField: 'text'
        });

        $.LoadingOverlay("show");

        //將登入者ID存進SessionStorage
        MemberService.getSessionID(function (data) {
            //登入者ID與類型初始化
            if (typeof sessionStorage.userId == 'undefined' && sessionStorage.userId == null) {
                sessionStorage.userId = data.id;
                sessionStorage.loginType = data.loginType;
            }

            if (sessionStorage.loginType == 1 || sessionStorage.loginType == 0) {     //Type = 0or 1(最高權限 或 管理人員) 可以修改刪除新增
                $scope.c_loginTypeReadonly = false;
                $scope.u_loginTypeReadonly = false;
                $scope.d_loginTypeReadonly = false;
                $scope.p_loginTypeReadonly = false;
            } else if (sessionStorage.loginType == 2) {       //Type = 2 (寫單人員)不行修改刪除但可新增
                $scope.c_loginTypeReadonly = false;
                $scope.u_loginTypeReadonly = true;
                $scope.d_loginTypeReadonly = true;
                $scope.p_loginTypeReadonly = false;
            } else {                                           //Type = 4 (營養師)不行刪除，但可新增、修改  
                $scope.c_loginTypeReadonly = false;
                $scope.u_loginTypeReadonly = false;
                $scope.d_loginTypeReadonly = true;
                $scope.p_loginTypeReadonly = false;
            }

            if (sessionStorage.loginType != 0) {  //登入會員類型不是最高權限的話，只能新增會員類型為客戶
                //會員類型分類
                $scope.typeMapping = [
                    { value: 5, name: '客戶' }
                ];
            }

            //先判斷session還有沒有(怕閒置超過10分鐘)
            // if (typeof data.id != 'undefined') {
            //會員資料初始取得存入datatables
            // MemberService.getMEMBER(data.id, function (data) {
            $scope.getMember = '';
            // $scope.getMember = data;
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
                    // $('#example tbody').on('click', 'tr', function () {
                    //     //有點選會員時不行按下保存
                    //     save_falg = false;
                    //     $scope.tabFlag = false;

                    //     //點選row會有顏色改變，注解掉的部分是因為不希望重複點集會取消顏色
                    //     /*if ( $(this).hasClass('selected') ) {
                    //         $(this).removeClass('selected');
                    //     }
                    //     else {*/
                    //     table.$('tr.selected').removeClass('selected');
                    //     $(this).addClass('selected');
                    //     //}

                    //     //將欄位都變唯獨
                    //     open_readonly();

                    //     //存取抓出選取會員資料的變數
                    //     var data = table.row(this).data();
                    //     console.log(data);
                    //     var id = data[0];
                    //     //開始抓取
                    //     MemberService.getOneMEMBER(id, function (data) {
                    //         //console.log(data);
                    //         $scope.member.attrib09 = data[0].Attrib09;
                    //         $scope.member.attrib01 = data[0].Attrib01;
                    //         $scope.member.attrib05 = data[0].Attrib05;
                    //         $scope.member.attrib19 = data[0].Attrib19;
                    //         $scope.member.attrib20 = data[0].Attrib20;
                    //         $scope.member.attrib21 = data[0].Attrib21;
                    //         $scope.member.attrib08 = data[0].Attrib08;
                    //         $scope.member.user = data[0].User;
                    //         $scope.member.attrib10 = data[0].Attrib10;
                    //         $scope.member.attrib11 = data[0].Attrib11;
                    //         $scope.member.attrib25 = data[0].Attrib25;
                    //         $scope.member.attrib12 = data[0].Attrib12;
                    //         $scope.member.attrib13 = data[0].Attrib13;
                    //         $scope.member.attrib14 = data[0].Attrib14;
                    //         $scope.member.attrib15 = data[0].Attrib15;
                    //         $scope.member.id = data[0].ID;
                    //         $scope.member.type = data[0].Type;
                    //         $('#dinner_addr').combobox('setValue', $scope.member.attrib15);
                    //         $('#lunch_addr').combobox('setValue', $scope.member.attrib14);

                    //         //(禁忌)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                    //         if ($scope.member.attrib05 != null) {
                    //             var attrib05setArray = [];
                    //             var attrib05Array = $scope.member.attrib05.split(",");
                    //             for (key in attrib05Array) {
                    //                 attrib05setArray.push({ id: attrib05Array[key], text: attrib05Array[key] });
                    //             }
                    //             $('#id_input_Member_Info_Attrib05').combotree('setValue', attrib05setArray);
                    //         } else {
                    //             $('#id_input_Member_Info_Attrib05').combotree('setValue', '');
                    //         }

                    //         //(贈品)easy-ui combotree 要能夠讓值放入並且顯示勾選，要塞入物件
                    //         if ($scope.member.attrib08 != null) {
                    //             var attrib08setArray = [];
                    //             var attrib08Array = $scope.member.attrib08.split(",");
                    //             for (key in attrib08Array) {
                    //                 attrib08setArray.push({ id: attrib08Array[key], text: attrib08Array[key] });
                    //             }
                    //             $('#id_input_Member_Info_Attrib08').combotree('setValue', attrib08setArray);
                    //         } else {
                    //             $('#id_input_Member_Info_Attrib08').combotree('setValue', '');
                    //         }

                    //         //console.log(data[0].Attrib04);

                    //         //資料庫沒正規劃，所以要判端預產期是否為null，是的話不做事把變數歸零，不是的話傳上去表單顯示
                    //         if (data[0].Attrib04) {
                    //             $scope.attrib04_0_TMP = data[0].Attrib04.split("<br>")[0];
                    //             $scope.attrib04_1_TMP = data[0].Attrib04.split("<br>")[1];
                    //             $scope.attrib04_2_TMP = data[0].Attrib04.split("<br>")[2];
                    //             // console.log(data[0].Attrib04.split("<br>")[1])
                    //         } else {
                    //             $scope.attrib04_0_TMP = '';
                    //             $scope.attrib04_1_TMP = '';
                    //             $scope.attrib04_2_TMP = '';
                    //         }
                    //         if (data[0].Attrib03) {
                    //             $scope.attrib03_0_TMP = data[0].Attrib03.split("<br>")[0];
                    //             $scope.attrib03_1_TMP = data[0].Attrib03.split("<br>")[1];
                    //             $scope.attrib03_2_TMP = data[0].Attrib03.split("<br>")[2];
                    //             // console.log(data[0].Attrib04.split("<br>")[1])
                    //         } else {
                    //             $scope.attrib03_0_TMP = '';
                    //             $scope.attrib03_1_TMP = '';
                    //             $scope.attrib03_2_TMP = '';
                    //         }
                    //         if (data[0].Attrib02) {
                    //             $scope.attrib02_0_TMP = data[0].Attrib02.split("<br>")[0];
                    //             $scope.attrib02_1_TMP = data[0].Attrib02.split("<br>")[1];
                    //             $scope.attrib02_2_TMP = data[0].Attrib02.split("<br>")[2];
                    //             // console.log(data[0].Attrib04.split("<br>")[1])
                    //         } else {
                    //             $scope.attrib02_0_TMP = '';
                    //             $scope.attrib02_1_TMP = '';
                    //             $scope.attrib02_2_TMP = '';
                    //         }
                    //         if (data[0].Attrib16) {
                    //             $scope.attrib16_0_TMP = data[0].Attrib16.split("<br>")[0];
                    //             $scope.attrib16_1_TMP = data[0].Attrib16.split("<br>")[1];
                    //             $scope.attrib16_2_TMP = data[0].Attrib16.split("<br>")[2];
                    //             // console.log(data[0].Attrib04.split("<br>")[1])
                    //         } else {
                    //             $scope.attrib16_0_TMP = '';
                    //             $scope.attrib16_1_TMP = '';
                    //             $scope.attrib16_2_TMP = '';
                    //         }
                    //         if (data[0].Attrib17) {
                    //             $scope.attrib17_0_TMP = data[0].Attrib17.split("<br>")[0];
                    //             $scope.attrib17_1_TMP = data[0].Attrib17.split("<br>")[1];
                    //             $scope.attrib17_2_TMP = data[0].Attrib17.split("<br>")[2];
                    //             // console.log(data[0].Attrib04.split("<br>")[1])
                    //         } else {
                    //             $scope.attrib17_0_TMP = '';
                    //             $scope.attrib17_1_TMP = '';
                    //             $scope.attrib17_2_TMP = '';
                    //         }

                    //         $scope.member.attrib22 = data[0].Attrib22;
                    //         $scope.member.attrib23 = data[0].Attrib23;
                    //         $scope.member.attrib24 = data[0].Attrib24;
                    //         $scope.member.upid = data[0].UpID;  //營養顧問
                    //         $scope.member.attrib06 = data[0].Attrib06;
                    //         $scope.member.attrib07 = data[0].Attrib07;
                    //         $scope.member.attrib18 = data[0].Attrib18;  //購買餐類
                    //         //CreateTime、RecordTime、ShowTime initialize
                    //         $scope.member.createtime = data[0].CreateTime;
                    //         $scope.member.recordtime = data[0].RecordTime;
                    //         $scope.member.showtime = data[0].ShowTime;

                    //         //餐點修改、特殊情況要判斷使否有值，有的話再切
                    //         if ($scope.member.attrib06 != null) {
                    //             $scope.attrib06_TMP = $scope.member.attrib06.split('<br>'); //餐點修改
                    //         } else { }
                    //         if ($scope.member.attrib07 != null) {
                    //             $scope.attrib07_TMP = $scope.member.attrib07.split('<br>'); //特殊情況
                    //         } else { }

                    //         //清空checkboxModel
                    //         clearScopeCheckModelObj();
                    //         //購買餐類checkbox要判斷使否有值，有的話再切
                    //         if ($scope.member.attrib18 != null) {
                    //             var attrib18 = [];
                    //             attrib18 = $scope.member.attrib18.split("<br><br>itoscarbr");
                    //             for (key in attrib18) {
                    //                 if (attrib18[key].split("<br>")[0] === "經典住院餐") {
                    //                     $scope.checkboxModel.value1 = true;
                    //                     $scope.Attrib18_TMP_1 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "經典月子餐") {
                    //                     $scope.checkboxModel.value2 = true;
                    //                     $scope.Attrib18_TMP_2 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "溫馨住院餐") {
                    //                     $scope.checkboxModel.value3 = true;
                    //                     $scope.Attrib18_TMP_3 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "溫馨月子餐") {
                    //                     $scope.checkboxModel.value4 = true;
                    //                     $scope.Attrib18_TMP_4 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "經典小產餐") {
                    //                     $scope.checkboxModel.value5 = true;
                    //                     $scope.Attrib18_TMP_5 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "經典孕哺餐") {
                    //                     $scope.checkboxModel.value6 = true;
                    //                     $scope.Attrib18_TMP_6 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "經典孕期餐") {
                    //                     $scope.checkboxModel.value7 = true;
                    //                     $scope.Attrib18_TMP_7 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "術後調理餐") {
                    //                     $scope.checkboxModel.value8 = true;
                    //                     $scope.Attrib18_TMP_8 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "調理餐") {
                    //                     $scope.checkboxModel.value9 = true;
                    //                     $scope.Attrib18_TMP_9 = attrib18[key].split("<br>")[1];
                    //                 }
                    //                 if (attrib18[key].split("<br>")[0] === "一般餐") {
                    //                     $scope.checkboxModel.value10 = true;
                    //                     $scope.Attrib18_TMP_10 = attrib18[key].split("<br>")[1];
                    //                 }
                    //             }
                    //         } else { }

                    // console.log( $scope.member.attrib07.split('<br>'));
                    // });

                    //alert('You clicked on ' + data[0] + '\'s row');
                    // });
                    // Hide it after 0.1 seconds
                }, 0);
            });
            $.LoadingOverlay("hide");
            // });
            // } else {  //假設閒置過久沒有重新登入的話，就踢出去回到登入網址
            //     alert('閒置過久，請重新登入!');
            //     location.href = $rootScope.apiUrl + "users/logout";
            // }
        });
    }

    function clearScopeMemberObj() {
        //用迴圈將所有值設為null
        for (var p in $scope.member) {
            if ($scope.member.hasOwnProperty(p)) {
                $scope.member[p] = null;
            }
        }

        //將會員類型預設客戶(5)
        $scope.member.type = 5;

        //營養顧問預設張書齊
        MemberService.getSalesList(function (data) {
            $scope.saleslist = data;

            // 營養顧問dropdown list名單預設
            for (key in $scope.saleslist) {
                if (sessionStorage.userId == $scope.saleslist[key].ID) $scope.member.upid = parseInt(sessionStorage.userId);
            }

        });

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
        $scope.attrib06_TMP = null;
        $scope.attrib07_TMP = null;

        //清空checkboxModel
        clearScopeCheckModelObj();

        $('#dinner_addr').combobox('setValue', '');
        $('#lunch_addr').combobox('setValue', '');
        $('#id_input_Member_Info_Attrib05').combotree('setValue', '');
        $('#id_input_Member_Info_Attrib08').combotree('setValue', '');
    }

    function clearScopeCheckModelObj() {
        //用迴圈將所有checkboxModel設為false
        for (var p in $scope.checkboxModel) {
            if ($scope.checkboxModel.hasOwnProperty(p)) {
                $scope.checkboxModel[p] = false;
            }
        }
        $scope.Attrib18_TMP_1 = null;
        $scope.Attrib18_TMP_2 = null;
        $scope.Attrib18_TMP_3 = null;
        $scope.Attrib18_TMP_4 = null;
        $scope.Attrib18_TMP_5 = null;
        $scope.Attrib18_TMP_6 = null;
        $scope.Attrib18_TMP_7 = null;
        $scope.Attrib18_TMP_8 = null;
        $scope.Attrib18_TMP_9 = null;
        $scope.Attrib18_TMP_10 = null;
    }

    function easy_ui_setting() {
        //午,晚餐easy-ui conboxbox值設定
        $scope.member.attrib14 = $('#lunch_addr').val();
        $scope.member.attrib15 = $('#dinner_addr').val();
        $scope.member.attrib05 = $('#id_input_Member_Info_Attrib05').val();
        $scope.member.attrib08 = $('#id_input_Member_Info_Attrib08').val();
    }

    function close_readonly() {
        //將欄位唯獨關閉
        $scope.readonly = false;
        $('#dinner_addr').combobox('readonly', false);
        $('#lunch_addr').combobox('readonly', false);
        $('#id_input_Member_Info_Attrib05').combotree('readonly', false);
        $('#id_input_Member_Info_Attrib08').combotree('readonly', false);
    }

    function open_readonly() {
        //將欄位都變唯獨
        $scope.readonly = true;
        $('#dinner_addr').combobox('readonly', true);
        $('#lunch_addr').combobox('readonly', true);
        $('#id_input_Member_Info_Attrib05').combotree('readonly', true);
        $('#id_input_Member_Info_Attrib08').combotree('readonly', true);
    }

    //購買餐類的塞值
    function checkboxModel() {
        if (!$scope.checkboxModel.value1 &&
            !$scope.checkboxModel.value2 &&
            !$scope.checkboxModel.value3 &&
            !$scope.checkboxModel.value4 &&
            !$scope.checkboxModel.value5 &&
            !$scope.checkboxModel.value6 &&
            !$scope.checkboxModel.value7 &&
            !$scope.checkboxModel.value8 &&
            !$scope.checkboxModel.value9 &&
            !$scope.checkboxModel.value10) {

            $scope.member.attrib18 = null;

        } else {

            $scope.member.attrib18 = "<br><br>itoscarbr";
            if ($scope.checkboxModel.value1) {
                $scope.member.attrib18 += "經典住院餐<br>" + $scope.Attrib18_TMP_1 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value2) {
                $scope.member.attrib18 += "經典月子餐<br>" + $scope.Attrib18_TMP_2 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value3) {
                $scope.member.attrib18 += "溫馨住院餐<br>" + $scope.Attrib18_TMP_3 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value4) {
                $scope.member.attrib18 += "溫馨月子餐<br>" + $scope.Attrib18_TMP_4 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value5) {
                $scope.member.attrib18 += "經典小產餐<br>" + $scope.Attrib18_TMP_5 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value6) {
                $scope.member.attrib18 += "經典孕哺餐<br>" + $scope.Attrib18_TMP_6 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value7) {
                $scope.member.attrib18 += "經典孕期餐<br>" + $scope.Attrib18_TMP_7 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value8) {
                $scope.member.attrib18 += "術後調理餐<br>" + $scope.Attrib18_TMP_8 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value9) {
                $scope.member.attrib18 += "調理餐<br>" + $scope.Attrib18_TMP_9 + "<br><br>itoscarbr";
            }
            if ($scope.checkboxModel.value10) {
                $scope.member.attrib18 += "一般餐<br>" + $scope.Attrib18_TMP_10 + "<br><br>itoscarbr";
            }
        }
    }
    /**-------------------------------------------function zone end---------------------------------------------- */
});