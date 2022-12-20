import {
    CREATE_WORKOUT_FAILED, CREATE_WORKOUT_INITIATED, CREATE_WORKOUT_SUCCESS,
    DELETE_WORKOUT_FAILED, DELETE_WORKOUT_INITIATED, DELETE_WORKOUT_SUCCESS,
    FETCH_ALL_WORKOUT_FAILED, FETCH_ALL_WORKOUT_INITIATED, FETCH_ALL_WORKOUT_SUCCESS,
    UPDATE_WORKOUT_FAILED, UPDATE_WORKOUT_INITIATED, UPDATE_WORKOUT_SUCCESS
} from "../actions/types"

const initialState = {
    fetching: false,
    workouts: [],
    fetched: false,
    creating: false,
    created: false,
    deleting: false,
    deleted: false,
    updating: false,
    updated: false,
    msg: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_WORKOUT_INITIATED:
            return {
                ...state,
                fetching: true,
                workouts: [],
                fetched: false,
                msg: ''
            }
        case FETCH_ALL_WORKOUT_SUCCESS:
            return {
                ...state,
                fetching: false,
                workouts: action.payload,
                fetched: true,
                msg: ''
            }
        case FETCH_ALL_WORKOUT_FAILED:
            return {
                ...state,
                fetching: false,
                workouts: [],
                fetched: false,
                msg: action.payload
            }
        case CREATE_WORKOUT_INITIATED:
            return {
                ...state,
                creating: true,
                created: false
            }
        case CREATE_WORKOUT_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                workouts: action.payload
            }
        case CREATE_WORKOUT_FAILED:
            return {
                ...state,
                creating: false,
                created: false,
                msg: action.payload
            }
        case DELETE_WORKOUT_INITIATED:
            return {
                ...state,
                deleting: true,
                deleted: false
            }
        case DELETE_WORKOUT_SUCCESS:
            return {
                ...state,
                deleting: false,
                deleted: true,
                workouts: action.payload
            }
        case DELETE_WORKOUT_FAILED:
            return {
                ...state,
                deleting: false,
                deleted: false,
                msg: action.payload
            }
        case UPDATE_WORKOUT_INITIATED:
            return {
                ...state,
                updating: true,
                updated: false
            }
        case UPDATE_WORKOUT_SUCCESS:
            return {
                ...state,
                updating: false,
                updated: true,
                workouts: action.payload
            }
        case UPDATE_WORKOUT_FAILED:
            return {
                ...state,
                updating: false,
                updated: false,
                msg: action.payload
            }
        default: return state
    }
}

export default reducer