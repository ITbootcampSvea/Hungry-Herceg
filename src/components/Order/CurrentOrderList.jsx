import React from 'react';
import './Order.css'

const CurrentOrderList = ({ orderedMeals, total, setTotal }) => {

    //konsultovati se sta prikazati na pocetku, kada je orderedMeals prazan niz

    const removeMeal = (orderedMeal) => {
        let index = orderedMeals.findIndex(el => el === orderedMeal);
        orderedMeals.splice(index, 1);
        setTotal(total - orderedMeal.price * orderedMeal.quantity);
    }

    const finishOrder = () => {
        console.log(orderedMeals);
        //poslati orderedMeals kao orderItems na server
    }

    return (
        <div className='currentOrderWrapp'>
                <h3>Current Order</h3>
                <div className='currentOrderTxt'>
                    <div className='orderBold'>Meal</div>
                    <div className='orderBold'>Price</div>
                    <div className='orderBold'>Quantity</div>
                    <div className='orderBold'>Note</div>
                    <div className='orderBold'>Actions</div>
                </div>
                {orderedMeals.map(orderedMeal => {
                    return (
                        <div key={orderedMeal.mealId} className='currentOrderTxt'>
                            <div>{orderedMeal.name}</div>
                            <div>{orderedMeal.price}</div>
                            <div>{orderedMeal.quantity}</div>
                            <div className='bacisNumberDiv'><input className='orderQuantity' placeholder="Note" type="text" onInput={(e) => orderedMeal.note = e.target.value} /></div>
                            <div><img src='/img/del.png' alt='remove' title='Remove Meal' className='removeOrder' onClick={() => removeMeal(orderedMeal)}/></div>
                        </div>
                    )
                })}
                <div>Total price: <span className='orderBold'>{total}</span></div>
                <button onClick={() => finishOrder(orderedMeals)} className='orderNowBtn'>ORDER NOW!</button>
        </div>
    )
}

export default CurrentOrderList 