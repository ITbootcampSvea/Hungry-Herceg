import React from 'react';
import { Link } from "react-router-dom";
import { polls } from '../../../src/data';

class ActivePolls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //userName treba da bude username ulogovanog usera sa local storage
            userName: 'Pera',
            allPolls: polls                      
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

    //brisace poll sa servera kada bude gotov back
    //sada brise samo iz state-a
    deletePoll = (index) => {
        let activePollsAfterDelete = this.state.allPolls;
        activePollsAfterDelete.splice(index, 1);
        this.setState({ allPolls: activePollsAfterDelete });
    }

    endPoll = (pollId) => {
        //salje pobednicki restoran u niz ordera na backu 
        //refreshuje home stranicu, kako bismo na njoj odmah videli novi order
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
                            <td><button><Link to={`/poll/${poll.pollId}`}>Vote</Link></button>
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
                            <td><button><Link to={`/poll/${poll.pollId}`}>Vote</Link></button></td>                
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
                <button><Link to={'/createpoll'}>Create new poll</Link></button>      
            </div>
        )
    }
}

export default ActivePolls;