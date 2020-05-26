import React from 'react';
import './Order.css'
import { createOrderItem, updateOrderItem, deleteOrderItemById } from '../../services/api.service';
import { appStorage } from '../../services/storage.service';

const CurrentOrderList = ({ orderedMeals, setOrderedMeals, userOrders, total, setTotal, orderId, refresh, setRefresh }) => {

    //konsultovati se sta prikazati na pocetku, kada je orderedMeals prazan niz
    //brisanje orderItem-a iz state-a
    const removeMeal = (orderedMeal) => {
        let index = orderedMeals.findIndex(el => el === orderedMeal);
        orderedMeals.splice(index, 1);
        setTotal(total - orderedMeal.price * orderedMeal.quantity);
    }

    //slanje orderItem-a na server
    const finishOrder = () => {
        orderedMeals.forEach((meal) => {
            let alreadyOrdered = userOrders.find(
                (orderedMeal) =>
                    orderedMeal.meal._id === meal.meal && orderedMeal.user === appStorage.getUser());
            if (alreadyOrdered) {
                let quantity = Number(meal.quantity) + Number(alreadyOrdered.quantity);
                let note = document.querySelector(`#n${meal.meal}`).value;
                updateOrderItem(alreadyOrdered._id,Number(quantity),note).then(res => setRefresh(refresh + 'a'));
                // newPrice +=
                //     alreadyOrdered.price *
                //     parseInt(document.querySelector(`#q${meal.mealId}`).value);
            } else {
                let orderedMeal = {
                    orderId: orderId,
                    meal: meal.meal,
                    quantity: Number(meal.quantity),
                    note: document.querySelector(`#n${meal.meal}`).value,
                };
                console.log(orderedMeal);
                
                createOrderItem(orderedMeal).then(res => setRefresh(refresh + 'a'));
                // newPrice += orderedMeal.price * orderedMeal.quantity;
            }
        });
        setOrderedMeals([]);
    }

    //brisanje orderItem-a sa servera
    const deleteOrderItem = (orderItemId) => {
        deleteOrderItemById(orderItemId).then(res => setRefresh(refresh + 'a'));
    }

    return (
        <div className='currentOrderWrapp'>
               <div className='comboHedingWrapp'>
                <h3>Current Order</h3>
                </div>
                <div className='currentOrderTxt'>
                    <div className='orderBold'>Meal</div>
                    <div className='orderBold'>Price</div>
                    <div className='orderBold'>Quantity</div>
                    <div className='orderBold'>Note</div>
                    <div className='orderBold'>Actions</div>
                </div>
                <div id="style-4" className='currOrderClmsWrapp'>
                {userOrders.length !== 0 ? <> {userOrders.map(orderedItem => {
                    return (
                        <div key={orderedItem._id} className='currentOrderTxt'>
                            <div>{orderedItem.meal.name}</div>
                            <div>{orderedItem.meal.price}</div>
                            <div>{orderedItem.quantity}</div>
                            <div className='bacisNumberDiv'>{orderedItem.note}</div>
                            <div><img src='/img/del.png' alt='remove' title='Remove Meal' className='removeOrder' onClick={() => deleteOrderItem(orderedItem._id)}/></div>
                        </div>)})} <p>--------------</p> </> : <div></div> }
                </div>
          <div id="style-4" className='currOrderClmsWrapp'>{orderedMeals.map(orderedMeal => {
                    return (
                        <div key={orderedMeal.meal} className='currentOrderTxt'>
                            <div>{orderedMeal.name}</div> 
                            <div>{orderedMeal.price}</div>
                            <div>{orderedMeal.quantity}</div>
                            <div className='bacisNumberDiv'><input className='orderQuantity' placeholder="Note" type="text" id={'n' + orderedMeal.meal} /></div>
                            <div><img src='/img/del.png' alt='remove' title='Remove Meal' className='removeOrder' onClick={() => removeMeal(orderedMeal)}/></div>
                        </div>
                    )
                })}
                </div>
                <div>Total price: <span className='orderBold'>{total}</span></div>
                <button onClick={() => finishOrder(orderedMeals)} className='orderNowBtn'>ORDER NOW!</button>
        </div>
    )
}

export default CurrentOrderList 