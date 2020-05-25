import React, { useState, useEffect } from 'react'
import './Settings.css'
import { authService } from '../../services/auth.service';
import { getRestaurantsAll, getUsersAll } from '../../services/api.service';

let mealName = '';
let mealPrice = '';
let restaurantName = '';
let restaurantAddress = '';
let restaurantTags = [];
let username = '';
let password = '';


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
export default function Settings({history}) {

    const [restaurants, setRestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    const [restaurantSectionSelected, setRestaurantSectionSelected] = useState(false);
    const [usersSectionSelected, setUsersSectionSelected] = useState(false);
    const [mealsSectionSelected, setMealsSectionSelected] = useState(false);
    const [selected_id, setSelected_id] = useState(null);

    useEffect(() => {
        getRestaurantsAll().then(res => {
        setRestaurants(res.data.data)
        })
        getUsersAll().then(res => {
        setUsers(res.data.data)
        })
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

    const handleRestaurantTags = (e) => {
        restaurantTags = e.target.value
    }

    const handleUserName = (e) => {
        username = e.target.value
    }

    const handlePassword = (e) => {
        password = e.target.value
    }

    const handleSubmitUser = () => {
    //     sendUser(username, password).then(res => {
    //     console.log(res)
    // })
    }

    let newRestaurant = {
        name: restaurantName,
        address: restaurantAddress,
        tags: [...restaurantTags]
    }

    const handleSubmitRestaurant = () => {
    //     sendRestaurant(newRestaurant).then(res => {
    //     console.log(res)
    // })
    }

    const handleSubmitMeal = () => {
        console.log(mealName, mealPrice)
    }


    const handleDeleteRestaurant = (_id) => {
        setRestaurants(restaurants.filter(el => el._id !== _id))
    }

    const getMeals = (id) => {
        return restaurants.find((el) => {
            return el._id === id;
        }).meals
    }

    const handleSelectRestaurant = (_id) => {
        setSelected_id(_id)
        setMealsSectionSelected(true)
    }

    const handleDeleteUser = (id) => {
        setUsers(users.filter(el => el.id !== id))
    }

    const handleInputRestaurants = (e) => {
        if (e.target.value === '') {
            return setRestaurants([]);
        }
        let filteredInputRestaurants = restaurants.filter(el => el.name.includes(e.target.value));
        setRestaurants(filteredInputRestaurants)
    }
    const handleInputUsers = (e) => {
        if (e.target.value === '') {
            return setUsers([]);
        }
        let filteredInputUsers = testUsers.filter(el => el.username.includes(e.target.value));
        setUsers(filteredInputUsers)
    }
    const handleRestaurantSectionSelected = () => {
        setRestaurantSectionSelected(!restaurantSectionSelected)
    }

    const handleUserSectionSelected = () => {
        setUsersSectionSelected(!usersSectionSelected)
    }

    const handleMealsSectionSelected = () => {
        setMealsSectionSelected(!mealsSectionSelected)
    }

    const resturantSectionStyle = restaurantSectionSelected ? { opacity: 1 } : { opacity: 0 };
    const userSectionStyle = usersSectionSelected ? { opacity: 1 } : { opacity: 0 };
    const mealSectionStyle = mealsSectionSelected ? { opacity: 1 } : { opacity: 0 };


    return (
        <div className='settingsWrapp'>
            <div className='settingsHeader'>
                <div></div>
                <div className='settHeadWrapp'><h1 className='settHeading'>Settings</h1></div>
                <div className='settIconWrapp'><img className='settIcon' src='/img/setti.png' alt='settings' /></div>
                <div className='settLogoutWrapp'>
                    <div onClick={() => { authService.LogOut(); history.push('/login') }} >
                        <img src="/img/logout2.png" alt="icon" className="settLogoutIcon" />
                        <label className='settLogoutLbl'>Logout</label>
                    </div>
                </div>
            </div>
            <div className='settingsMainPart'>
                <div className='settResWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Restaurants</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settRest.png' alt='logo' onClick={() => handleRestaurantSectionSelected()} /></div>
                    </div>
                    <div style={resturantSectionStyle} className='transitionWapper'>
                        <div>
                            <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new restaurant</h3></div>
                            <input className='settingsInput' type="text" placeholder="Restaurant name" onChange={(e) => handleRestaurantName(e)}></input>
                            <input className='settingsInput' type="text" placeholder="Restaurant address" onChange={(e) => handleRestaurantAddress(e)}></input>
                            <input className='settingsInput' type="text" placeholder="Restaurant tags" onChange={(e) => handleRestaurantTags(e)}></input>
                            <button className='settSubmitBtn' onClick={(e) => handleSubmitRestaurant(e)}>Submit Restaurant</button>
                        </div>
                        <div>
                            <div className='settSubheadingWrapp'> <h3 className='settSubheading'>Restaurants</h3></div>
                            <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
                            {restaurants.map(el => { return <div className='settColm' key={el._id}><div> <label onClick={() => handleSelectRestaurant(el._id)} className='settUsernameLbl allRestLbl'>{el.name}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteRestaurant(el._id)}>Delete</button></div></div> })}
                        </div>
                    </div>
                </div>
                <div className='settMealWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Meals</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settMeal.png' alt='logo' onClick={() => handleMealsSectionSelected()} /></div>
                    </div>
                    <div style={mealSectionStyle} className='transitionWapper'>
                    <div>
                        <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new meal</h3></div>
                        <input className='settingsInput' type="text" placeholder="Meal name" onChange={(e) => handleMealName(e)}></input>
                        <input className='settingsInput' type="number" placeholder="Meal price" onChange={(e) => handleMealPrice(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitMeal(e)}>Submit Meal</button>
                        <div>
                            {selected_id !== null ? getMeals(selected_id).map(el => {return <div className='selectedMealsWrapp' key={el._id} >
                                <label className='settUsernameLbl'>{el.name}{' '}{el.price}</label></div>}): null}
                        </div>
                    </div>
                    </div>
                </div>
                <div className='settUserWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Users</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settUser.png' alt='logo' onClick={() => handleUserSectionSelected()} /></div>
                    </div>
                    <div style={userSectionStyle} className='transitionWapper'>
                        <div>
                            <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new user</h3></div>
                            <input className='settingsInput' type="text" placeholder="Username" onChange={(e) => handleUserName(e)}></input>
                            <input className='settingsInput' type="text" placeholder="Password" onChange={(e) => handlePassword(e)}></input>
                            <button className='settSubmitBtn' onClick={(e) => handleSubmitUser(e)}>Submit User</button>
                        </div>
                        <div>
                            <div className='settSubheadingWrapp'> <h3 className='settSubheading'>Users</h3></div>
                            <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
                            {users.map(el => { return <div className='settColm' key={el._id}><div> <label className='settUsernameLbl '>{el.username}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteUser(el.id)}>Delete</button></div></div> })}
                        </div>
                    </div>
                    </div>

               
                
            </div>
        </div>
    )
}