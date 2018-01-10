angular.module('TinYi').controller('changePasswordController', function ($rootScope, $scope, MemberService) {

    $scope.password = {
        id : sessionStorage.userId,
        password : "",
        password_A : ""
    };

    $scope.changePS_btn = function () {

        if($scope.password.password !== "" && $scope.password.password_A !== ""){
            if($scope.password.password == $scope.password.password_A){
                MemberService.changePS($scope.password, function (data) {
                    alert('更改成功');
                    $scope.password.password = "";
                    $scope.password.password_A = "";
                });
            }else{
                alert('新密碼確認不相同，請再確認!');
            }
        }else{
            alert('輸入框不可為空白!');
        }

    };

    

});    