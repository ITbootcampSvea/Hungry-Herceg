import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar'
import './Vote.css'
import { getPollById, updateVotesByPollId } from '../../services/api.service';
import { useAlert } from 'react-alert';


let votedList = [];
let max = 3;

export default function Vote({ history, match }) {
    const alert = useAlert()

    const [restaurants, setRestaurants] = useState([]);

    const [pollName, setPollName] = useState("");
    const [endTime, setEndTime] = useState("");
    const [pollAuthor, setPollAuthor] = useState("");

    useEffect(() => {

        const { id } = match.params;

         getPollById(id).then((res)=>{
             
             const {data} = res.data;
             
             
            if(data.status){
                setPollName(data.name);
                setEndTime(data.ends);
                setRestaurants(data.restaurants);
                setPollAuthor(data.author);
            }
            else{
                alert.error("Poll is ended");

            }
        }).catch(err=>{alert.error("Something went wrong"+err);  
        })

    }, [])


    const handleVote = (e) => {

        if (e.target.className === 'vote') {

            if (votedList.length < max) { 

                e.target.className = 'voted';
                e.target.innerHTML = "Unvote";

                votedList.push(e.target.id);
            }
            else {
                alert.info(`You can vote for ${max} restsaurants maximum.`); 

            }
        }
        else {
            e.target.className = 'vote';
            e.target.innerHTML = "Vote";
            votedList.splice(restaurants.indexOf(restaurants.find(el => el._id === e.target.id)), 1);
        }

    }

    const confirmVotes = () => {

        const { id } = match.params;
        
        if (votedList.length > 0) {

            updateVotesByPollId(id,votedList).then(res=>{
                if (res.data.message === "Success"){
                    history.push("/home");
                }
                else{
                    alert.error("Something went wrong");
                }
            })
        }
        else {
            alert.info("You neet to vote for at least one restaurant!"); 
        }
    }


    return (
        <div className='wrapper'>
            <NavBar history={history} />
            <div className='voteWrapper'>
                <div className="activeVote">
                    <div className="voteCard">
                        <div className='voteHeader'>
                            <img className='voteingIcon' src='/img/voting.png' alt='vote' />
                        </div>
                        <div className='voteCardInfowrapp'>
                            <div className='voteCardInfoHeader'>
                                <div><label>{pollName}</label> </div>
                                <div><label>{pollAuthor}</label> </div>
                                <div><label>{endTime}</label> </div>
                            </div>
                            <div>
                                <ul>
                                    {restaurants.map(({restaurant}, index) => {
                                        return (
                                            <div className='voteFiledWrapp' key={"res" + index}><div><label className='voteingLbl'> {restaurant.name}</label></div>
                                                <div>
                                                    <button  className="vote" id={restaurant._id} onClick={handleVote}>Vote</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='voteBtnWrapp'>
                                <button className='voteBtn' onClick={confirmVotes}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}