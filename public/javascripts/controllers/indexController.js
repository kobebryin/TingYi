angular.module('TinYi').controller('IndexController', function ($rootScope, $scope, BbsService) {
    $scope.content = 'Hello Jimmy !';

    $scope.showSomething = function(){
        $scope.content = "Jimmy is gay.";
        BbsService.getBBS(function(data){
            console.log(data);
            $scope.resultList = data;
        });
    };

    $scope.showAlert = function(){
        alert($scope.alertText + $rootScope.apiUrl);
    };
});