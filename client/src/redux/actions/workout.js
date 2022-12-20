import {
    CREATE_WORKOUT_FAILED, CREATE_WORKOUT_INITIATED, CREATE_WORKOUT_SUCCESS,
    DELETE_WORKOUT_FAILED, DELETE_WORKOUT_INITIATED, DELETE_WORKOUT_SUCCESS,
    FETCH_ALL_WORKOUT_FAILED, FETCH_ALL_WORKOUT_INITIATED, FETCH_ALL_WORKOUT_SUCCESS,
    UPDATE_WORKOUT_FAILED, UPDATE_WORKOUT_INITIATED, UPDATE_WORKOUT_SUCCESS
} from "./types"
import axios from 'axios'

export const fetchAllWorkouts = () => async dispatch => {
    dispatch({
        type: FETCH_ALL_WORKOUT_INITIATED
    })
    try {
        const res = await axios.get('http://localhost:8000/api/workout/');
        dispatch({
            type: FETCH_ALL_WORKOUT_SUCCESS,
            payload: res.data.workouts
        })
    } catch (err) {
        dispatch({
            type: FETCH_ALL_WORKOUT_FAILED,
            payload: err.message
        })
    }
}

export const createWorkout = (title, reps, load) => async dispatch => {
    dispatch({
        type: CREATE_WORKOUT_INITIATED
    })
    try {
        const res = await axios.post('http://localhost:8000/api/workout/', { title, reps, load })
        dispatch({
            type: CREATE_WORKOUT_SUCCESS,
            payload: res.data.workouts
        })
    } catch (err) {
        dispatch({
            type: CREATE_WORKOUT_FAILED,
            payload: err.message
        })
    }
}

export const deleteWorkout = (id) => async dispatch => {
    dispatch({
        type: DELETE_WORKOUT_INITIATED
    })
    try {
        const res = await axios.delete(`http://localhost:8000/api/workout/${id}`)
        dispatch({
            type: DELETE_WORKOUT_SUCCESS,
            payload: res.data.workouts
        })
    } catch (err) {
        dispatch({
            type: DELETE_WORKOUT_FAILED,
            payload: err.message
        })
    }
}


export const updateWorkout = (id, title, reps, load) => async dispatch => {
    dispatch({
        type: UPDATE_WORKOUT_INITIATED
    })
    try {
        const res = await axios.put(`http://localhost:8000/api/workout/${id}`, { title, reps, load })
        dispatch({
            type: UPDATE_WORKOUT_SUCCESS,
            payload: res.data.workouts
        })
    } catch (err) {
        dispatch({
            type: UPDATE_WORKOUT_FAILED,
            payload: err.message
        })
    }
}