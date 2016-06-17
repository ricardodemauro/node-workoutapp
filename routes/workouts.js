var express = require('express');
var router = express.Router();
var workout = require('../models/workout').Workout;

router.get('/', function(req, res, next) {
  workout.find({}, function(err, docs) {
    if(!err) {
      res.status(200).json({ workouts: docs });
    } else {
      res.status(500).json({ message: err });
    }
  });
}).
get('/:id', function(req, res, next) {
  var id = req.params.id;
  workout.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } 
    else if(err) {
      res.status(500).json({ message: "Error loading workout. " + err });
    }
    else {
      res.status(404).json({ message: "Workout not found." });
    }
  });
}).
post('/', function(req, res, next) {
  var workout_name = req.body.workout_name; // Name of workout.
  var description = req.body.workout_description; // Description of the workout
  
  // Using RegEx - search is case insensitive
  workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } }, function(err, doc) { 
    if(!err && !doc) {
      var newWorkout = new workout();

      newWorkout.name = workout_name;
      newWorkout.description = description;
      
      newWorkout.save(function(err) {
        if(!err) {
          res.status(201).json({ message: "Workout created with name: " + newWorkout.name });
        } 
        else {
          res.status(500).json({ message: "Could not create workout. Error: " + err });
        }
      });
    } 
    else if(!err) {
      // User is trying to create a workout with a name that already exists.
      res.status(403).json({ message: "Workout with that name already exists, please update instead of create or create a new workout with a different name."} );
    } 
    else {
      res.status(500).json({ message: err });
    }
  });
}).
put('/:id', function(req, res, next) {
  var id = req.params.id;
  var workout_name = req.body.workout_name;
  var workout_description = req.body.workout_description;
      
  workout.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.name = workout_name;
        doc.description = workout_description;
        doc.save(function(err) {
          if(!err) {
            res.status(200).json({ message: "Workout updated: " + workout_name });
          } else {
            res.status(500).json({ message: "Could not update workout. " + err });
          }
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find workout." });
      } else {
        res.status(500).json({ message: "Could not update workout. " + err });
      }
    });
}).
delete('/:id', function(req, res, next){
  var id = req.body.id === undefined ? req.params.id : req.body.id;
  workout.findById(id, function(err, doc){
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "Workout removed." });
    }
    else if(!err) {
      res.status(404).json({ message: "Could not find workout." });
    }
    else {
      res.status(403).json({ message: "Could not delete workout. " + err });
    }
  });
});

module.exports = router;