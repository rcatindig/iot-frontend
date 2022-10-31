import * as actions from "./actionTypes";
import axios from "axios";
import { handleError} from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// AUDIOBOOKS
export const audiobooksRequest = () => ({ type: actions.AUDIOBOOKS_REQUEST });

export const audiobooksRequestSuccess = (audiobooks) => ({
    type: actions.AUDIOBOOKS_REQUEST_SUCCESS,
    payload: audiobooks
});

export const audiobooksRequestFailure = (errorMessage) => ({
    type: actions.AUDIOBOOKS_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchAudioBooks = () => {

    return (dispatch) => {
        dispatch(audiobooksRequest());

        axios.get("/audiobooks")
            .then((response) => {
                dispatch(audiobooksRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, audiobooksRequestFailure, error);
            });
    };
};


// AUDIOBOOK DETAILS
export const audiobookDetailsRequest = () => ({
    type: actions.AUDIOBOOK_DETAILS_REQUEST
});

export const audiobookDetailsRequestSuccess = (audiobookDetails) => ({
    type: actions.AUDIOBOOK_DETAILS_REQUEST_SUCCESS,
    payload: audiobookDetails
});

export const audiobookDetailsRequestFailure = (errorMessage) => ({
    type: actions.AUDIOBOOK_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchAudiobookDetails = ({ title, author }) => {

    return (dispatch) => {
        dispatch(audiobookDetailsRequest());

        axios.get("/audiobooks/details", {
            params: {
                "title": title
            }
        })
            .then((response) => {
                dispatch(
                    audiobookDetailsRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, audiobookDetailsRequestFailure, error);
            });
    };
};


// AUDIOBOOK LISTEN
export const audiobookListenRequest = () => ({
    type: actions.AUDIOBOOK_LISTEN_REQUEST
});

export const audiobookListenRequestSuccess = (audiobookDetails) => ({
    type: actions.AUDIOBOOK_LISTEN_REQUEST_SUCCESS,
    payload: audiobookDetails
});

export const audiobookListenRequestFailure = (errorMessage) => ({
    type: actions.AUDIOBOOK_LISTEN_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchAudiobookListen = ({ title, author }) => {

    return (dispatch) => {
        dispatch(audiobookListenRequest());

        axios.get("/audiobooks/details", {
            params: {
                "title": title,
                "author": author
            }
        })
            .then((response) => {
                dispatch(
                    audiobookListenRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, audiobookListenRequestFailure, error);
            });
    };
};


// AUDIOBOOK GENRES
export const audiobookGenresRequest = () => ({ type: actions.AUDIOBOOK_GENRES_REQUEST });

export const audiobookGenresRequestSuccess = (audiobookGenres) => ({
    type: actions.AUDIOBOOK_GENRES_REQUEST_SUCCESS,
    payload: audiobookGenres
});

export const audiobookGenresRequestFailure = (errorMessage) => ({
    type: actions.AUDIOBOOK_GENRES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchAudiobookGenres = () => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(audiobookGenresRequest());

            axios.get("/audiobooks/genres")
                .then((response) => {
                    dispatch(audiobookGenresRequestSuccess(response.data.data.content));
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, audiobookGenresRequestFailure, error);
                    reject();
                });
        })
    };
};


// AUDIOBOOK WITH GENRE
export const audiobooksWithGenreRequest = () => ({ type: actions.AUDIOBOOKS_WITH_GENRE_REQUEST });

export const audiobooksWithGenreRequestSuccess = (audiobooks) => ({
    type: actions.AUDIOBOOKS_WITH_GENRE_REQUEST_SUCCESS,
    payload: audiobooks
});

export const audiobooksWithGenreRequestFailure = (errorMessage) => ({
    type: actions.AUDIOBOOKS_WITH_GENRE_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchAudioBooksWithGenre = ({ genre }) => {

    return (dispatch) => {
        dispatch(audiobooksWithGenreRequest());

        axios.get(`/audiobooks/genres/${genre}`)
            .then((response) => {
                dispatch(audiobooksWithGenreRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, audiobooksWithGenreRequestFailure, error);
            });
    };
};