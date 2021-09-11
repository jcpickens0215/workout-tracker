const mongoose = require('mongoose');
const router = require('express').Router();
const path = require('path');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouts', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = require('../models');

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Last workout
router.get('/api/workouts', (req, res) => {
  db.Workout.aggregate(
  [
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    }
  ])
  .sort({ 'day': -1 })
  .limit(1)
  .then( (workout) => {
    res
      .status(200)
      .send(workout[0]);
  }).catch( (err) => {
    console.log(err);
      res.status(500);
  });
});

// Last 7 days
router.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        }
      }
    ])
    .sort({ 'day': -1 })
    .limit(7)
    .then( (workouts) => {
      res
        .status(200)
        .send(workouts);
    }).catch( (err) => {
      console.log(err);
        res.status(500);
    });
});

// Add an Exercise to a Workout
router.put('/api/workouts/:id', (req, res) => {});

// Create a new Workout
router.post('/api/workouts', (req, res) => {});

module.exports = router;