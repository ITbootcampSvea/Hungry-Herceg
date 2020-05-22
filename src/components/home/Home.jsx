import React from 'react';
import ActivePolls from './ActivePolls';
import ActiveOrders from './ActiveOrders';
import './home.css'
import NavBar from '../NavBar/NavBar'


class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
               <NavBar />
                <ActivePolls />
                <ActiveOrders />
            </div>
        )
    }  
}

export default Home