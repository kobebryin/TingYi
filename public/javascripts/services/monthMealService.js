angular.module('TinYi').service('monthMealService', function ($rootScope, $http) {
    //新增會員資料
    this.postMeal = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'meal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

})