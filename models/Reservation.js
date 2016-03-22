"use strict";

var mongoose = require("mongoose");

var Reservation = mongoose.model("Reservation", {
  time: Date,
  patron: String,
  partySize: Number,
  phone: String,
  checkedIn: {type: Boolean, default: false }
});

module.exports = Reservation;
