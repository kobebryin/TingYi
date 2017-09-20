angular.module('TinYi').controller('monthMealController', function ($rootScope, $scope) {
    
    $('#month_calendar_morning').multiDatesPicker();
    $('#month_calendar_noon').multiDatesPicker();
    $('#month_calendar_night').multiDatesPicker();

    $scope.a = function(){
        var dates = $('#month_calendar_morning').multiDatesPicker('getDates');
        console.log(dates);
    };
});