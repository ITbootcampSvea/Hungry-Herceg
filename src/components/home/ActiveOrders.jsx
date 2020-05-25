import React, { useEffect, useState } from "react";
import { orders, polls, restaurants, users, meals } from "../../data";
import { appStorage } from "../../services/storage.service";
import { Link } from "react-router-dom";
import { findData, getDataById } from "../../services/api";

const ActiveOrders = () => {

    const [activeOrders,setActiveOrders] = useState([]);
    //povlacenje podataka sa back-a
    useEffect(() => {
        findData('order').then(res => {
            let orders = res.data.data;
            setActiveOrders(orders.filter(el => el.status === true));
        })
    },[])
    console.log(activeOrders);
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
 
            <div id="style-5" className='pollRowsWrapp'>    {activeOrders.map(order => {

                let userOrders = user.history.filter(el => el.orderId === order._id);
                
                return(
                    
                    <div className="active-info header order">
                    <div>
                        <label className='pollLblInfo'>{order.pollId.name}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.restaurantId.name}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.pollId.author}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.duration}</label>
                    </div>
                    <div >
                    {userOrders.length===0 ? <label className='pollLblInfo'>You didn't order yet</label>:<label className='pollLblInfo'>You ordered:{userOrders.map(orderItem => {
                                return(
                                    <li>{orderItem.quantity} x {meals.find(meal => meal.mealId === orderItem.mealId).name}</li>
                                )
                            })} </label>}
                    </div>
                    <div className="btn-icons">
                    {user.username === order.pollId.author ? <>
                            <div>
                                <img src="./img/del.png" alt="icon" title="Delete" title='Delete order' onClick={() => deleteOrder(order.orderId)}/>
                            </div>
                            <div>
                                <img src="./img/end1.png" alt="icon" title="End Poll" title='End order' onClick={() => endOrder(order.orderId)}/>
                            </div>
                            </>:<div></div>}
                            <div>
                            <Link to={`/order/${order._id}`} className='voteBtnLink'><img src='./img/order.png'alt='logo' title='Go to Order'/></Link>
                            </div>
                        </div>
                </div>
                
                ) 
            })} 
            </div>

        </div>
        
    </div>
    )

}

export default ActiveOrders