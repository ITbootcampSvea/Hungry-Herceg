import React from "react";
import ActivePolls from "./ActivePolls";
import ActiveOrders from "./ActiveOrders";
import "./home.css";
import NavBar from "../NavBar/NavBar";
// import FinishedOrders from "./FinishedOrders";


const Home = ({ history }) => {
    
  return (
    <div className="wrapper">
      <NavBar history={history} />
      <div>
        <div className="active">
          <ActivePolls />
          <ActiveOrders />
          {/* <FinishedOrders /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
