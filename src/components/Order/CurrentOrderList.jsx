import React from 'react';

const CurrentOrderList = ({orderedMeals,total,setTotal}) => {

    //konsultovati se sta prikazati na pocetku, kada je orderedMeals prazan niz

    const removeMeal = (orderedMeal) => {
        let index = orderedMeals.findIndex(el => el === orderedMeal);
        orderedMeals.splice(index,1);
        setTotal(total - orderedMeal.price * orderedMeal.quantity);
    }
    
    const finishOrder = () => {
        console.log(orderedMeals);
        //poslati orderedMeals kao orderItems na server
    }

    return(
        <div>
            <h3>Current Order</h3>
            <div style={{display: "flex"}}>
                <div>Meal</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Note</div>
                <div>Actions</div>
            </div>
            {orderedMeals.map(orderedMeal => {
                return(
                    <div key={orderedMeal.mealId} style={{display: "flex"}}>
                        <div>{orderedMeal.name}</div>
                        <div>{orderedMeal.price}</div>
                        <div>{orderedMeal.quantity}</div>
                        <div><input placeholder="Note" type="text" onInput={(e) => orderedMeal.note = e.target.value} /></div>
                        <div><button onClick={() => removeMeal(orderedMeal)}>Remove</button></div>
                    </div>
                )
            })}
            <div>Total price: {total}</div>
            <button onClick={() => finishOrder(orderedMeals)}>ORDER NOW!</button>
        </div>
    )
}

export default CurrentOrderList 