import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    musicPlaylists: [],
    musicPlaylist: [],
};

const musicPlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
        // MUSIC PLAYLIST
        case actions.MUSICPLAYLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MUSICPLAYLIST_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                musicPlaylists: action.payload
            };
        case actions.MUSICPLAYLIST_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // MUSIC 
        case actions.MUSIC_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MUSIC_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                musicPlaylist: action.payload
            };
        case actions.MUSIC_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default musicPlaylistReducer;
