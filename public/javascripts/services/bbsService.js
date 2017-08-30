angular.module('TinYi').service('BbsService', function ($rootScope, $http) {
    this.getBBS = function (callback) {
        $http.get($rootScope.apiUrl + 'bbs').success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
})