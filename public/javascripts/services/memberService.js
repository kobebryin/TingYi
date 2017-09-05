angular.module('TinYi').service('MemberService', function ($rootScope, $http) {
    this.getMEMBER = function (callback) {
        $http.get($rootScope.apiUrl + 'member').success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    this.postMEMBER = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'member', inputObj).success(function (data) {
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
})