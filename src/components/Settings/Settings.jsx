import React, { useState, useEffect } from 'react'

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
                <input type="text" placeholder="Restaurant tags" onChange={(e) => handleRestaurantTags(e)}></input>
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
                <input type="text" placeholder="Search by name..." onChange={(e) => handleInputRestaurants(e)} />
                {renderRestaurants.map(el => {return <div key={el.restaurantId}> 
                <label>{el.name}{' '}{el.meals.map(el => {return <label key={el.mealId}>Meal: {el.name}{' '}</label>})}</label>
                <button onClick={(e)=>handleDeleteRestaurant(el.restaurantId)}>Delete Restaurant</button><hr></hr></div>})}
            </div>
            <div>
                <h3>All Users</h3>
                <input type="text" placeholder="Search by name..." onChange={(e) => handleInputUsers(e)} />
                 {renderUsers.map(el => {return <div key={el.id}> 
                 <label>{el.username}</label><button onClick={(e)=>handleDeleteUser(el.id)}>Delete User</button></div>})}
            </div>
        </div>
    )
}