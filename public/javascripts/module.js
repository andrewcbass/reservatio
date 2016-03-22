"use strict";

angular.module("reservationApp", ["ui.router"])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "partials/home.html",
      controller: "homeCtrl"
    })
    .state("add", {
      url: "/",
      templateUrl: "partials/add.html",
      controller: "addCtrl"
    })
});
