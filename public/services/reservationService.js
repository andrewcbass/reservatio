"use strict";

angular.module("reservationApp")
.factory("ReservationService", function($http) {

  function getReservations() {
    return $http.get("/reservations")
  };

  function getCurrentReservations() {
    return $http.get("/reservations/today")
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
    getCurrentReservations: getCurrentReservations,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation
  }
});
