import React from "react";
import ActivePolls from "./ActivePolls";
import ActiveOrders from "./ActiveOrders";
import "./home.css";
import NavBar from "../NavBar/NavBar";
// import FinishedOrders_Milos from "./FinishedOrders_Milos";


const Home = ({ history }) => {
  return (
    <div className="wrapper">
      <NavBar history={history} />
      <div>
        <div className="active">
          <div>
            <ActivePolls />
            <ActiveOrders />
            {/* <FinishedOrders /> */}
          </div>
          {/* <FinishedOrders /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
