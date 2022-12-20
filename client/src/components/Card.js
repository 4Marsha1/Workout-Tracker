import React from 'react'
import "../allStyles.css"
import timeAgo from '../utils'
import { ReactComponent as TrashCan } from "../assets/trash_can.svg"
import { ReactComponent as Edit } from "../assets/edit.svg"

const Card = ({ workout, _deleteWorkout, _setFormToEdit }) => {
    const { title, reps, load, updatedAt } = workout

    return (
        <div className='card'>
            <div className='card__content'>
                <span className='card__title'>{title}</span>
                <span className='card__load'><strong>Load(kg):</strong> {load}</span>
                <span className='card__reps'><strong>Number of reps:</strong> {reps}</span>
                <span className='card__time'>{timeAgo(updatedAt)}</span>
            </div>
            <div className='card__delete'>
                <button className='card__delete__btn' onClick={() => _deleteWorkout(workout._id)}>
                    <TrashCan />
                </button>
                <button className='card__delete__btn' onClick={() => _setFormToEdit(workout)}>
                    <Edit />
                </button>
            </div>
        </div>
    )
}

export default Card