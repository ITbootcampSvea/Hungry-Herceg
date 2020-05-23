import React, { useState, useEffect } from 'react'

let mealName = '';
let mealPrice = '';
let restaurantName = '';
let restaurantAddress = '';
let userName = '';
let password = '';

const testRest = [
{
    id:0,
    name:"Karadjordje"
},
{
    id:1,
    name:"Pera"
},
{
    id:2,
    name:"Pizerija"
},
{
    id:3,
    name:"Pizdarija"
},
{
    id:4,
    name:"Dunja"
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
        <div>
            <div>
                <h3>Create new meal</h3>
                <input type="text" placeholder="Meal name" onChange={(e) => handleMealName(e)}></input>
                <input type="number" placeholder="Meal price" onChange={(e) => handleMealPrice(e)}></input>
                <button onClick={(e) => handleSubmitMeal(e)}>Submit Meal</button>
            </div>
            <div>
                <h3>Create new restaurant</h3>
                <input type="text" placeholder="Restaurant name" onChange={(e) => handleRestaurantName(e)}></input>
                <input type="text" placeholder="Restaurant address" onChange={(e) => handleRestaurantAddress(e)}></input>
                <button onClick={(e) => handleSubmitRestaurant(e)}>Submit Restaurant</button>
            </div>
            <div>
                <h3>Create new user</h3>
                <input type="text" placeholder="Username" onChange={(e) => handleUserName(e)}></input>
                <input type="text" placeholder="Password" onChange={(e) => handlePassword(e)}></input>
                <button onClick={(e) => handleSubmitUser(e)}>Submit User</button>
            </div>
            <div>
                <button onClick={(e) => handleDisplayRestaurants(e)}>Display All Restaurants</button>
            </div>
            <div>
                <button onClick={(e) => handleDisplayUsers(e)}>Display All Users</button>
            </div>
            <div>
                <h3>All Restaurants</h3>
                 {renderRestaurants.map(el => {return <div key={el.id}> <label>{el.name}</label><button onClick={(e)=>handleDeleteRestaurant(el.id)}>X</button></div>})}
                <input type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
            </div>
            <div>
                <h3>All Users</h3>
                 {renderUsers.map(el => {return <div key={el.id}> <label>{el.username}</label><button onClick={(e)=>handleDeleteUser(el.id)}>X</button></div>})}
                 <input type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
            </div>
        </div>
    )
}