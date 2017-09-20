angular.module('TinYi').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "views/index.html",
      controller: "IndexController"
    })
    .state('page2', {
      url: "/page2",
      templateUrl: "views/page2.html"/*,
      controller: "IndexController"*/
    })
    //月子餐明細查詢
    .state('monthlyMealDetails', {
      url: "/monthlyMealDetails",
      templateUrl: "views/monthlyMealDetails.html",
      controller: "monthlyMealDetailsController"
    })
    //調理餐明細查詢
    .state('conditionMealDetails', {
      url: "/conditionMealDetails",
      templateUrl: "views/conditionMealDetails.html",
      controller: "conditionMealDetailsController"
    })
    //會員資料
    .state('memberData', {
      url: "/memberData",
      templateUrl: "views/memberData.html",
      controller: "memberDataController"
    })
    //月子餐
    .state('monthMeal', {
      url: "/monthMeal",
      templateUrl: "views/monthMeal.html",
      controller: "monthMealController"
    });
});