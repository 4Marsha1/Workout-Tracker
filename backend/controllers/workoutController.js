const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose")
const Workout = require("../models/workoutModel");

const createWorkout = expressAsyncHandler(async (req, res) => {
    const { title, reps, load } = req.body;
    if (!title || !reps || !load) {
        res.status(404);
        throw new Error('Incomplete Data!')
    }
    try {
        const newWorkout = new Workout({
            title, reps, load
        })
        await newWorkout.save();
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.status(200);
        res.json({
            workouts
        })
    } catch (err) {
        res.status(400)
        throw new Error('Workout couldnt be added!')
    }
})

const getAllWorkouts = expressAsyncHandler(async (req, res) => {
    try {
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.status(200)
        res.json({ workouts })
    } catch (err) {
        res.status(400)
        throw new Error("Workouts couldnt be fetched!")
    }
})

const getWorkout = expressAsyncHandler(async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('Invalid Object Id')
    }
    try {
        const workout = await Workout.findById(id)
        if (!workout) {
            res.status(404).json({ "msg": "Workout doesnt exist" });
            return;
        }
        res.status(200)
        res.json({ workout })
    } catch (err) {
        res.status(400)
        throw new Error("Workout doesnt exist!")
    }
})

const updateWorkout = expressAsyncHandler(async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('Invalid Object Id')
    }
    try {
        const workout = await Workout.findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        if (!workout) {
            res.status(404).json({ "msg": "Workout doesnt exist" });
            return;
        }
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.status(200)
        res.json({ workouts })
    } catch (err) {
        res.status(400)
        throw new Error("Workout doesnt exist!")
    }
})

const deleteWorkout = expressAsyncHandler(async (req, res) => {
    let { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404)
        throw new Error('Invalid Object Id')
    }
    try {
        const workout = await Workout.findOneAndDelete({ _id: id })
        if (!workout) {
            res.status(404).json({ "msg": "Workout doesnt exist" });
            return;
        }
        const workouts = await Workout.find().sort({ createdAt: -1 });
        res.status(200)
        res.json({ workouts })
    } catch (err) {
        res.status(400)
        throw new Error("Workout doesnt exist!")
    }
})

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}