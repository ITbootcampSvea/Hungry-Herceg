import React from 'react';
import ActivePolls from './ActivePolls';


class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {/* <Navbar /> */}
                <ActivePolls />
                {/* <ActiveOrders /> */}
            </div>
        )
    }  
}

export default Home