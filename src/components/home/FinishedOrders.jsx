import React from "react";
import { Link } from "react-router-dom";
import { appStorage } from "../../services/storage.service";
import {
  getAllPolls,
  deletePollById,
  endPollById,
} from "../../services/api.service";
import axios from "axios";
import { ExportToCsv } from 'export-to-csv';

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

  baseURL = "https://hungry-herceg.herokuapp.com";
  getAllOrders = () => axios.get(this.baseURL + "/order");

  setAllOrders = () => {
    this.getAllOrders()
      .then((res) => {
        console.log(res.data.data);
        this.setState({ allOrders: res.data.data });
      })
      .catch((err) => window.alert("Error occurred" + err));
  };

  render() {
    let allOrders = this.state.allOrders;

    let ordersRow = [];
    let inactiveOrders=[];

    if (allOrders.length > 0) {
      allOrders.map((order) => {
        if (order.status === true) {
          let dataForExport = [
            {
              name:"Danko"
            }
          ]

          //bice ulogovani user iz app storage, ovo je mock da bi se videlo nesto
          if (order.author === "pollAuthor") {
            ordersRow.push(
              <div className="active-info">
                <div>
                  <label className="pollLblInfo">
                    {order.restaurantId[0].name}
                  </label>
                </div>
                <div>
                  <label className="pollLblInfo">{order.pollId.author}</label>
                </div>
                <div>
                  <div>
                    <label className="pollLblInfo">Waiting for export</label>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="pollLblInfo"><button>EXPORT NOW</button></label>
                  </div>
                </div>
              </div>
            );
          } else {
            ordersRow.push(
              <div className="active-info">
                <div>
                  <label className="pollLblInfo">
                    {order.restaurantId.name}
                  </label>
                </div>
                <div>
                  <label className="pollLblInfo">{order.pollId.author}</label>
                </div>
                <div>
                  <label className="pollLblInfo">Waiting for export</label>
                </div>
                <div>
                  <label className="pollLblInfo">
                    {order.restaurantId.name}
                  </label>
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
           className='certifyIcon'
            src="/img/certificate.png"
            alt="pollicon"
          />
          <div className="card-heading">
            <h1>Finished Orders</h1>
          </div>
          <div className='finshedOrderGradientWrapp'></div>
          <div className='finishedOrderContent'>
          <div className="finishOrderHeader">
            <div className='finishedOrderFiled'>
              <label className='finishOrderLbl'>Restaurant</label>
            </div>
            <div className='finishedOrderFiled'>
              <label className='finishOrderLbl'>Poll Author</label>
            </div>
            <div className='finishedOrderFiled'>
              <label className='finishOrderLbl'>Status</label>
            </div>
            <div className='finishedOrderFiled'>
              <label className='finishOrderLbl'>Action</label>
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
