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
  };

  $scope.deleteReservation = function(reso) {
    var id = reso._id;
    ReservationService.deleteReservation(id)
      .then(function(res) {
        var index = $scope.reservations.indexOf(reso);
        $scope.reservations.splice(index, 1);
        if($scope.currentRes.indexOf(reso) !== -1) {
          var index = $scope.currentRes.indexOf(reso);
          $scope.currentRes.splice(index, 1);
        }
      }, function(err) {
        console.log('ERR', err);
      });
  }

  $scope.showOrEdit = true;
  $scope.editReservation = function(reso) {
    console.log('RESO', reso);
    $scope.showOrEdit = !$scope.showOrEdit;
    $scope.editReso = reso;
  }

  $scope.saveResoEdit = function(valid) {
    if(!valid) return;

    var editedReso = $scope.editReso;
    var id = $scope.editReso._id;
    ReservationService.editReservation(editedReso, id)
      .then(function(res) {
        $scope.showOrEdit = !$scope.showOrEdit;
        $scope.reservations = $scope.reservations.map(function(reso) {
          if(reso._id === id) {
            return editedReso;
          } else {
            return reso;
          }
        });
        if($scope.currentRes.indexOf(editedReso) !== -1) {
          $scope.currentRes = $scope.currentRes.map(function(reso) {
            if(reso._id === id) {
              return editedReso;
            } else {
              return reso;
            }
        });
      }
    }, function(err) {
      console.log('ERR', err);
    });
  }
});

app.controller("editCtrl", function($scope, $state, ReservationService, reso) {
  console.log(reso);
});

app.controller("addCtrl", function($scope, $state, ReservationService) {

  $scope.dateToday = new Date();

  $scope.saveNewReso = function(valid) {
    console.log('VALID', valid);
    if(!valid) return;

    $scope.newReso.checkedIn = false;
    var newReso = $scope.newReso;

    ReservationService.addReservation(newReso)
      .then(function(res) {
        $state.go("home");
      }, function(err) {
        console.log('ERR', err);
      });
  };

});
