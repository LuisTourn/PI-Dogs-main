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
    MIN_LOWER_WEIGHT_ORDER
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
        case AZ_ALPHABETIC_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  })
            };
        case ZA_ALPHABETIC_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => {
                    if (a.name < b.name) {
                      return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })
            };
        case MAX_HIGHER_WEIGHT_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => parseInt(b.weight.slice(-2)) - parseInt(a.weight.slice(-2)))
            };
        case MIN_HIGHER_WEIGHT_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => parseInt(a.weight.slice(-2)) - parseInt(b.weight.slice(-2)))
            };
        case MAX_LOWER_WEIGHT_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => parseInt(b.weight.slice(0, 2)) - parseInt(a.weight.slice(0, 2)))
            };
        case MIN_LOWER_WEIGHT_ORDER:
            return {
                ...state,
                breeds: [...state.breeds].sort((a, b) => parseInt(a.weight.slice(0, 2)) - parseInt(b.weight.slice(0, 2)))
            };
        default:
            return state;
    };
};

export default reducer;