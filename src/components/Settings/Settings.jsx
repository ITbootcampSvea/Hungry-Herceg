import React, { useState, useEffect } from 'react'
import './Settings.css'
import { authService } from '../../services/auth.service';

let mealName = '';
let mealPrice = '';
let restaurantName = '';
let restaurantAddress = '';
let restaurantTags = [];
let username = '';
let password = '';


let testRest = [
    {
      restaurantId: 0,
      name: "Prvi restoran",
      address: "Adresa restorana",
      meals: [
        {
          mealId: 0,
          name: "Pljeskavica",
          price: 100,
          tags: ['#slano','#rostilj']
        },
        {
          mealId: 1,
          name: "Lapacinka",
          price: 200,
          tags: ['#slatko']
        },
        {
          mealId: 2,
          name: "Masan burek",
          price: 1000,
          tags: ['#slano']
        }
      ],
    },
    {
      restaurantId: 1,
      name: "Drugi restoran",
      address: "Adresa restorana",
      meals: [
        {
          mealId: 3,
          name: "Krofna",
          price: 250,
          tags: ['#slatko']
        },
        {
          mealId: 4,
          name: "Pasta",
          price: 350,
          tags: ['#slano']
        }
      ],
    },
  ];

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
    const [renderRestaurants, setRenderRestaurants] = useState([]);
    const [renderUsers, setRenderUsers] = useState([]);
    const [restaurantSectionSelected, setRestaurantSectionSelected] = useState(false);
    const [usersSectionSelected, setUsersSectionSelected] = useState(false);
    const [mealsSectionSelected, setMealsSectionSelected] = useState(false);
    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

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

    const handleDisplayRestaurants = () => {
        setRenderRestaurants(restaurants)
    }

    const handleDisplayUsers = () => {
        setRenderUsers(users)
    }

    const handleDeleteRestaurant = (restaurantId) => {
        setRenderRestaurants(renderRestaurants.filter(el => el.restaurantId !== restaurantId))
    }

    const getMeals = (id) => {
        return renderRestaurants.find((el) => {
            return el.restaurantId === id;
        }).meals
    }

    const handleSelectRestaurant = (restaurantId) => {
        setSelectedRestaurantId(restaurantId)
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
    const userSectionStyle = usersSectionSelected? { opacity: 1 } : { opacity: 0 };
    const mealSectionStyle = mealsSectionSelected? { opacity: 1 } : { opacity: 0 };


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
                            <button className='settDisplayBtn' onClick={(e) => handleDisplayRestaurants(e)}>Display All Restaurants</button>
                        </div>
                        <div>
                            <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
                            <div className='settSubheadingWrapp'> <h3 className='settSubheading'>All Restaurants</h3></div>
                            {renderRestaurants.map(el => { return <div className='settColm' key={el.id}><div> <label onClick={() => handleSelectRestaurant(el.restaurantId)} className='settUsernameLbl'>{el.name}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteRestaurant(el.restaurantId)}>Delete</button></div></div> })}
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
                        <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new restaurant</h3></div>
                        <input className='settingsInput' type="text" placeholder="Meal name" onChange={(e) => handleMealName(e)}></input>
                        <input className='settingsInput' type="number" placeholder="Meal price" onChange={(e) => handleMealPrice(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitMeal(e)}>Submit Meal</button>
                        <div>
                            {selectedRestaurantId !== null ? getMeals(selectedRestaurantId).map(el => {return <div key={el.mealId} className='settUsernameLbl'>{el.name}{' '}{el.price}</div>}): null}
                        </div>
                    </div>
                    </div>
                </div>
                <div className='settUserWrapp'>
                    <div className='mainPartHeader'>
                        <div className='mainPartHeadingWrapp'> <h1 className='mainPartHeading'>Users</h1></div>
                        <div className='settHeaderIconWrapp'><img className='settHeaderIcon' src='/img/settUser.png' alt='logo'  onClick={() => handleUserSectionSelected()} /></div>
                    </div>
                    <div style={userSectionStyle} className='transitionWapper'>
                    <div>
                        <div className='createNewWrapp'> <h3 className='createNewHeading'>Create new user</h3></div>
                        <input className='settingsInput' type="text" placeholder="Username" onChange={(e) => handleUserName(e)}></input>
                        <input className='settingsInput' type="text" placeholder="Password" onChange={(e) => handlePassword(e)}></input>
                        <button className='settSubmitBtn' onClick={(e) => handleSubmitUser(e)}>Submit User</button>
                    </div>
                    <div>
                        <div>
                            <button className='settDisplayBtn' onClick={(e) => handleDisplayUsers(e)}>Display All Users</button>
                        </div>
                        <input className='settingsInput' type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
                        <div className='settSubheadingWrapp'> <h3 className='settSubheading'>All Users</h3></div>
                        {renderUsers.map(el => { return <div className='settColm' key={el.id}><div> <label className='settUsernameLbl'>{el.username}</label></div><div><button className='settDelBtn' onClick={(e) => handleDeleteUser(el.id)}>Delete</button></div></div> })}
                    </div>
                    </div>

                </div>
                
            </div>
        </div>
    )
}