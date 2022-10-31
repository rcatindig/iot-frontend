import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    movies: [],
    movie: {},
    genres: [],
    genre: ""
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        // MOVIES
        case actions.MOVIES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MOVIES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                movies: action.payload
            };
        case actions.MOVIES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // MOVIE DETAILS
        case actions.MOVIE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MOVIE_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                movie: action.payload
            };
        case actions.MOVIE_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // MOVIE GENRES
        case actions.MOVIE_GENRES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MOVIE_GENRES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                genres: action.payload
            };
        case actions.MOVIE_GENRES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // MOVIES WITH GENRE
        case actions.MOVIES_WITH_GENRE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MOVIES_WITH_GENRE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                movies: action.payload
            };
        case actions.MOVIES_WITH_GENRE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default movieReducer;
