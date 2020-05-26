import React, { useState, useEffect } from 'react'
import './Settings.css'
import { authService } from '../../services/auth.service';
import { getRestaurantsAll, getUsersAll, createUser, deleteUserById, createRestaurant, deleteRestaurantById, updateMealToRestaurant, createMeal } from '../../services/api.service';
import { useAlert } from 'react-alert';

let mealName = '';
let mealPrice = '';
let mealsTags = '';
let restaurantName = '';
let restaurantAddress = '';
let restaurantTags = [];
let username = '';
let password = '';


export default function Settings({history}) {

    const alert = useAlert();

    const [restaurants, setRestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    const [restaurantSectionSelected, setRestaurantSectionSelected] = useState(false);
    const [usersSectionSelected, setUsersSectionSelected] = useState(false);
    const [mealsSectionSelected, setMealsSectionSelected] = useState(false);
    const [selected_id, setSelected_id] = useState(null);
    const [searchUser, setSearchUser] = useState('');
    const [searchRestaurant, setSearchRestaurant] = useState('');


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
        restaurantTags = e.target.value.split(' ');
        if(restaurantTags[restaurantTags.length - 1] === ''){
            restaurantTags.pop()
        }
    }

    const handleUserName = (e) => {
        username = e.target.value
    }

    const handlePassword = (e) => {
        password = e.target.value
    }

    const handleSubmitUser = (e) => {
        e.preventDefault()

        if(username.trim() && password.trim()){

            createUser(username, password).then(res => {
                console.log(res.data)

                if(res.data.message === "Success"){

                    getUsersAll().then(res => {
                    setUsers(res.data.data)
                    })
                }
            }).catch(err => alert.error('Something went wrong!'+err))
        }
    }


    const handleSubmitRestaurant = (e) => {
        e.preventDefault()
        createRestaurant(restaurantName, restaurantAddress, restaurantTags, []).then(res => {
            if(res.data.message === "Success"){

                getRestaurantsAll().then(res => {
                setRestaurants(res.data.data)
                })
            }
            }).catch(err => alert.error('Something went wrong!'+err))
    }

    const handleSubmitMeal = (e) => {
        e.preventDefault();
        createMeal(mealName, Number(mealPrice), mealsTags).then(res => {
            console.log(res.data)
            if(res.data.message === "Success"){

                let tempMeals = getMeals(selected_id).map(el => el._id);
                tempMeals.push(res.data.data._id)
                updateMealToRestaurant(selected_id, tempMeals).then(ress => {
                    console.log(ress.data)
                    if(ress.data.message === "Success"){

                        getRestaurantsAll().then(res => {
                            setRestaurants(res.data.data)
                            })
                        } 
                    }
                )
            }
        }).catch(err => alert.error('Something went wrong!'+err))

    }

    const handleMealsTags = (e) => {
        mealsTags = e.target.value;
    }


    const handleDeleteRestaurant = (id) => {
        deleteRestaurantById(id).then(res => {
            console.log(res.data)
            if(res.data.message === "Success"){

                getRestaurantsAll().then(res => {
                setRestaurants(res.data.data)
                })
            }
        }).catch(err => alert.error('Something went wrong!'+err))
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
        deleteUserById(id).then(res => {
            console.log(res.data)
            if(res.data.message === "Success"){

                getUsersAll().then(res => {
                setUsers(res.data.data)
                })
            }
            }).catch(err => alert.error('Something went wrong!'+err))
    }

    const handleInputRestaurants = (e) => {
        setSearchRestaurant(e.target.value)
    }

    const getFilteredRestaurants = (search, array) => {
        return array.filter(el => el.name.toLowerCase().includes(search.toLowerCase()));
    }

    const handleInputUsers = (e) => {  
        setSearchUser(e.target.value)  
    }

    const getFilteredUsers = (search, array) => {
        return array.filter(el => el.username.toLowerCase().includes(search.toLowerCase()));
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
                        <form onSubmit={(e) => handleSubmitRestaurant(e)}>
                            <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new restaurant</h3></div>
                            <input className='settingsInput' type="text" placeholder="Restaurant name" onChange={(e) => handleRestaurantName(e)} required></input>
                            <input className='settingsInput' type="text" placeholder="Restaurant address" onChange={(e) => handleRestaurantAddress(e)}></input>
                            <input className='settingsInput' type="text" placeholder="Restaurant tags" onChange={(e) => handleRestaurantTags(e)}></input>
                            <input type="submit" value="Submit Restaurant" className='settSubmitBtn' />
                        </form>
                        <div>
                            <div className='settSubheadingWrapp'> <h3 className='settSubheading'>Restaurants</h3></div>
                            <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
                            {getFilteredRestaurants(searchRestaurant, restaurants).map(el => { return <div className='settColm' key={el._id}><div> <label onClick={() => handleSelectRestaurant(el._id)} className='settUsernameLbl allRestLbl'>{el.name}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteRestaurant(el._id)}>Delete</button></div></div> })}
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
                        <form onSubmit={(e) => handleSubmitMeal(e)}>
                        <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new meal</h3></div>
                        <input className='settingsInput' type="text" placeholder="Meal name" onChange={(e) => handleMealName(e)} required></input>
                        <input className='settingsInput' type="number" placeholder="Meal price" onChange={(e) => handleMealPrice(e)} required></input>
                        <input className='settingsInput' type="text" placeholder="Meal tags" onChange={(e) => handleMealsTags(e)}></input>
                        <input type="submit" value="Submit Meal" className='settSubmitBtn'/>
                        </form>
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
                        <form onSubmit={(e) => handleSubmitUser(e)}>
                            <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new user</h3></div>
                            <input className='settingsInput' type="text" placeholder="Username" onChange={(e) => handleUserName(e)} required></input>
                            <input className='settingsInput' type="text" placeholder="Password" onChange={(e) => handlePassword(e)} required></input>
                            <input type="submit" value="Submit user" className='settSubmitBtn' />
                        </form>
                        <div>
                            <div className='settSubheadingWrapp'> <h3 className='settSubheading'>Users</h3></div>
                            <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
                            {getFilteredUsers(searchUser, users).map(el => { return <div className='settColm' key={el._id}><div> <label className='settUsernameLbl '>{el.username}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteUser(el._id)}>Delete</button></div></div> })}
                        </div>
                    </div>
                    </div>

               
                
            </div>
        </div>
    )
}