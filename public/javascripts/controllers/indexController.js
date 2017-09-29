angular.module('TinYi').controller('IndexController', function ($rootScope, $scope, BbsService) {
    $scope.content = 'Web Developer : Jimmy Liang \n Date: 2017.09.30';

    $scope.showSomething = function(){
        $scope.content = "Steve Chang is gay.";
        BbsService.getBBS(function(data){
            console.log(data);
            $scope.resultList = data;
        });
    };

    $scope.showAlert = function(){
        alert($scope.alertText + $rootScope.apiUrl);
    };
});