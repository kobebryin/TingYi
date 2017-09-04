angular.module('TinYi').controller('monthlyMealDetailsController', function ($rootScope, $scope, MemberService) {
    // $("#datepicker").datepicker(    );
    var date = $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd', changeMonth: true,
        changeYear: true
    }).val();
});