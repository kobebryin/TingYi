angular.module('TinYi').service('monthMealService', function ($rootScope, $http) {
    //新增餐點資料
    this.postMeal = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'meal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //刪除餐點資料
    this.deleteMeal = function (id, callback) {
        $http.delete($rootScope.apiUrl + 'meal?MemberID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

})