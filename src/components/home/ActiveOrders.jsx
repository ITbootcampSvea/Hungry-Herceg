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
        <div className="active-polls">
        <div className="poll-order-card">
            <img className="pollCardicon" src="./img/pollcard3.png" alt='pollicon' />
            <div className="card-heading">
                <h1>Active Orders</h1>
            </div>

            <div className="active-info header order">
                <div>
                    <label className='orderLbl'>Name</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Restaurant</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Author</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Remaining Time</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Status</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Action</label>
                </div>
            </div>
            {activeOrders.map(order => {
                let poll = polls.find(poll => poll.pollId === order.pollId);
                let restaurant = restaurants.find(restaurant => restaurant.restaurantId === order.restaurantId);

                let userOrders = user.history.filter(el => el.orderId === order.orderId);

                return(
                    <div className="active-info header order">
                    <div>
                        <label className='pollLblInfo'>{poll.name}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{restaurant.name}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{poll.author}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.duration}</label>
                    </div>
                    <div>
                    {userOrders.length===0 ? <label className='pollLblInfo'>You didnt order yet</label>:<label className='pollLblInfo'>You order:{userOrders.map(orderItem => {
                                return(
                                    <li>{orderItem.quantity} x {meals.find(meal => meal.mealId === orderItem.mealId).name}</li>
                                )
                            })} </label>}
                    </div>
                    <div className="btn-icons">
                    {user.username === poll.author ? <>
                            <div>
                                <img src="./img/del.png" alt="icon" title="Delete" title='Delete order' onClick={() => deleteOrder(order.orderId)}/>
                            </div>
                            <div>
                                <img src="./img/end1.png" alt="icon" title="End Poll" title='End order' onClick={() => endOrder(order.orderId)}/>
                            </div>
                            </>:<div></div>}
                            <div>
                            <Link to={`/order/${order.orderId}`} className='voteBtnLink'><img src='./img/order.png'alt='logo' title='Go to Order'/></Link>
                            </div>
                        </div>
                </div>
                ) 
            })}

        </div>

    </div>
    )

}

export default ActiveOrders