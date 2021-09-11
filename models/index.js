const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Type of exercise required",
  },
  name: {
    type: String,
    trim: true,
    required: "Name of exercise required",
  },
  duration: {
    type: Number,
    required: "Duration of exercise required",
  },
  distance: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },
});

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: ExerciseSchema,
      default: {},
    }
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = { Workout };
