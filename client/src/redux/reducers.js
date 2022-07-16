import {
    GET_ALL_BREEDS, 
    GET_BREED_DETAIL,
    GET_BREED_SEARCH,
    GET_ALL_TEMPERAMENTS,
    CREATE_BREED
} from './actionsType'

const initialState = {
    breeds: [],
    filterBreeds: [],
    breedDetail: {},
    temperaments: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                breeds: [...action.payload]
            };
        case GET_BREED_DETAIL:
            return {
                ...state,
                breedDetail: action.payload
            };
        case GET_BREED_SEARCH:
            return {
                ...state,
                filterBreeds: state.breeds.filter(e => action.payload.includes(e.id))
            };
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case CREATE_BREED:
            return {
                ...state,
                breeds: [...state.breeds, action.payload]
            };
        default:
            return state;
    };
};

export default reducer;