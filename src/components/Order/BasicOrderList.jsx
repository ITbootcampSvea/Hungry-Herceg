import React, { useState } from "react";
import './Order.css'

const BasicOrderList = ({filteredMeals,addOrderItems,filterMeals}) => {
    
    // const [filteredMeals,setFilteredMeals] = useState(meals);
    
    // const filterRestaurants = (input) => {
    //     if (input.startsWith('#')) {
    //         let filter = meals.filter(meal => {
    //             if (meal.tags.find(tag => tag.toLowerCase().includes(input.toLowerCase()))) {
    //                 return meal;
    //             }
    //         })
    //         setFilteredMeals(filter);
    //     } else {
    //         let filter = meals.filter(meal => meal.name.toLowerCase().includes(input.toLowerCase()));
    //         setFilteredMeals(filter);
    //     }
    // }

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
            <input type="text" onChange={(e) => filterMeals(e.target.value)}
                className='basicOrderInput' placeholder='Enter a meal name or a meal tag' />
            <div className='basicOrderTxt'>
                    <div className='orderBold'>Meal</div>
                    <div className='orderBold'>Price</div>
                    <div className='orderBold'>Quantity</div>
                    <div className='orderBold'>Actions</div>
            </div>
        <div id="style-4" className='basicOrderTxtWrapp'>   {filteredMeals.map(meal => {
                return (
                    <div key={meal._id} className='basicOrderTxt'>
                        <div >{meal.name}</div>
                        <div>{meal.price}</div>
                        <div className='bacisNumberDiv'><input defaultValue="1" min="1" id={'q' + meal._id} type="number" className='orderQuantity' /></div>
                        <div><img src='/img/add-order.png' alt='add' title='Add Order' className='addOrderBtn' onClick={() => {
                            let array = [meal];
                            addOrderItems(array);
                        }}/></div>
                    </div>
                )
            })}</div> 
        </div>
    )
}

export default BasicOrderList