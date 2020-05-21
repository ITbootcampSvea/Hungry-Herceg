import React from "react";
import { useParams } from "react-router-dom";

const CreateOrderItem = () => {

    let { id } = useParams();

    

    return(
        <div>
            <p>Order, orderId: {id}</p>
        </div>
    )
}
export default CreateOrderItem