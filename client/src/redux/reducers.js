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
} from './actionsType'

const initialState = {
    all: [],
    breeds: [],
    searchBreeds: [],
    searched: '',
    breedDetail: {},
    temperaments: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                all: [...action.payload],
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
                searchBreeds: [...state.all].filter(e => action.payload.includes(e.id))
            };
        case SEARCH_VALUE:
            return {
                ...state,
                searched: action.payload
            }
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
            if (state.searched === '') {
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
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    })
                };
            };
        case ZA_ALPHABETIC_ORDER:
            if (state.searched === '') {
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
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => {
                        if (a.name < b.name) {
                            return 1;
                        }
                        if (a.name > b.name) {
                            return -1;
                        }
                        return 0;
                    })
                };
            };
        case MAX_HIGHER_WEIGHT_ORDER:
            if (state.searched === '') {
                return {
                    ...state,
                    breeds: [...state.breeds].sort((a, b) => parseInt(b.weight.slice(-2)) - parseInt(a.weight.slice(-2)))
                };
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => parseInt(b.weight.slice(-2)) - parseInt(a.weight.slice(-2)))
                };
            };
        case MIN_HIGHER_WEIGHT_ORDER:
            if (state.searched === '') {
                return {
                    ...state,
                    breeds: [...state.breeds].sort((a, b) => parseInt(a.weight.slice(-2)) - parseInt(b.weight.slice(-2)))
                };
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => parseInt(a.weight.slice(-2)) - parseInt(b.weight.slice(-2)))
                };
            };
        case MAX_LOWER_WEIGHT_ORDER:
            if (state.searched === '') {
                return {
                    ...state,
                    breeds: [...state.breeds].sort((a, b) => parseInt(b.weight.slice(0, 2)) - parseInt(a.weight.slice(0, 2)))
                };
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => parseInt(b.weight.slice(0, 2)) - parseInt(a.weight.slice(0, 2)))
                };
            };
        case MIN_LOWER_WEIGHT_ORDER:
            if (state.searched === '') {
                return {
                    ...state,
                    breeds: [...state.breeds].sort((a, b) => parseInt(a.weight.slice(0, 2)) - parseInt(b.weight.slice(0, 2)))
                };
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].sort((a, b) => parseInt(a.weight.slice(0, 2)) - parseInt(b.weight.slice(0, 2)))
                };
            };
        case API_BREEDS_FILTER:
            return {
                ...state,
                breeds: [...state.breeds]?.filter(e => e.id < 300)
            };
        case DB_BREEDS_FILTER:
            return {
                ...state,
                breeds: [...state.breeds]?.filter(e => e.id > 300)
            };
        case TEMPERAMENTS_FILTER:
            if (state.searched === '') {
                return {
                    ...state,
                    breeds: [...state.breeds].filter(e => e.temperament?.includes(action.payload))
                };
            } else {
                return {
                    ...state,
                    searchBreeds: [...state.searchBreeds].filter(e => e.temperament?.includes(action.payload))
                };
            };
        case LOADING_WAIT:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    };
};

export default reducer;