"use strict";

angular.module("reservationApp")
.factory("ReservationService", function($http) {

  function getReservations() {
    return $http.get("/reservations")
  };

  function getCurrentReservations() {
    return $http.get("/reservations/today")
  };

  function updateCheckIn(reso, id) {
    return $http.put(`/reservations/${id}/checkin`)
  }

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
    updateCheckIn: updateCheckIn,
    addReservation: addReservation,
    editReservation: editReservation,
    deleteReservation: deleteReservation
  }
});
