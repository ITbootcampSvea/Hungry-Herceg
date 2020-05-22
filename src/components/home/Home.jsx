import React from 'react';
import ActivePolls from './ActivePolls';
import ActiveOrders from './ActiveOrders';
import './home.css'
import NavBar from '../NavBar/NavBar'


const Home = ({history}) => {

        return(
            <div className='wrapper'>
               <NavBar />
               <div >
                   <div className='active'>
                   <ActivePolls />
                <ActiveOrders />
                   </div>
              
               </div>
              
            </div>
        )   
}

export default Home