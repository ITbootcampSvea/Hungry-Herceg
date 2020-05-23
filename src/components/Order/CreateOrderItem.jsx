import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import { orders, restaurants } from "../../data";
import BasicOrderList from "./BasicOrderList";
import ComboOrderList from "./ComboOrderList";

const CreateOrderItem = ({history}) => {

    let { id } = useParams();

    //povlacenje podataka o order-u preko id-ja
    let order = orders.find(order => order.orderId.toString() === id);
    //povlacenje podataka o restoranu preko id-ja
    let restaurant = restaurants.find(restaurant => restaurant.restaurantId === order.restaurantId);
    const [orderedMeals,setOrderedMeals] = useState([]);
    const [totalOrderSum,setTotalOrderSum] = useState(0);
    
    
    
    

    return(
        <div>
            <NavBar history={history} />
                <h2>{restaurant.name}</h2>
            
            <BasicOrderList meals={restaurant.meals} orderedMeals={orderedMeals} setOrderedMeals={setOrderedMeals} orderId={id} />
            <ComboOrderList meals={restaurant.meals} orderedMeals={orderedMeals} setOrderedMeals={setOrderedMeals} orderId={id}/>
        </div>
    )
}
export default CreateOrderItem