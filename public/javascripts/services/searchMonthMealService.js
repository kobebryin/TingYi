angular.module('TinYi').service('searchMonthMealService', function ($rootScope, $http, $httpParamSerializer) {

    //新增會員資料
    this.postSearch = function (inputObj, callback) {
        console.log(inputObj);

        //post method
        $http({
            method: 'POST',
            url: $rootScope.apiUrl + 'searchMonthMealApi',
            dataType: 'json',
            data: inputObj,
            cache: false,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .success(function (response) {
                //$scope.value = response;  
            })
            .error(function (error) {
                alert(error);
            });
        /*$http.post($rootScope.apiUrl + 'searchMonthMealApi', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });*/
    }

})