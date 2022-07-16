import {
    GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_BREED_SEARCH,
    GET_ALL_TEMPERAMENTS,
    CREATE_BREED
} from './actionsType';
import axios from 'axios';

const getAllBreeds = () => async (dispatch) => {
    try {
        const breeds = await axios('http://localhost:3001/dogs');
        return dispatch({
            type: GET_ALL_BREEDS,
            payload: breeds.data
        });
    } catch (e) {
        console.log(e);
    }
};

const getBreedDetail = (id) => async (dispatch) => {
    try {
        const breed = await axios(`http://localhost:3001/dogs/${id}`);
        return dispatch({
            type: GET_BREED_DETAIL,
            payload: breed.data
        });
    } catch (e) {
        console.log(e);
    }
};

const getBreedSearch = (name) => async (dispatch) => {
    try {
        const breed = await axios(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: GET_BREED_SEARCH,
            payload: breed.data
        });
    } catch (e) {
        console.log(e);
    }
};

const getAllTemperaments = () => async (dispatch) => {
    try {
        const temperaments = await axios(`http://localhost:3001/temperaments`);
        return dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: temperaments.data
        });
    } catch (e) {
        console.log(e);
    }
};

const createNewBreed = (value) => async (dispatch) => {
    try {
        await axios({ method: 'post', url: 'http://localhost:3001/dogs', data: value });
        dispatch({
            type: CREATE_BREED,
            payload: value
        });
        return alert('Breed created');
    } catch (e) {
        console.log(e);
        return alert('Missing to enter mandatory data');
    }
};

export {
    getAllBreeds,
    getBreedDetail,
    getBreedSearch,
    getAllTemperaments,
    createNewBreed
};