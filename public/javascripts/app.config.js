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
    })
    //調理餐
    .state('conditionMeal', {
      url: "/conditionMeal",
      templateUrl: "views/conditionMeal.html",
      controller: "conditionMealController"
    })
    //一般餐
    .state('normalMeal', {
      url: "/normalMeal",
      templateUrl: "views/normalMeal.html",
     controller: "normalMealController"
    })
    //報表
    .state('report', {
      url: "/report",
      templateUrl: "views/report.html",
     controller: "reportController"
    })
    //更改密碼
    .state('changePassword', {
      url: "/changePassword",
      templateUrl: "views/changePassword.html",
     controller: "changePasswordController"
    });
});