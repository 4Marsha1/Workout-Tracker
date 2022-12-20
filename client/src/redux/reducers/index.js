import { combineReducers } from "redux";
import workout from './workout';

const rootReducer = combineReducers({
    workoutReducer: workout
})

export default rootReducer