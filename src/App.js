import React from 'react';
import { authService } from './services/auth.service';
import {BrowserRouter, Switch, Redirect} from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Home from './components/home/Home';
import LogIn from './components/LogIn/LogIn';
import CreateOrderItem from './components/Order/CreateOrderItem';
import CreatePoll from './components/CreatePoll/CreatePoll';




function App() {
  
  return (
    <BrowserRouter>
    <Switch>      
      <PublicRoute component={LogIn} path="/login" />

      <PrivateRoute component={Home} path="/home" />
      <PrivateRoute component={CreateOrderItem} path='/order/:id' />
      <PrivateRoute component={CreatePoll} path="/createpoll" />
      {/* <PrivateRoute component={Statistics} path="/stats" />
      <PrivateRoute component={Settings} path="/settings" /> */}

      {/* <PrivateRoute component={Poll} path="/poll/:id" /> */}
      {/* <PrivateRoute component={Order} path="/order/:id" /> */}

      <Redirect to={authService.isLoged()?"/home":"/login"} />

      </Switch>
  </BrowserRouter>
  );
}

export default App;
