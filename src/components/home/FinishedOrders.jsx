import React from "react";
import { Link } from "react-router-dom";
import { appStorage } from "../../services/storage.service";
import { getAllOrders } from "../../services/api.service";
import axios from "axios";
import { ExportToCsv } from "export-to-csv";

class FinishedOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: appStorage.getUser(),
      allOrders: [],
    };
  }

  componentDidMount() {
    this.setAllOrders();
  }

  setAllOrders = () => {
    getAllOrders()
      .then((res) => {
        
        this.setState({ allOrders: res.data.data });
      })
      .catch((err) => window.alert("Error occurred" + err));
  };

  render() {
    let allOrders = this.state.allOrders;

    let ordersRow = [];

    if (allOrders.length > 0) {
      allOrders.map((order) => {
        if (order.poll.status === false) {
         
          let orderItemList = order.orderItemList;
          console.log(orderItemList)
          let data = [];
          let singleMealName = '';
          let singleMealQuantity = '';
          let singleMealPrice = '';
          let singleMealNote = '';
          orderItemList.map(orderItem=>{
            let completedOrder = {
              
                mealName: orderItem.meal.name,
                mealQuantity: orderItem.quantity,
                mealPrice: orderItem.meal.price * singleMealQuantity,
                mealNote: orderItem.note,
                approved: true,
                description: "Using content here"
            }
            data.push(completedOrder);
            
            
          // singleMealName = orderItem.meal.name;
          // singleMealQuantity = orderItem.quantity;
          // singleMealPrice = orderItem.meal.price * singleMealQuantity;
          
          })
          console.log(data)
          
          // let dataForExport = [
          //   {
          //     name:"Danko"
          //   }
          // ]

          if (order.poll.author === this.state.userName) {
            ordersRow.push(
              <div className="active-info">
                <div>
                  <label className="pollLblInfo">{order.poll.name}</label>
                </div>
                <div>
                  <label className="pollLblInfo">{order.poll.author}</label>
                </div>
                <div>
                  <div>
                    <label className="pollLblInfo">
                      {order.restaurant.name}
                    </label>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="pollLblInfo">
                      <button
                      >EXPORT NOW</button>
                    </label>
                  </div>
                </div>
              </div>
            );
          } else {
            ordersRow.push(
              <div className="active-info">
                <div>
                  <label className="pollLblInfo">{order.poll.name}</label>
                </div>
                <div>
                  <label className="pollLblInfo">{order.poll.author}</label>
                </div>
                <div>
                  <label className="pollLblInfo">{order.restaurant.name}</label>
                </div>
                <div>
                  <label className="pollLblInfo">Order pending...</label>
                </div>
              </div>
            );
          }
        }
      });
    } else {
      ordersRow = (
        <div className="noActiveInfo">
          <div>
            <label className="pollLblNoInfo">No Pending Orders</label>
          </div>
        </div>
      );
    }

    return (
      <div className="active-polls">
        <div className="finishedOrderCard">
          <img
            className="certifyIcon"
            src="/img/certificate.png"
            alt="pollicon"
          />
          <div className="card-heading">
            <h1>Finished Orders</h1>
          </div>
          <div className="finshedOrderGradientWrapp"></div>
          <div className="finishedOrderContent">
            <div className="finishOrderHeader">
              <div className="finishedOrderFiled">
                <label className="finishOrderLbl">Name</label>
              </div>
              <div className="finishedOrderFiled">
                <label className="finishOrderLbl">Author</label>
              </div>
              <div className="finishedOrderFiled">
                <label className="finishOrderLbl">Restaurant</label>
              </div>
              <div className="finishedOrderFiled">
                <label className="finishOrderLbl">Action</label>
              </div>
            </div>
            <div className="pollRowsWrapp">{ordersRow}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FinishedOrders;
