import React, { useEffect, useState } from "react";
import { appStorage } from "../../services/storage.service";
import {
  orders,
  polls,
  restaurants,
  users,
  meals,
  orderItems,
} from "../../data";
import { Link } from "react-router-dom";

const FinishedOrders = () => {
  const [inactiveOrders, setInactiveOrders] = useState([]);

  useEffect(() => {
    setInactiveOrders(orders.filter((el) => el.status === "inactive"));
  }, []);

  let user = users.find((user) => user.username === appStorage.getUser());
  

  let inactiveOrderMeals = inactiveOrders.map((order)=>order.orderItemsList);
  
  


  console.log(inactiveOrderMeals);
  
 




  return (
    <div className="active-polls">
      <div className="poll-order-card">
        <img
          className="pollCardicon"
          src="./img/pollcard3.png"
          alt="pollicon"
        />
        <div className="card-heading">
          <h1>Finished orders</h1>
        </div>

        <div className="active-info header order">
          <div>
            <label className="orderLbl">Name</label>
          </div>
          <div>
            <label className="orderInfoLbl">Restaurant</label>
          </div>
          <div>
            <label className="orderInfoLbl">Author</label>
          </div>
          <div>
            <label className="orderInfoLbl">Status</label>
          </div>
        </div>
        {inactiveOrders.map((order) => {
          let poll = polls.find((poll) => poll.pollId === order.pollId);
          let restaurant = restaurants.find(
            (restaurant) => restaurant.restaurantId === order.restaurantId
          );

          let userOrders = user.history.filter(
            (el) => el.orderId === order.orderId
          );

          return (
            <div className="active-info header order">
              <div>
                <label className="pollLblInfo">{poll.name}</label>
              </div>
              <div>
                <label className="pollLblInfo">{restaurant.name}</label>
              </div>
              <div>
                <label className="pollLblInfo">{poll.author}</label>
              </div>
              <div>
                {userOrders.length === 0 ? (
                  <label className="pollLblInfo">You didn't order</label>
                ) : (
                  <label className="pollLblInfo">
                    You ordered:
                    {userOrders.map((orderItem) => {
                      return (
                        <li>
                          {orderItem.quantity} x{" "}
                          {
                            meals.find(
                              (meal) => meal.mealId === orderItem.mealId
                            ).name
                          }
                        </li>
                      );
                    })}{" "}
                  </label>
                )}
              </div>
              <div>
                {user.username === poll.author ? (
                  <>
                    <div className="className='pollGuest'">
                      <button className="btn-green">
                        <Link to={"/createpoll"} className="creBtnLink">
                          Export now
                        </Link>
                      </button>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinishedOrders;
