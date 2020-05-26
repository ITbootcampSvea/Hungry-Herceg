import React, { useEffect, useState } from "react";
import { appStorage } from "../../services/storage.service";
import { Link } from "react-router-dom";
import { getAllOrders, endOrderById } from "../../services/api.service";

const ActiveOrders = () => {

    const [loading,setLoading] = useState(true);
    const [activeOrders,setActiveOrders] = useState([]);
    //povlacenje podataka sa back-a
    let interval;
    useEffect(() => {
        interval = setInterval(() => {
            getAllOrders().then(res => {
                let orders = res.data.data;
                setActiveOrders(orders.filter(el => el.status === true));
                setLoading(false);
            });
        },3000)
        return () => clearInterval(interval);
    },[])

    let user = appStorage.getUser();

    //status order-a menja se u false
    const endOrder = (orderId) => {
        endOrderById(orderId);
    }

    const getEndTime = (createdAt) =>{
        let isoDateTime = new Date(createdAt); 
        isoDateTime.setMinutes(isoDateTime.getMinutes()+20);
        return isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
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
                    <label className='orderInfoLbl'>Ends</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Status</label>
                </div>
                <div>
                    <label className='orderInfoLbl'>Action</label>
                </div>
            </div>
 
            <div id="style-5" className='pollRowsWrapp'>   
            { activeOrders.length !== 0 ? <>
            {activeOrders.map(order => {

                let userOrders = order.orderItemList.filter(orderItem => {
                        if(orderItem.orderId && orderItem.user){
                           return orderItem.orderId === order._id && orderItem.user === user
                        }
                })
                
                return(
                    
                    <div key={order._id} className="active-info header order">
                    <div>
                        <label className='pollLblInfo'>{order.poll.name}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.restaurant ? order.restaurant.name : ''}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{order.poll.author}</label>
                    </div>
                    <div>
                        <label className='pollLblInfo'>{getEndTime(order.createdAt)}</label>
                    </div>
                    <div >
                    {userOrders.length === 0 ? <label className='pollLblInfo'>You didn't order yet</label>:<label className='pollLblInfo'>You ordered:{userOrders.map(orderItem => {
                                return(
                                    <li key={orderItem._id}>{orderItem.quantity} x {orderItem.meal.name}</li>
                                )
                            })} </label>}
                    </div>
                    <div className="btn-icons">
                    {user === order.poll.author ? <>
                            <div>
                                <img src="./img/end1.png" alt="icon" title="End Poll" title='End order' onClick={() => endOrder(order._id)}/>
                            </div>
                            </>:<div></div>}
                            <div>
                            <Link to={`/order/${order._id}`} className='voteBtnLink'><img src='./img/order.png'alt='logo' title='Go to Order'/></Link>
                            </div>
                        </div>
                </div>
                
                ) 
            })} </> : <div className="noActiveInfo">
            <div>
            <label className="pollLblNoInfo">{loading ? "Loading..." : "No Active Orders"}</label>
            </div>
          
          </div>}
            </div>

        </div>
        
    </div>

    )

}

export default ActiveOrders