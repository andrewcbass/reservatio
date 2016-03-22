"use strict";

//var mongoose = require("mongoose");
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
  var oneHourAgo = (Date.now() - 3600000);
  var threeHours = (Date.now() + 10800000);

  Reservation.find( { "time": { $gt: oneHourAgo}, "time": { $lt: threeHours } },
    function(err, reservations) {
      console.log("made it here");
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


//update a reservation
router.put("/:id", function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, req.body, function(err) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send("Reservation updated!");
  });
});


router.delete("/:id", function(req, res) {
  Reservation.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send("Reservation updated!");
  });
});








module.exports = router;
