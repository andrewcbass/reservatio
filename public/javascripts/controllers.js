"use strict";

var app = angular.module("reservationApp");

app.controller("mainCtrl", function($scope) {

});

//home, shows todays reservations
app.controller("homeCtrl", function($scope, $state, ReservationService) {
  //get all reservations
  ReservationService.getReservations()
    .then(function(res) {
      $scope.reservations = res.data;
    }, function(err) {
      console.log('ERR', err);
    });

  ReservationService.getCurrentReservations()
    .then(function(res) {
      $scope.currentRes = res.data;
    }, function(err) {
      console.log('ERR', err);
    });


  $scope.tdyOrAll = true;
  $scope.toggleTdyOrAll = function() {

    $scope.tdyOrAll = !$scope.tdyOrAll;
    console.log('$SCOPE.TDYORALL', $scope.tdyOrAll);
  };

});

app.controller("editCtrl", function($scope, $state, ReservationService) {

});

app.controller("addCtrl", function($scope, $state, ReservationService) {

});
