const express = require("express");
const { createWorkout, getAllWorkouts, getWorkout, updateWorkout, deleteWorkout } = require("../controllers/workoutController");
const router = express.Router();

router.route('/').post(createWorkout).get(getAllWorkouts)
router.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout)

module.exports = router