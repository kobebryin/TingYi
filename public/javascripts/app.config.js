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
    .state('memberData', {
      url: "/memberData",
      templateUrl: "views/memberData.html",
      controller: "memberDataController"
    });
});