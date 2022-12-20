import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { createWorkout, deleteWorkout, fetchAllWorkouts, updateWorkout } from '../redux/actions/workout'
import Card from './Card'
import "../allStyles.css"

const Home = () => {
    const workouts = useSelector((state) => state.workoutReducer.workouts)
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        dispatch(fetchAllWorkouts());
    }, [])

    const _createWorkout = (e) => {
        e.preventDefault();
        if (!title || !reps || !load) {
            alert('Incomplete Data')
            return;
        }
        dispatch(createWorkout(title, reps, load))
        setTitle('')
        setReps('')
        setLoad('')
    }

    const _deleteWorkout = (id) => {
        if (!id) return;
        console.log(`Deleted ${id}`)
        dispatch(deleteWorkout(id))
    }

    const _setFormToEdit = (item) => {
        setIsEdit(true);
        setId(item._id);
        setTitle(item.title)
        setReps(item.reps)
        setLoad(item.load)
    }

    const _updateWorkout = (e) => {
        e.preventDefault();
        if (!id || !title || !reps || !load) {
            alert('Incomplete Data')
            return;
        }
        dispatch(updateWorkout(id, title, reps, load));
        setId('');
        setTitle('')
        setReps('')
        setLoad('')
        setIsEdit(false);
    }

    return (
        <>
            <Navbar />
            <div className='wrapper'>
                <div className='card__container'>
                    {
                        workouts.length > 0 && workouts.map(workout => {
                            return <Card
                                key={workout._id}
                                workout={workout}
                                _deleteWorkout={_deleteWorkout}
                                _setFormToEdit={_setFormToEdit}
                            />
                        })
                    }
                </div>
                <div className='form__container'>
                    <form className='form' onSubmit={(e) => {
                        if (isEdit) _updateWorkout(e);
                        else _createWorkout(e);
                    }}>
                        <span className='form__title'>{isEdit ? 'Edit Workout' : 'Add a New Workout'}</span>
                        <div className='form__group'>
                            <label htmlFor="title">Exercise Title:</label>
                            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Bench Press' />
                        </div>
                        <div className='form__group'>
                            <label htmlFor="reps">Number of Reps:</label>
                            <input type="number" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} placeholder='20' />
                        </div>
                        <div className='form__group'>
                            <label htmlFor="load">Load (kg):</label>
                            <input type="number" id="load" value={load} onChange={(e) => setLoad(e.target.value)} placeholder='5' />
                        </div>
                        {isEdit ?
                            <input type="submit" value="Edit Workout" />
                            :
                            <input type="submit" value="Add Workout" />
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home