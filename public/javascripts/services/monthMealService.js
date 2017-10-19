angular.module('TinYi').service('monthMealService', function ($rootScope, $http) {
    //新增餐點資料
    this.postMeal = function (inputObj, callback) {
        $http.post($rootScope.apiUrl + 'meal', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //查看餐點資料 -- 月子餐
    this.show_data = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/show_data', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改覆蓋餐點資料 -- 月子餐
    this.edit_overwrite_Meal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/updateoverwrite', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改覆蓋餐點資料 -- 調理餐
    this.edit_overwrite_Meal2 = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/updateoverwrite', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改覆蓋餐點資料 -- 一般餐
    this.edit_overwrite_Meal3 = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/updateoverwrite', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改加入餐點資料 -- 月子餐
    this.edit_join_Meal = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/dynamicUpdate', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改加入餐點資料 -- 調理餐
    this.edit_join_Meal2 = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/dynamicUpdate', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

    //修改加入餐點資料 -- 一般餐
    this.edit_join_Meal3 = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/dynamicUpdate', inputObj).success(function (data) {
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

    //月子餐刪除特定日期餐點資料
    this.S_deleteMeal_A = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'meal/deleteA?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S_putMeal_A = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/deleteA', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S_deleteMeal_B = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'meal/deleteB?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S_putMeal_B = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/deleteB', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S_deleteMeal_C = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'meal/deleteC?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S_putMeal_C = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'meal/deleteC', inputObj).success(function (data) {
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
    //調理餐刪除特定日期餐點資料
    this.S2_deleteMeal_A = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForConditionMeal/deleteA?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S2_putMeal_A = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/deleteA', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S2_deleteMeal_B = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForConditionMeal/deleteB?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S2_putMeal_B = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/deleteB', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S2_deleteMeal_C = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForConditionMeal/deleteC?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S2_putMeal_C = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForConditionMeal/deleteC', inputObj).success(function (data) {
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
    //一般餐刪除特定日期餐點資料
    this.S3_deleteMeal_A = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForNormalMeal/deleteA?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S3_putMeal_A = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/deleteA', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S3_deleteMeal_B = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForNormalMeal/deleteB?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S3_putMeal_B = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/deleteB', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S3_deleteMeal_C = function (delete_data, callback) {
        $http.delete($rootScope.apiUrl + 'memberForNormalMeal/deleteC?id=' + delete_data.id + "&date=" + delete_data.date).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }
    this.S3_putMeal_C = function (inputObj, callback) {
        $http.put($rootScope.apiUrl + 'memberForNormalMeal/deleteC', inputObj).success(function (data) {
            // you can do some processing here
            callback(data);
        });
    }

})