import React, { useState } from "react";
import { appStorage } from "../../services/storage.service";

const ComboOrderList = ({meals,orderedMeals,setOrderedMeals,orderId}) => {
    
    const [filteredCombos, setFilteredCombos] = useState([]);
    
    

    
    let salty = meals.filter(meal=> meal.tags.includes("slano"));
    let sweet = meals.filter(meal=> meal.tags.includes("slatko"));
    console.log(salty, 'komentar')
        
        
    


    
    

    
    // let comboRow = [];
    // salty.forEach((saltyMeal) => {
    //   sweet.forEach((sweetMeal) => {
    //     if (saltyMeal.price + sweetMeal.price <= this.state.budget) {
    //       comboRow.push(
    //         <tr>
    //           <td style={{ textAlign: "center" }}>{saltyMeal.name}</td>
    //           <td style={{ textAlign: "center" }}>{sweetMeal.name}</td>
    //           <td style={{ textAlign: "center" }}>
    //             {saltyMeal.price + sweetMeal.price}
    //           </td>
    //           <td style={{ textAlign: "center" }}>
    //             <Button
    //               onClick={() => {
    //                 let oldOrder = this.state.currentOrder;
    //                 oldOrder.push(saltyMeal, sweetMeal);
    //                 this.setState({ currentOrder: oldOrder });
    //                 let currOrderSum = 0;
    //                 oldOrder.forEach((order) => {
    //                   currOrderSum += order.price;
    //                 });
    //                 this.setState({ currentOrderSum: currOrderSum });
    //                 this.setState({ budget: 0 });
    //               }}
    //             >
    //               Add combo
    //             </Button>
    //           </td>
    //         </tr>
    //       );
    //     }
    //   });
    // });
    

    return(<></>
        // <div>
        //     <input type="text" onChange={(e) => budgetLimit(e.target.value)} />
        //     <div style={{display: "flex"}}>
        //         <div>Meal</div>
        //         <div>Dessert</div>
        //         <div>Price</div>
        //         <div>Actions</div>
        //     </div>
        //     {filteredMeals.map(meal => {
        //         return(
        //             <div style={{display: "flex"}}>
        //                 <div>{meal.name}</div>
        //                 <div>{meal.price}</div>
        //                 <div><input defaultValue="1" min="1" id={'q' + meal.mealId} type="number" /></div>
        //                 <div><button onClick={() => addOrderItem(meal)}>Add</button></div>
        //             </div>
        //         )
        //     })}
        // </div>
    )
}

export default ComboOrderList