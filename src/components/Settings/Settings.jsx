import React, { useState, useEffect } from 'react'
import './Settings.css'

let mealName = '';
let mealPrice = '';
let restaurantName = '';
let restaurantAddress = '';
let userName = '';
let password = '';

const testRest = [
    {
        id: 0,
        name: "Karadjordje"
    },
    {
        id: 1,
        name: "Pera"
    },
    {
        id: 2,
        name: "Pizerija"
    },
    {
        id: 3,
        name: "Pizdarija"
    },
    {
        id: 4,
        name: "Dunja"
    }
]

const testUsers = [
    {
        id: 0,
        username: "Admin",
        password: 1234,
        history: [0, 0, 2, 1],
    },
    {
        id: 1,
        username: "Admin 2",
        password: 1234,
        history: [0, 0, 2, 1],
    },
    {
        id: 2,
        username: "Admin 3",
        password: 1234,
        history: [0, 0, 2, 1],
    }
]
export default function Settings() {

    const [restaurants, setRestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    const [renderRestaurants, setRenderRestaurants] = useState([]);
    const [renderUsers, setRenderUsers] = useState([]);

    useEffect(() => {
        // getAllRestaurants().then(res => {
        setRestaurants(testRest)
        // })
        // getAllUser().then(res => {
        setUsers(testUsers)
        // })
    }, [])

    const handleMealName = (e) => {
        mealName = e.target.value
    }
    const handleMealPrice = (e) => {
        mealPrice = e.target.value
    }
    const handleRestaurantName = (e) => {
        restaurantName = e.target.value
    }
    const handleRestaurantAddress = (e) => {
        restaurantAddress = e.target.value
    }
    const handleUserName = (e) => {
        userName = e.target.value
    }
    const handlePassword = (e) => {
        password = e.target.value
    }
    const handleSubmitUser = () => {
        console.log(userName, password)
    }
    const handleSubmitRestaurant = () => {
        console.log(restaurantName, restaurantAddress)
    }
    const handleSubmitMeal = () => {
        console.log(mealName, mealPrice)
    }
    const handleDisplayRestaurants = () => {
        setRenderRestaurants(restaurants)
    }
    const handleDisplayUsers = () => {
        setRenderUsers(users)
    }
    const handleDeleteRestaurant = (id) => {
        setRenderRestaurants(renderRestaurants.filter(el => el.id !== id))
    }
    const handleDeleteUser = (id) => {
        setRenderUsers(renderUsers.filter(el => el.id !== id))
    }
    const handleInputRestaurants = (e) => {
        if (e.target.value === '') {
            return setRenderRestaurants([]);
        }
        let filteredInputRestaurants = testRest.filter(el => el.name.includes(e.target.value));
        setRenderRestaurants(filteredInputRestaurants)
    }
    const handleInputUsers = (e) => {
        if (e.target.value === '') {
            return setRenderUsers([]);
        }
        let filteredInputUsers = testUsers.filter(el => el.username.includes(e.target.value));
        setRenderUsers(filteredInputUsers)
    }


    return (
        <div className='settingsWrapp'>
            <div className='settingsHeader'>
                <div className='settHeadWrapp'><h1 className='settHeading'>Settings</h1></div>
                <div className='settIconWrapp'><img className='settIcon' src='/img/setti.png' alt='settings' /></div>
            </div>
            <div className='settingsMainPart'>
                <div className='settResWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Restaurants</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settRest.png' alt='logo' /></div>
                    </div>

                    <div>
                        <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new restaurant</h3></div>
                       
                        <input className='settingsInput' type="text" placeholder="Restaurant name" onChange={(e) => handleRestaurantName(e)}></input>
                        <input className='settingsInput' type="text" placeholder="Restaurant address" onChange={(e) => handleRestaurantAddress(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitRestaurant(e)}>Submit Restaurant</button>
                    </div>
                    <div>
                        <button className='settDisplayBtn'  onClick={(e) => handleDisplayRestaurants(e)}>Display All Restaurants</button>
                    </div>
                    <div>
                        <div className='settSubheadingWrapp'> <h3 className='settSubheading'>All Restaurants</h3></div>
                        {renderRestaurants.map(el => { return <div className='settColm' key={el.id}><div> <label className='settUsernameLbl'>{el.name}</label></div><div><button className='settDelBtn'  onClick={(e) => handleDeleteRestaurant(el.id)}>Delete</button></div></div> })}
                        <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
                    </div>
                </div>
                <div className='settUserWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Users</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settUser.png' alt='logo' /></div>
                    </div>
                    <div>
                    <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new user</h3></div>
                        <input className='settingsInput' type="text" placeholder="Username" onChange={(e) => handleUserName(e)}></input>
                        <input className='settingsInput' type="text" placeholder="Password" onChange={(e) => handlePassword(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitUser(e)}>Submit User</button>
                    </div>
                    <div>
                    <div>
                        <button className='settDisplayBtn'  onClick={(e) => handleDisplayUsers(e)}>Display All Users</button>
                    </div>
                    <div className='settSubheadingWrapp'> <h3 className='settSubheading'>All Users</h3></div>
                        {renderUsers.map(el => { return <div className='settColm' key={el.id}><div> <label className='settUsernameLbl'>{el.username}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteUser(el.id)}>Delete</button></div></div> })}
                        <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
                    </div>
                   
                </div>
                <div className='settMealWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Meals</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settMeal.png' alt='logo' /></div>
                    </div>
                    <div>
                    <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new restaurant</h3></div>
                        <input className='settingsInput' type="text" placeholder="Meal name" onChange={(e) => handleMealName(e)}></input>
                        <input className='settingsInput' type="number" placeholder="Meal price" onChange={(e) => handleMealPrice(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitMeal(e)}>Submit Meal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}