import React, { useState } from "react";
import { appStorage } from "../../services/storage.service";
import './Order.css'

const ComboOrderList = ({meals, orderId}) => {

    const saltyMeals = meals.filter(meal=> meal.tags.includes("#slano"));
    const sweetMeals = meals.filter(meal=> meal.tags.includes("#slatko"));

    const [budget, setBudget] = useState(0)
    

    let comboRow = [];
    saltyMeals.forEach((saltyMeal) => {
      sweetMeals.forEach((sweetMeal) => {
        if (saltyMeal.price + sweetMeal.price <= budget) {
          comboRow.push(
            <div style={{display:'flex'}}>             
              <div>{saltyMeal.name}</div>
              <div>{sweetMeal.name}</div>
              <div>
                {saltyMeal.price + sweetMeal.price}
              </div>
              <div>
                <button
                  onClick={() => {    
                  }}
                >
                  Add combo
                </button>
              </div>
            </div>
          );
        }
      });
    });
    

    return(
        <div className='comboOrderWrapp'>
            <h2>Get your perfect combo</h2>
            <input type="text" onChange={(e) => setBudget(e.target.value)} 
            placeholder='Placeholder' className='basicOrderInput'/>       
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

export default ComboOrderList