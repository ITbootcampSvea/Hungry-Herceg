import axios from 'axios';


const baseURL = "https://hungry-herceg.herokuapp.com";

//users

export const logInUser = (username, password) => axios.post(baseURL+"/user/login", {username, password});


//Restaurants

export const getRestaurantsAll = () => axios.get(baseURL+"/restaurant");
export const getRestaurantByID = id => axios.get(baseURL+"/restaurant/:"+id);


 //Polls

export const createPoll = (name, duration, restaurants) => axios.post(baseURL+"/poll", {name, duration, restaurants});

export const getAllPolls = async () => {
    const response = await axios(baseURL+"/poll");
    return response.data;
}