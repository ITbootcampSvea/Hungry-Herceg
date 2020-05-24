import React, { useState } from "react";
import { appStorage } from "../../services/storage.service";
import './Order.css'

const ComboOrderList = ({
  meals,
  orderId,
  orderedMeals,
  setOrderedMeals,
  total,
  setTotal,
  addOrderItems,
}) => {
  const saltyMeals = meals.filter((meal) => meal.tags.includes("#slano"));
  const sweetMeals = meals.filter((meal) => meal.tags.includes("#slatko"));
  const [budget, setBudget] = useState(0);

  let comboRow = [];
  saltyMeals.forEach((saltyMeal) => {
    sweetMeals.forEach((sweetMeal) => {
      if (saltyMeal.price + sweetMeal.price <= budget) {
        comboRow.push(
          <div className='basicOrderTxt'>
            <div>{saltyMeal.name}</div>
            <div>{sweetMeal.name}</div>
            <div>{saltyMeal.price + sweetMeal.price}</div>
            <div>
              <img src='/img/add-order.png' alt='add' title='Add Combo' className='addOrderBtn'
                onClick={() => {
                  addComboItems(saltyMeal, sweetMeal);
                }}
              />
            </div>
          </div>
        );
      }
    });
  });

  const addComboItems = (saltyMeal, sweetMeal) => {
    addOrderItems([saltyMeal, sweetMeal]);
  };

    return(
        <div className='comboOrderWrapp'>
            <h3>Get your perfect combo</h3>
            <input type="text" onChange={(e) => setBudget(e.target.value)} 
            placeholder='Enter your budget limit' className='basicOrderInput'/>       
            <div className='basicOrderTxt'>
                <div>Meal</div>
                <div>Dessert</div>
                <div>Price</div>
                <div>Actions</div>
            </div>
                <div>{comboRow}</div> 
        </div>
    )
}

export default ComboOrderList;
