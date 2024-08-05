const { default: mongoose } = require("mongoose");
const workoutsModel = require("../models/workoutsModel");

// get all workouts

const getallWorkouts = async (req, res) => {
  const workout = await workoutsModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

// get single workout

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const workout = await workoutsModel.findById(id);
  if (!workout) {
    return res.status(404).json({ message: "workout not found" });
  }
  res.status(200).json(workout);
};

// create new workout

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  const emptFields = [];

  if (!title) {
    emptFields.push("title");
  }
  if (!reps) {
    emptFields.push("reps");
  }
  if (!load) {
    emptFields.push("load");
  }
  if (emptFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please, fill in all fields", emptFields });
  }

  try {
    const workout = await workoutsModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid id passed" });
  try {
    const delWorkout = await workoutsModel.findByIdAndDelete(id);
    res.status(200).json(delWorkout);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// update a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.json(400).json({ message: "Invalid id passed" });
  try {
    const { title, reps, load } = req.body;
    const editWorkout = await workoutsModel.findByIdAndUpdate(
      id,
      { title, reps, load },
      { new: true }
    );
    res.status(200).json(editWorkout);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createWorkout,
  getallWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
