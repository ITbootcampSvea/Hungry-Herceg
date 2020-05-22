import React from 'react';
import ActivePolls from './ActivePolls';
import ActiveOrders from './ActiveOrders';
import './home.css'
import NavBar from '../NavBar/NavBar'


const Home = ({history}) => {

        return(
            <div>
                <NavBar history={history}/>
                <ActivePolls />
                <ActiveOrders />
            </div>
        )   
}

export default Home