import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    ebooks: [],
    ebook: {},
    genres: [],
    genre: ""
};

const ebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        // EBOOKS
        case actions.EBOOKS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.EBOOKS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                ebooks: action.payload
            };
        case actions.EBOOKS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // EBOOK DETAILS
        case actions.EBOOK_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.EBOOK_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                ebook: action.payload
            };
        case actions.EBOOK_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // EBOOK READ
        case actions.EBOOK_READ_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.EBOOK_READ_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                ebook: action.payload
            };
        case actions.EBOOK_READ_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // EBOOK GENRES
        case actions.EBOOK_GENRES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.EBOOK_GENRES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                genres: action.payload
            };
        case actions.EBOOK_GENRES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // EBOOKS WITH GENRE
        case actions.EBOOKS_WITH_GENRE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.EBOOKS_WITH_GENRE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                ebooks: action.payload
            };
        case actions.EBOOKS_WITH_GENRE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default ebooksReducer;
