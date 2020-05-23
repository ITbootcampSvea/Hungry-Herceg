import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { orders, restaurants, users, meals } from "../../data";
import BasicOrderList from "./BasicOrderList";
import CurrentOrderList from "./CurrentOrderList";
import ComboOrderList from "./ComboOrderList";
import { appStorage } from "../../services/storage.service";

const CreateOrderItem = ({ history }) => {
  let { id } = useParams();

  //povlacenje podataka o order-u preko id-ja
  let order = orders.find((order) => order.orderId.toString() === id);
  //povlacenje podataka o restoranu preko id-ja
  let restaurant = restaurants.find(
    (restaurant) => restaurant.restaurantId === order.restaurantId
  );
  const [orderedMeals, setOrderedMeals] = useState([]);
  const [total, setTotal] = useState(0);

  //ukoliko je korisnik vec porucio, prikazati na listi
  let user = users.find((user) => user.username === appStorage.getUser());
  let userOrders = user.history.filter((el) => el.orderId.toString() === id);
  useEffect(() => {
    let tmp = [];
    let sum = 0;
    userOrders.forEach((orderItem) => {
      let orderedMeal = {
        user: orderItem.user,
        name: meals.find((meal) => meal.mealId === orderItem.mealId).name,
        price: meals.find((meal) => meal.mealId === orderItem.mealId).price,
        orderId: orderItem.orderId,
        mealId: orderItem.mealId,
        quantity: orderItem.quantity,
        note: orderItem.note,
      };
      sum += orderedMeal.price * orderedMeal.quantity;
      tmp.push(orderedMeal);
    });
    setOrderedMeals(tmp);
    setTotal(sum);
  }, []);
  
  //prima niz mealova, vrsi provere, na kraju stavlja mealove i novu cenu u state
  const addOrderItems = (meals) => {
    let newMeals = [];
    let newPrice = 0;
    meals.forEach((meal) => {
      let alreadyOrdered = orderedMeals.find(
        (orderedMeal) =>
          orderedMeal.mealId === meal.mealId && orderedMeal.name === meal.name
      );
      if (alreadyOrdered) {
        let quantity = parseInt(alreadyOrdered.quantity);
        alreadyOrdered.quantity = quantity += parseInt(
          document.querySelector(`#q${meal.mealId}`).value
        );
        newPrice +=
          alreadyOrdered.price *
          parseInt(document.querySelector(`#q${meal.mealId}`).value);
      } else {
        let orderedMeal = {
          user: appStorage.getUser(),
          name: meal.name,
          price: meal.price,
          orderId: id,
          mealId: meal.mealId,
          quantity: document.querySelector(`#q${meal.mealId}`).value,
          note: "",
        };
        newMeals.push(orderedMeal);
        newPrice += orderedMeal.price * orderedMeal.quantity;
      }
    });
    setOrderedMeals([...orderedMeals, ...newMeals]);
    setTotal(total + newPrice);
  };

  

  return (
    <div>
      <NavBar history={history} />
      <h2>{restaurant.name}</h2>
      <BasicOrderList
        meals={restaurant.meals}
        orderedMeals={orderedMeals}
        setOrderedMeals={setOrderedMeals}
        orderId={id}
        total={total}
        setTotal={setTotal}
        addOrderItems={addOrderItems}
      />
      <ComboOrderList
        meals={restaurant.meals}
        orderedMeals={orderedMeals}
        setOrderedMeals={setOrderedMeals}
        orderId={id}
        orderId={id}
        total={total}
        setTotal={setTotal}
        addOrderItems={addOrderItems}
      />
      <CurrentOrderList
        orderedMeals={orderedMeals}
        setOrderedMeals={setOrderedMeals}
        total={total}
        setTotal={setTotal}
        orderId={id}
      />
    </div>
  );
};
export default CreateOrderItem;
