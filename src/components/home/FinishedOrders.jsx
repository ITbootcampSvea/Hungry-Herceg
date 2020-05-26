import React from "react";
import { Link } from "react-router-dom";
import { appStorage } from "../../services/storage.service";
import { getAllOrders } from "../../services/api.service";
import { ExportToCsv } from "export-to-csv";
import { CSVLink, CSVDownload } from "react-csv";

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
    console.log(this.state.data);
    let allOrders = this.state.allOrders;

    let ordersRow = [];

    if (allOrders.length > 0) {
      allOrders.map((order) => {
        if (order.poll.status === false) {
          let orderItemList = order.orderItemList;
          console.log(orderItemList);
          let data = [];
          
          orderItemList.forEach((orderItem) => {
            let completedOrder = {
              mealName: orderItem.meal.name,
              mealQuantity: orderItem.quantity,
              mealPrice: orderItem.meal.price * orderItem.quantity,
              mealNote: orderItem.note,
            };

            data.push(completedOrder);
            console.log(data);
          });

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
                      <CSVLink style={{color:"black"}} filename={"my-file.csv"} data={data}>EXPORT NOW</CSVLink>
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
                  <label className="pollLblInfo"></label>
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
