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
    .state("edit", {
      url: "/",
      templateUrl: "partials/edit.html",
      controller: "editCtrl"
    })
    .state("add", {
      url: "/",
      templateUrl: "partials/add.html",
      controller: "addCtrl"
    })
});
