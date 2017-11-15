angular.module('TinYi').service('MemberService', function ($rootScope, $http) {
    //抓取所有會員資料
    this.getMEMBER = function (userID , callback) {
        $http.get($rootScope.apiUrl + 'member?UserID=' + userID).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //新增會員資料
    this.postMEMBER = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'member', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改會員資料
    this.putMEMBER = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'member', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //選取會員時抓取單一會員資料進入表單
    this.getOneMEMBER = function ( id, callback) {
        $http.get($rootScope.apiUrl + 'memberOne?ID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //營養顧問dropdown list名單抓取
    this.getSalesList = function (callback) {
        $http.get($rootScope.apiUrl + 'saleslist').success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //刪除會員資料
    this.deleteMEMBER = function (id, callback) {
        $http.delete($rootScope.apiUrl + 'member?ID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //月子餐頁面日期早午晚存檔
    this.putMEMBERforMonthMeal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForMeal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //月子餐頁面病理種類總餐數存檔
    this.putMEMBERMEALforMonthMeal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForMeal/mealSickType', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //調理餐頁面日期午存檔
    this.putMEMBERforConditionMeal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //調理餐頁面病理種類總餐數存檔
    this.putMEMBERMEALforConditionMeal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/mealSickType', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //一般餐頁面日期午存檔
    this.putMEMBERforNormalMeal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //一般餐頁面病理種類總餐數存檔
    this.putMEMBERMEALforNormalMea = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/mealSickType', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }


    //get Session ID
    this.getSessionID = function (callback) {
        $http.get($rootScope.apiUrl + 'users/getSessionID').success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }



})