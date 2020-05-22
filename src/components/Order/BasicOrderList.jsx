import React, { useState } from "react";
import { appStorage } from "../../services/storage.service";

const BasicOrderList = ({meals,orderedMeals,setOrderedMeals,orderId}) => {
    
    const [filteredMeals,setFilteredMeals] = useState(meals);
    
    const filterRestaurants = (input) => {
        if(input.startsWith('#')){
            let filter = meals.filter(meal => {
                if(meal.tags.find(tag => tag.includes(input))){
                    return meal;
                }
            })
            setFilteredMeals(filter);
        } else {
            let filter = meals.filter(meal => meal.name.includes(input));
            setFilteredMeals(filter);
        }
    }

    const addOrderItem = (meal) => {
        //uraditi proveru da li taj orderItem vec postoji
        //ako postoji => povecati quantity
        //ako ne postoji => kreirati nov
        let orderedMeal = {
            user: appStorage.getUser(),
            orderId: orderId,
            mealId: meal.mealId,
            quantity: document.querySelector(`#q${meal.mealId}`).value,
            note: ''
        }
        setOrderedMeals([...orderedMeals,orderedMeal]);
        console.log(orderedMeals);
    }
    console.log(orderedMeals);
    

    return(
        <div>
            <input type="text" onChange={(e) => filterRestaurants(e.target.value)} />
            <div style={{display: "flex"}}>
                <div>Meal</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Actions</div>
            </div>
            {filteredMeals.map(meal => {
                return(
                    <div style={{display: "flex"}}>
                        <div>{meal.name}</div>
                        <div>{meal.price}</div>
                        <div><input defaultValue="1" min="1" id={'q' + meal.mealId} type="number" /></div>
                        <div><button onClick={() => addOrderItem(meal)}>Add</button></div>
                    </div>
                )
            })}
        </div>
    )
}

export default BasicOrderList