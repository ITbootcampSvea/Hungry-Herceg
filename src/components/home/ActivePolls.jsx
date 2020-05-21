import React from 'react';

class ActivePolls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //userName treba da bude username ulogovanog usera sa local storage
            userName: 'Dusan Bobicic',
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

    deletePoll = (index) => {
        let activePollsAfterDelete = this.state.allPolls;
        activePollsAfterDelete.splice(index, 1);
        this.setState({ allPolls: activePollsAfterDelete });
    }


    render(){


        let allPolls = this.state.allPolls;
        let pollsRow = [];
        if(allPolls.length>0) {
            allPolls.map((poll, index)=>{
                if(poll.author==this.state.userName){
                    pollsRow.push(
                        <tr>
                            <td>{poll.name}</td>
                            <td>{poll.author}</td>
                            <td>{poll.ends}</td>
                            <td><button>Vote</button>
                                <button>End</button>
                                <button onClick={()=>this.deletePoll(index)}>Delete</button>
                            </td>               
                        </tr>);
                } else {
                    pollsRow.push(
                        <tr>
                            <td>{poll.name}</td>
                            <td>{poll.author}</td>
                            <td>{poll.ends}</td>
                            <td><button>Vote!</button></td>                
                        </tr>);
                }
                
            })
        } else {
            pollsRow = <tr><td>No active polls</td></tr>;
        }
        

        
        return (
            <div>
                <h2>ACTIVE POLLS</h2>
                <table>                 
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>End time</th>
                        <th>Actions</th>
                    </tr>
                    {pollsRow}
                </table>
                <button>Create new poll</button>      
            </div>
        )
    }
}

export default ActivePolls;