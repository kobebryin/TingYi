angular.module('TinYi').service('MemberService', function ($rootScope, $http) {
    //抓取所有會員資料
    this.getMEMBER = function (callback) {
        $http.get($rootScope.apiUrl + 'member').success(function (data) {
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
})