import React from "react";
import { appStorage } from "../../services/storage.service";
import { getAllOrders } from "../../services/api.service";
import { CSVLink } from "react-csv";

class FinishedOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: appStorage.getUser(),
      allOrders: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setAllOrders();
    this.countdown = window.setInterval(() => this.setAllOrders(), 100000);
  }

  componentWillUnmount() {
    window.clearInterval(this.countdown);
  }

  setAllOrders = () => {
    getAllOrders()
      .then((res) => {
        this.setState({ allOrders: res.data.data, loading: false });
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

          let data = [];

          if (orderItemList.length > 0) {
            orderItemList.forEach((orderItem) => {
              let completedOrder = {
                Name: orderItem.user,
                Meal: orderItem.meal.name,
                Quantity: orderItem.quantity,
                Price: orderItem.meal.price * orderItem.quantity,
                Note: orderItem.note,
              };

              data.push(completedOrder);
            });

            if (order.poll.author === this.state.userName) {
              ordersRow.push(
                <div className="active-info actInfMargin">
                  <div>
                    <label className="pollLblInfo finLbl">{order.poll.name}</label>
                  </div>
                  <div>
                    <label className="pollLblInfo finLbl">{order.poll.author}</label>
                  </div>
                  <div>
                    <div>
                      <label className="pollLblInfo finLbl">
                        {order.restaurant.name}
                      </label>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="pollLblInfo">
                        <CSVLink className='excelCsvLink'
                          style={{ color: "black",
                        textDecoration:"none" }}
                          filename={"my-file.csv"}
                          data={data}
                        >
                      <img  className="userUnvoteBtn" src='/img/excel.png' alt='excel' title='Download Excel'/> 
                        </CSVLink>
                      </label>
                    </div>
                  </div>
                </div>
              );
            } else {
              ordersRow.push(
                <div className="active-info actInfMargin">
                  <div>
                    <label className="pollLblInfo finLbl">{order.poll.name}</label>
                  </div>
                  <div>
                    <label className="pollLblInfo finLbl">{order.poll.author}</label>
                  </div>
                  <div>
                    <label className="pollLblInfo finLbl">
                      {order.restaurant.name}
                    </label>
                  </div>
                  <div>
                    <label className="pollLblInfo finLbl"></label>
                  </div>
                </div>
              );
            }
          }
        }
      });
    } else {
      ordersRow = (
        <div className="noActiveInfo">
          <div>
            {this.state.loading ? (
              <label className="pollLblNoInfo">Loading...</label>
            ) : (
              <label className="pollLblNoInfo">No orders pending</label>
            )}
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
            <div id="style-4" className="finishOrderRowWrapp ">{ordersRow}</div>
          </div>
          <div className="finshedOrderGradientWrapp finOrderFooter"></div>
        </div>
      </div>
    );
  }
}

export default FinishedOrders;
