import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    audiobooks: [],
    audiobook: {},
    genres: [],
    genre: ""
};

const audiobooksReducer = (state = initialState, action) => {
    switch (action.type) {
        // AUDIOBOOKS
        case actions.AUDIOBOOKS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.AUDIOBOOKS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                audiobooks: action.payload
            };
        case actions.AUDIOBOOKS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // AUDIOBOOK DETAILS
        case actions.AUDIOBOOK_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.AUDIOBOOK_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                audiobook: action.payload
            };
        case actions.AUDIOBOOK_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // AUDIOBOOK LISTEN
        case actions.AUDIOBOOK_LISTEN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.AUDIOBOOK_LISTEN_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                audiobook: action.payload
            };
        case actions.AUDIOBOOK_LISTEN_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // AUDIOBOOK GENRES
        case actions.AUDIOBOOK_GENRES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.AUDIOBOOK_GENRES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                genres: action.payload
            };
        case actions.AUDIOBOOK_GENRES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // AUDIOBOOKS WITH GENRE
        case actions.AUDIOBOOKS_WITH_GENRE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.AUDIOBOOKS_WITH_GENRE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                audiobooks: action.payload
            };
        case actions.AUDIOBOOKS_WITH_GENRE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default audiobooksReducer;
