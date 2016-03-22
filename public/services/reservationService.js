"use strict";

angular.module("reservationApp")
.factory("reservationService", function($http) {

  function getReservations() {
    return $http.get("/reservations")
  };

  function addReservation(newRes) {
    return $http.post("/reservations", newRes)
  };

  function editReservation(reservation, id) {
    return $http.put(`/reservations/${id}`)
  };

  function deleteReservation(id) {
    return $http.delete(`/reservations/${id}`)
  };

  return {
    getReservations: getReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation
  }
});
