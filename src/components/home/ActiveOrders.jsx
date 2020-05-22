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

    console.log(users)
    appStorage.setUser('Pera');
    //ovo treba da se desava prilikom logovanja, obrisati kada komponenta LogIn bude gotova
    let user = users.find(user => user.username === appStorage.getUser());
    // debugger
    //u slucaju da u appStorage cuvamo samo username, ako cuvamo ceo user objekat onda ovaj find 
    //nije potreban

    const endOrder = (orderId) => {
        //export podataka u excel
    }

    const deleteOrder = (orderId) => {
        //brisanje ordera sa api-ja
    }
    
    return(
        <div>
            <h2>ACTIVE ORDERS</h2>
            <table>                 
                    <tr>
                        <th>Name</th>
                        <th>Restaurant</th>
                        <th>Author</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
            {activeOrders.map(order => {
                let poll = polls.find(poll => poll.pollId === order.pollId);
                let restaurant = restaurants.find(restaurant => restaurant.restaurantId === order.restaurantId);

                let userOrders = user.history.filter(el => el.orderId === order.orderId);

                return(
                    <tr>
                        <td>{poll.name}</td>
                        <td>{restaurant.name}</td>
                        <td>{poll.author}</td>
                        <td>{order.duration}</td>
                        {/* prevesti u odbrojavanje posle dogovora */}
                        {userOrders.length === 0 ? <td>You didn't order yet</td> : 
                            <td>You ordered: {userOrders.map(orderItem => {
                                return(
                                    <li>{orderItem.quantity} x {meals.find(meal => meal.mealId === orderItem.mealId).name}</li>
                                )
                            })} </td>
                        }
                        <td>
                            <Link to={`/order/${order.orderId}`}>Go to Order</Link>
                            {/* ukoliko zelimo dugme umesto linka, koristicemo history.push */}
                            {user.username === poll.author ? 
                            <div><button onClick={() => endOrder(order.orderId)}>End Order</button>
                            <button onClick={() => deleteOrder(order.orderId)}>Delete Order</button></div> 
                            : <div></div>}
                        </td> 
                    </tr>
                )
            })}
            </table>
        </div>
    )

}

export default ActiveOrders