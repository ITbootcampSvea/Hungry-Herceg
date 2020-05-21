import React, { useEffect, useState } from "react";
import { orders, polls, restaurants, users, meals } from "../../data";
import { appStorage } from "../../services/storage.service";
import { Link } from "react-router-dom";

const ActiveOrders = () => {

    const [activeOrders,setActiveOrders] = useState([]);
    //povlacenje podataka sa back-a, kada bude gotov api
    useEffect(() => {
        setActiveOrders(orders.filter(el => el.status === 'active'));
    },[])

    let user = users.find(user => user.username === appStorage.getUser());
    //u slucaju da u appStorage cuvamo samo username, ako cuvamo ceo user objekat onda ovaj find 
    //nije potreban

    const endOrder = (orderId) => {
        //export podataka u excel
    }

    const deleteOrder = (orderId) => {
        //brisanje ordera sa api-ja
    }
    
    return(
        <div style={{display: "flex"}}>
            {activeOrders.map(order => {
                let poll = polls.find(poll => poll.pollId === order.pollId);
                let restaurant = restaurants.find(restaurant => restaurant.restaurantId === order.restaurantId);

                let userOrders = user.history.filter(el => el.orderId === order.orderId);

                return(
                    <div>
                        <p>Poll: {poll.name}</p>
                        <p>Author: {poll.author}</p>
                        <p>Duration: {order.duration}</p>
                        {/* vreme trajanja je potrebno izmeniti (odluciti da li ce biti odbrojavanje ili sat i minut do kad traje order) */}
                        <p>Winning restaurant: {restaurant.name}</p>
                        {userOrders.length === 0 ? <p>You didn't order yet</p> : 
                            <p>You ordered: {userOrders.map(orderItem => {
                                return(
                                    <li>{orderItem.quantity} x {meals.find(meal => meal.mealId === orderItem.mealId).name}</li>
                                )
                            })} </p>
                        }
                        <Link to={`/order/${order.orderId}`}>Go to Order</Link>
                        {/* ukoliko zelimo dugme umesto linka, koristicemo history.push */}
                        {user.username === poll.author ? 
                        <div><button onClick={() => endOrder(order.orderId)}>End Order</button>
                        <button onClick={() => deleteOrder(order.orderId)}>Delete Order</button></div> 
                        : <div></div>}
                    </div>
                )
            })}
        </div>
    )

}

export default ActiveOrders