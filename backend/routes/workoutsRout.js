const express = require("express");
const {
  createWorkout,
  getallWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutControllers");

const workRouter = express.Router();

// routes

workRouter.get("/", getallWorkouts);
workRouter.get("/:id", getSingleWorkout);

workRouter.post("/", createWorkout);

workRouter.patch("/:id", updateWorkout);
workRouter.delete("/:id", deleteWorkout);

// export the file
module.exports = workRouter;
