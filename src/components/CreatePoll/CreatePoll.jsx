import React, { useState, useEffect } from 'react'

export const CreatePoll = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [time, setTime] = useState([]);

    // useEffect(() => {
    //     getAllRestaurants.then(res => {
    //         setRestaurants(res.data)
    //     })
    // }, [])

    const handlePollName = () => {

    }
    const handleRestaurantName = () => {
        
    }
    const handleEndTime = () => {
        
    }
    const handleAddRestaurants = () => {
        
    }
    const handleCreatePoll = () => {
        
    }
    const handleCancel = () => {
        
    }


    return (
        <div>
            <h3>Create New Poll</h3>
            <div>
                <label>Poll Name:</label>
                <input type="text" onChange={(e) => handlePollName(e)} ></input>
            </div>
            <div>
                <label>Search Restaurants:</label>
                <input type="text" onChange={(e) => handleRestaurantName(e)}></input>
                <button onClick={(e) => handleAddRestaurants(e)}>Add</button>
            </div>
            <div>
                <label>Created At:</label>
                <label>{time}</label>
            </div>
            <div>
                <label>End Time:</label>
                <input type="datetime-local" onChange={(e) => handleEndTime(e)}></input>
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