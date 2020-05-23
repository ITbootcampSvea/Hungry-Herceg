import React, { useState } from "react";
import './Order.css'

const BasicOrderList = ({meals,addOrderItems}) => {
    
    const [filteredMeals,setFilteredMeals] = useState(meals);
    
    const filterRestaurants = (input) => {
        if (input.startsWith('#')) {
            let filter = meals.filter(meal => {
                if (meal.tags.find(tag => tag.toLowerCase().includes(input.toLowerCase()))) {
                    return meal;
                }
            })
            setFilteredMeals(filter);
        } else {
            let filter = meals.filter(meal => meal.name.toLowerCase().includes(input.toLowerCase()));
            setFilteredMeals(filter);
        }
    }

    // const addOrderItem = (meal) => {
    //     let alreadyOrdered = orderedMeals.find(orderedMeal => orderedMeal.mealId === meal.mealId && orderedMeal.name === meal.name);
    //     if(alreadyOrdered){
    //         let quantity = parseInt(alreadyOrdered.quantity);
    //         alreadyOrdered.quantity = quantity += parseInt(document.querySelector(`#q${meal.mealId}`).value); 
    //         setTotal(total + alreadyOrdered.price * parseInt(document.querySelector(`#q${meal.mealId}`).value))
    //     } else {
    //         let orderedMeal = {
    //             user: appStorage.getUser(),
    //             name: meal.name,
    //             price: meal.price,
    //             orderId: orderId,
    //             mealId: meal.mealId,
    //             quantity: document.querySelector(`#q${meal.mealId}`).value,
    //             note: ''
    //         }
    //         setOrderedMeals([...orderedMeals,orderedMeal]);
    //         setTotal(total + orderedMeal.price * orderedMeal.quantity);
    //     }
    // }

    


    return (
        <div className='basicOrderList'>
            <input type="text" onChange={(e) => filterRestaurants(e.target.value)}
                className='basicOrderInput' placeholder='Placeholder' />
            <div className='basicOrderTxt'>
                    <div>Meal</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Actions</div>
            </div>
            {filteredMeals.map(meal => {
                return (
                    <div key={meal.mealId} className='basicOrderTxt'>
                        <div >{meal.name}</div>
                        <div>{meal.price}</div>
                        <div><input defaultValue="1" min="1" id={'q' + meal.mealId} type="number" className='orderQuantity' /></div>
                        <div><button onClick={() => {
                            let array = [meal];
                            addOrderItems(array);
                        }}>Add</button></div>
                    </div>
                )
            })}
        </div>
    )
}

export default BasicOrderList