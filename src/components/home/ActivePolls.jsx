import React from 'react';

class ActivePolls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allPolls: [
                {
                    pollId: 0,
                    name: 'First poll ever created',
                    author: 'Nikola Mrkovic',
                    createdAt: "00:00AM",
                    ends: "00:10AM",
                    duration: '10 (min)',
                    status: 'active',
                    restaurants: [
                        {
                        restaurantId: 0,
                        votes: 0
                        },
                        {
                        restaurantId: 1,
                        votes: 0
                        }
                    ]
                },
                {
                    pollId: 1,
                    name: 'Second poll ever created',
                    author: 'Dusan Bobicic',
                    createdAt: "00:00AM",
                    ends: "00:10AM",
                    duration: '10 (min)',
                    status: 'active',
                    restaurants: [
                        {
                        restaurantId: 0,
                        votes: 0
                        },
                        {
                        restaurantId: 1,
                        votes: 0
                        }
                    ]
                }                       
            ]
        }
    }

    componentDidMount() {
        this.setAllPolls();
    }

    setAllPolls = async () => {
        // let allPolls = await getAllPolls();
        //getAllPolls ce biti u service i vuci ce sve polove sa servera
        // this.setState({ allPolls: allPolls });
    }

    render(){
        return (
            <div>
                <button>Vote!</button>
            </div>
        )
    }
}

export default ActivePolls;