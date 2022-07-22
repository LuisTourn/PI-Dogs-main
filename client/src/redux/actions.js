import {
    GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_BREED_SEARCH,
    GET_ALL_TEMPERAMENTS,
    CREATE_BREED,
    AZ_ALPHABETIC_ORDER,
    ZA_ALPHABETIC_ORDER,
    MAX_HIGHER_WEIGHT_ORDER,
    MIN_HIGHER_WEIGHT_ORDER,
    MAX_LOWER_WEIGHT_ORDER,
    MIN_LOWER_WEIGHT_ORDER,
    API_BREEDS_FILTER,
    DB_BREEDS_FILTER,
    TEMPERAMENTS_FILTER,
    LOADING_WAIT,
    SEARCH_VALUE
} from './actionsType';
import axios from 'axios';

const getAllBreeds = () => async (dispatch) => {
    try {
        dispatch(loadingWait(true));
        const breeds = await axios('http://localhost:3001/dogs');
        dispatch({
            type: GET_ALL_BREEDS,
            payload: breeds.data
        });
        return dispatch(loadingWait(false));
    } catch (e) {
        console.log(e);
    };
};

const getBreedDetail = (id) => async (dispatch) => {
    try {
        dispatch(loadingWait(true));
        const breed = await axios(`http://localhost:3001/dogs/${id}`);
        dispatch({
            type: GET_BREED_DETAIL,
            payload: breed.data
        });
        return dispatch(loadingWait(false));
    } catch (e) {
        console.log(e);
    };
};

const getBreedSearch = (name) => async (dispatch) => {
    try {
        dispatch(loadingWait(true));
        const breed = await axios(`http://localhost:3001/dogs?name=${name}`);
        dispatch({
            type: GET_BREED_SEARCH,
            payload: breed.data
        });
        return dispatch(loadingWait(false));
    } catch (e) {
        console.log(e);
    };
};

const searchValue = value => dispatch => {
    return dispatch({
        type: SEARCH_VALUE,
        payload: value
    });
};

const resetBreedSearch = array => dispatch => {
    return dispatch({
        type: GET_BREED_SEARCH,
        payload: array
    });
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
    };
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
    };
};

const orderBreeds = (order) => {
    if (order === 'az') {
        return {
            type: AZ_ALPHABETIC_ORDER,
        };
    } else if (order === 'za') {
        return {
            type: ZA_ALPHABETIC_ORDER,
        };
    } else if (order === 'maxHigherWeight') {
        return {
            type: MAX_HIGHER_WEIGHT_ORDER,
        };
    } else if (order === 'minHigherWeight') {
        return {
            type: MIN_HIGHER_WEIGHT_ORDER,
        };
    } else if (order === 'maxLowerWeight'){
        return {
            type: MAX_LOWER_WEIGHT_ORDER,
        }
    } else if (order === 'minLowerWeight'){
        return {
            type: MIN_LOWER_WEIGHT_ORDER,
        };
    };
};

const breedsFilter = (apiOrDb) => {
    if (apiOrDb === 'api') {
        return {
            type: API_BREEDS_FILTER
        };
    } else if (apiOrDb === 'db') {
        return {
            type: DB_BREEDS_FILTER
        };
    };
};

const temperamentsFilter = (temperament) => {
    return {
        type: TEMPERAMENTS_FILTER,
        payload: temperament
    };
};

const loadingWait = (wait) => (dispatch) => {
    return dispatch({
        type: LOADING_WAIT,
        payload: wait
    })
}

export {
    getAllBreeds,
    getBreedDetail,
    getBreedSearch,
    searchValue,
    resetBreedSearch,
    getAllTemperaments,
    createNewBreed,
    orderBreeds,
    breedsFilter,
    temperamentsFilter,
    loadingWait    
};