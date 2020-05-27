import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './poll.css'
import { useAlert } from 'react-alert'
import { getRestaurantsAll, createPoll } from '../../services/api.service';


let hours = 0;
let minutes = 15;
let duration = 1;
let pollName = '';

let itemsToShow = 5;
let overflow = false;

let max = 15;


export default function CreatePoll({ history }) {
    const alert = useAlert();

    const [restaurants, setRestaurants] = useState([]);


    const [pollList, setPollList] = useState([]);
    const [search, setSearch] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [stateOverflow, setStateOverflow] = useState(false);

    useEffect(() => {        
        getRestaurantsAll().then(res => {
          
            setRestaurants(res.data.data);
            
        }).catch(res=>alert.error('Something wrong happened. Try reload or contact support. Details:' + res ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleRestaurantName = (e) => {
        setSearch(e.target.value);
    }



    const handleAdd = (e) => { // move restorant from search list to poll list
        
        if (pollList.length < max){
            const { id } = e.target;
            let tempArr = restaurants;
            setPollList([...pollList, restaurants.find((restaurant, index) => {
                if (restaurant._id + "" === id + "") {
                    tempArr.splice(index, 1);
                    setRestaurants(tempArr);
                    return true;
                }
                return false;

            })]);
        }
        else{
            alert.error("Nubmer of restaurants must be less that " + max);
        }

    }
    const handleRemove = (e) => { // move back restorant from poll list to search list
        const { id } = e.target;
        let tempArr = pollList;
        setRestaurants([...restaurants, pollList.find((restaurant, index) => {
            if (restaurant._id + "" === id + "") {
                tempArr.splice(index, 1);
                setPollList(tempArr);
                return true;
            }
            return false;

        })]);
    }

    const customSort = (arr) => {  // sort array by name
        arr.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });

        return arr;
    }

    const filterList = (restaurants, search, showAll) => {

        let arr = customSort(restaurants).filter(el => {
            
            if (search.startsWith("#")){

                for (let i = 0; i < el.tags.length; i++) {
                    if(el.tags[i].startsWith(search.slice(1,search.length))){
                        return true;
                    }
                      
                }
                return false;
            }

            else{
                return el.name.toLowerCase().includes(search.toLowerCase());
            }
        
        });

        overflow = arr.length > itemsToShow;

        if (!showAll) {
            arr = arr.slice(0, itemsToShow);
        }

        if (overflow !== stateOverflow) {
            setStateOverflow(overflow);
        }
        return arr;
    }
    const handleShowHide = () => {
        setShowAll(!showAll);
    }



    const handlePollName = (e) => {
        pollName = e.target.value
    }

    const handleEndTime = (e) => {
        let { name, value } = e.target;
        switch (name) {
            case 'hours': (value > 24) ? (e.target.value = hours) : (hours = value);
                break;
            case 'minutes': (value > 59) ? (e.target.value = minutes) : (minutes = value);
                break;
            default:
                break;
        }
        duration = hours * 60 + minutes;
    }

    const handleCreatePoll = () => {
        if (pollName.trim().length < 1) {
            alert.error('Plese enter poll name'); 
            return;
        }

        if (pollList.length < 2 || pollList.length > max) {
            alert.error("Poll list must contain more than 2 and less than 15 items");
            return;
        }
        if (duration < 1) {
            alert.error('Poll duration must be longer than 15 min!'); 
            return;
        }


        const poll = {
            name: pollName,
            duration: duration,
            restaurants: pollList.map(res => res._id),
        }
        
        createPoll(poll.name,poll.duration,poll.restaurants).then(res=>{ 
            if(res.data.message === "Success"){
                history.push("/home");
            }
            else{
                alert.error("Something went wrong");
            }
        }).catch(err=>{
            alert.error("Something went wrong:" + err);
        })
    }
    const handleCancel = () => {

        history.push('/home')
    }


    return (
        <div className='wrapper'>
            <NavBar history={history} />
            <div className='mainPartWrapper'>
            <div className='activePoll'>
                <div className='pollWrapper'>
                    <div className='newPollCard'>
                        <div className='createPollInfoWrapp' >
                    <div className='createPollInfo'>
                            <div className='createPollHeading'>
                                <h3 className='headingCard'>Create New Poll</h3>
                            </div>
                            <div className='createPollContent'>
                                <div className='newPollInpDiv' >
                                    <input type="text" onChange={(e) => handlePollName(e)} className='newPollInp' placeholder='Enter Poll Name' ></input>
                                </div>
                                <div className='createPollDurationWrapp'>
                                    <label className='timeInfoLbl'>Hours:</label><input className='NoInpPoll' type="number" min="0" max="24" defaultValue="0" name="hours" onChange={(e) => handleEndTime(e)}
                                        onKeyDown={(e) => (e.key === '-' || e.key === '.') ? e.preventDefault() : null}></input>
                                    <label className='timeInfoLbl'>Minutes:</label><input className='NoInpPoll' type="number" min="15" max="59" defaultValue="15" name="minutes" onChange={(e) => handleEndTime(e)}
                                        onKeyDown={(e) => (e.key === '-' || e.key === '.') ? e.preventDefault() : null}></input>
                                </div>
                                <div className='gradientDiv'>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className='searchRestWrapp' >
                        <div className='searchRest'>
                            <div className='createPollHeading'>
                                <label className='headingCard'>Search Restaurants</label>
                            </div>
                            <div className='newPollInpDiv'>
                                <input type="text" placeholder="Search" className='newPollInp' onInput={handleRestaurantName} />
                            </div>
                            <div className='showAllBtnWrap'>
                                {stateOverflow ? (<button className='showAllBtn' onClick={handleShowHide}>{!showAll ? "Show all >>>" : "Show less <<<"}</button>) : null}
                            </div>
                            <div id="style-6" className='filteredListWrap'>
                                {filterList(restaurants, search, showAll).map((restaurant, index) => {
                                    return (<div className='filteredResColumn' key={"result" + index}>
                                        <div className='restNameWrapp'>
                                            <label className='restNameLbl'>{restaurant.name}</label>
                                        </div>
                                        <div className='restImgWrapp'>
                                            <img src='/img/add-restaurant.png' alt='add' title='Add Restaurant' className='addRestImg' id={restaurant._id} onClick={handleAdd} />
                                        </div>
                                    </div>)
                                })}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div  className='restListWrapp'>
                        <div className='restaurantList'>
                            <div className='restListHeader'>
                            </div>
                            <div className='restaurantsHeading'>
                                <h1 className='restWord'>Restaurants</h1>
                            </div>
                            <div id="style-4" className='pollListRestWrapp'>
                                {pollList.map((restaurant, index) => {
                                    return (<div className='transitionClmn' key={"picked" + index}>
                                        <div className='nameOfPickedRest'>
                                            <label className='choosenRest'>{restaurant.name}</label>
                                        </div>
                                        <div className='removeImgWrapp'>
                                            <img src='/img/del.png' alt='del' className='removeBtn' title='Remove Restaurant' id={restaurant._id} onClick={handleRemove} />
                                        </div>
                                    </div>)
                                })}
                            </div>
                            <div className='creNewPollBtns'>
                                    <div className='leftBtnDiv'>
                                        <button className='leftBtnCreatePoll' onClick={(e) => handleCreatePoll(e)}>Create Poll</button>
                                    </div>
                                    <div className='rightBtnDiv'>
                                        <button className='rightBtnCreatePoll' onClick={(e) => handleCancel(e)}>Cancel</button>
                                    </div>
                                </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div >
        </div >
    )
}
