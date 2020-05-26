import axios from 'axios';

const baseUrl = "https://hungry-herceg.herokuapp.com";


const findData = async(entity) => {
    return await axios.get(`${baseUrl}/${entity}`);
}

const getDataById = async(entity,id) => {
    return await axios.get(`${baseUrl}/${entity}/${id}`);
}

const createData = async(entity,data) => {
    return await axios.post(`${baseUrl}/${entity}`,data);
}

const editData = async(entity,id,data) => {
    return await axios.put(`${baseUrl}/${entity}/:${id}`,data);
}

const deleteData = async(entity,id) => {
    return await axios.delete(`${baseUrl}/${entity}/:${id}`);
}

export { findData, getDataById, createData, editData, deleteData }