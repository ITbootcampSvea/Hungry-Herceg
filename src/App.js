import React from 'react';
import { authService } from './services/auth.service';

function App() {
  
  return (
    <BrowserRouter>
    <Switch>      
      <PublicRoute component={LogIn} path="/login" />

      <PrivateRoute component={Home} path="/home" />
      <PrivateRoute component={CreatePoll} path="/createpoll" />
      <PrivateRoute component={Statistics} path="/stats" />
      <PrivateRoute component={Settings} path="/settings" />

      <PrivateRoute component={Poll} path="/poll/:id" />
      <PrivateRoute component={Order} path="/order/:id" />

      <Redirect to={authService.isLoged()?"/home":"/login"} />

      </Switch>
  </BrowserRouter>
  );
}

export default App;
