"use strict";

var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var moment = require("moment");

var Reservation = require("../models/Reservation");

//get all reservations
router.get("/", function(req, res, next) {
  Reservation.find({}, function(err, reservations) {
    if(err) {
      return res.status(400).send(err);
    }
     res.send(reservations);
  });
});

//get today's reservations
router.get("/today", function(req, res) {
  var oneHourAgo = moment().subtract(1, "hour").toDate();
  var threeHours = moment().add(3, "hour").toDate();

  Reservation.find({
      "time": { "$gte": oneHourAgo, "$lte": threeHours },
      "checkedIn": false
    }, function(err, reservations) {
      if(err) {
        return res.status(400).send(err);
      }
       res.send(reservations);
    });
  });

//create reservation
router.post("/", function(req, res) {
  req.body.date = moment(req.body.time).unix();
  var newReservation = Reservation(req.body);

  newReservation.save(function(err) {
    if(err) {
      return res.status(400).send(err);
    };
    res.send("Reservation made!");
  });
});

//update checkin status
router.put("/:id/checkin", function(req, res) {
  Reservation.findById(req.params.id, function(err, reservation) {
    if(err) return res.status(400).send(err);
    reservation.checkedIn = !reservation.checkedIn;
    reservation.save(function(err, savedReso) {
      if(err) return res.status(400).send(err);

      res.send(savedReso);
    });
  });
});


//update a reservation
router.put("/:id", function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send("Reservation updated!");
  });
});

//delete reservation
router.delete("/:id", function(req, res) {
  Reservation.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send("Reservation updated!");
  });
});

module.exports = router;
