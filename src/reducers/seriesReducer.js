import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    series: [],
    currentSeries: {},
    genres: [],
    genre: ""
};

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        // SERIES
        case actions.SERIES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                series: action.payload
            };
        case actions.SERIES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // SERIES DETAILS
        case actions.SERIES_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                currentSeries: action.payload
            };
        case actions.SERIES_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };


        // SERIES SEASONS
        case actions.SERIES_SEASONS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_SEASONS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                seasons: action.payload
            };
        case actions.SERIES_SEASONS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };


        // SERIES EPISODES
        case actions.SERIES_EPISODES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_EPISODES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                episodes: action.payload
            };
        case actions.SERIES_EPISODES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // SERIES EPISODE DETAILS
        case actions.SERIES_EPISODE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_EPISODE_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                episode: action.payload
            };
        case actions.SERIES_EPISODE_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };



        
        // SERIES GENRES
        case actions.SERIES_GENRES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_GENRES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                genres: action.payload
            };
        case actions.SERIES_GENRES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // SERIES WITH GENRE
        case actions.SERIES_WITH_GENRE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SERIES_WITH_GENRE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                series: action.payload
            };
        case actions.SERIES_WITH_GENRE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default seriesReducer;
