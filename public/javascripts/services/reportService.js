angular.module('TinYi').service('reportService', function ($rootScope, $http, $httpParamSerializer) {

    //搜尋會員資料
    this.postSearch = function (inputObj, callback) {
        console.log(inputObj);

        // //post method
        // $http({
        //     method: 'POST',
        //     url: $rootScope.apiUrl + 'reportApi',
        //     dataType: 'json',
        //     data: inputObj,
        //     cache: false,
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .success(function (response) {
        //         callback(response);
        //     })
        //     .error(function (error) {
        //         alert(error);
        //     });
        $http.post($rootScope.apiUrl + 'reportApi', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //搜尋會員名字
    this.getSearchID = function (id, callback) {
        $http.get($rootScope.apiUrl + 'searchConditionMealApi?ID=' + id).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //搜尋送餐報表資料
    this.postAllSearch = function (inputObj, callback) {
        console.log(inputObj);

        $http.post($rootScope.apiUrl + 'reportAllApi', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
})