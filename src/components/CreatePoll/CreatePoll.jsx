import React, { useState, useEffect } from 'react'

let hours = 0;
let minutes = 15;
let duration = 0;
let pollName = '';

export default function CreatePoll({history}){

    const [restaurants, setRestaurants] = useState([]);

    // useEffect(() => {                               //getAllRestaurants - fja za podatke sa apija
    //     getAllRestaurants.then(res => {
    //         setRestaurants(res.data)
    //     })
    // }, [])

    const handlePollName = (e) => {
        pollName = e.target.value
    }
    const handleRestaurantName = () => {

    }
    const handleEndTime = (e) => {
        let { name, value } = e.target;
        switch (name) {
            case 'hours': (value > 24) ? (e.target.value = hours) : (hours = value);
                break;
            case 'minutes': (value > 59) ? (e.target.value = minutes) : (minutes = value);
                break;
            default:
                break;
        }
        duration = hours * 60 + minutes
    }


    const handleAddRestaurants = () => {

    }
    const handleCreatePoll = () => {

    }
    const handleCancel = () => {
        history.push('/home')
    }


    return (
        <div>
            <h3>Create New Poll</h3>
            <div>
                <label>Poll Name:</label>
                <input type="text" onChange={(e) => handlePollName(e)} ></input>
            </div>
            <div>
                <label>Duration:</label>
                <label>Hours:</label><input type="number" min="0" max="24" defaultValue="0" name="hours" onChange={(e) => handleEndTime(e)} 
                onKeyDown={(e) => (e.key === '-' || e.key === '.')? e.preventDefault(): null}></input>
                <label>Minutes:</label><input type="number" min="15" max="59" defaultValue="15" name="minutes" onChange={(e) => handleEndTime(e)}
                onKeyDown={(e) => (e.key === '-' || e.key === '.')? e.preventDefault(): null}></input>
            </div>
            <div>
                <label>Search Restaurants:</label>
                <input type="text" onChange={(e) => handleRestaurantName(e)}></input>
                <button onClick={(e) => handleAddRestaurants(e)}>Add</button>
            </div>
            <div>
                <button onClick={(e) => handleCreatePoll(e)}>Create Poll</button>
            </div>
            <div>
                <button onClick={(e) => handleCancel(e)}>Cancel</button>
            </div>
        </div>
    )
}
