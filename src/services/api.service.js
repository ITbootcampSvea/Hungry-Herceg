import axios from 'axios';


const baseURL = "https://hungry-herceg.herokuapp.com";


//Restaurants

export const getRestaurantsAll = () => axios.get(baseURL+"/restaurant");
export const getRestaurantByID = id => axios.get(baseURL+"/restaurant/:"+id);


 //Polls

export const createPoll = (name,author,duration,restaurants) => axios.post(baseURL+"poll", {name,author,duration,restaurants});

