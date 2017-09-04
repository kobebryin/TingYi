angular.module('TinYi').controller('conditionMealDetailsController', function ($rootScope, $scope, MemberService) {
        // $("#datepicker").datepicker(    );
        var date = $('#datepicker').datepicker({
                dateFormat: 'yy-mm-dd', changeMonth: true,
                changeYear: true
        }).val();
});