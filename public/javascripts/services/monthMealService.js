angular.module('TinYi').service('monthMealService', function ($rootScope, $http) {
    //新增餐點資料
    this.postMeal = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'meal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //月子餐刪除餐點資料
    this.deleteMeal_A = function (id, callback) {
        $http.delete($rootScope.apiUrl + 'meal?MemberID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //調理餐刪除餐點資料
    this.deleteMeal_B = function (id, callback) {
        $http.delete($rootScope.apiUrl + 'memberForConditionMeal?MemberID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //一般餐刪除餐點資料
    this.deleteMeal_C = function (id, callback) {
        $http.delete($rootScope.apiUrl + 'memberForNormalMeal?MemberID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

})