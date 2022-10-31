import * as actions from "./actionTypes";
import axios from "axios";
import { handleError} from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// EBOOKS
export const ebooksRequest = () => ({ type: actions.EBOOKS_REQUEST });

export const ebooksRequestSuccess = (ebooks) => ({
    type: actions.EBOOKS_REQUEST_SUCCESS,
    payload: ebooks
});

export const ebooksRequestFailure = (errorMessage) => ({
    type: actions.EBOOKS_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchEbooks = () => {

    return (dispatch) => {
        dispatch(ebooksRequest());

        axios.get("/ebooks")
            .then((response) => {
                dispatch(ebooksRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, ebooksRequestFailure, error);
            });
    };
};


// EBOOK DETAILS
export const ebookDetailsRequest = () => ({
    type: actions.EBOOK_DETAILS_REQUEST
});

export const ebookDetailsRequestSuccess = (ebookDetails) => ({
    type: actions.EBOOK_DETAILS_REQUEST_SUCCESS,
    payload: ebookDetails
});

export const ebookDetailsRequestFailure = (errorMessage) => ({
    type: actions.EBOOK_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});


// Async Action
export const fetchEbookDetails = ({ title }) => {

    return (dispatch) => {
        dispatch(ebookDetailsRequest());

        axios.get("/ebooks/details", {
            params: {
                "title": title
            }
        })
            .then((response) => {
                dispatch(
                    ebookDetailsRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, ebookDetailsRequestFailure, error);
            });
    };
};

// EBOOK READ
export const ebookReadRequest = () => ({
    type: actions.EBOOK_READ_REQUEST
});

export const ebookReadRequestSuccess = (ebookDetails) => ({
    type: actions.EBOOK_READ_REQUEST_SUCCESS,
    payload: ebookDetails
});

export const ebookReadRequestFailure = (errorMessage) => ({
    type: actions.EBOOK_READ_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchEbookRead = ({ title, author }) => {

    return (dispatch) => {
        dispatch(ebookReadRequest());

        axios.get("/ebooks/details", {
            params: {
                "title": title,
                "author": author
            }
        })
            .then((response) => {
                dispatch(
                    ebookReadRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, ebookReadRequestFailure, error);
            });
    };
};


// EBOOK GENRES
export const ebookGenresRequest = () => ({ type: actions.EBOOK_GENRES_REQUEST });

export const ebookGenresRequestSuccess = (ebookGenres) => ({
    type: actions.EBOOK_GENRES_REQUEST_SUCCESS,
    payload: ebookGenres
});

export const ebookGenresRequestFailure = (errorMessage) => ({
    type: actions.EBOOK_GENRES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchEbookGenres = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(ebookGenresRequest());

            axios.get("/ebooks/genres")
                .then((response) => {
                    dispatch(ebookGenresRequestSuccess(response.data.data.content));
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, ebookGenresRequestFailure, error);
                    reject();
                });
        })
    };
};


// EBOOK WITH GENRE
export const ebooksWithGenreRequest = () => ({ type: actions.EBOOKS_WITH_GENRE_REQUEST });

export const ebooksWithGenreRequestSuccess = (ebooks) => ({
    type: actions.EBOOKS_WITH_GENRE_REQUEST_SUCCESS,
    payload: ebooks
});

export const ebooksWithGenreRequestFailure = (errorMessage) => ({
    type: actions.EBOOKS_WITH_GENRE_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchEbooksWithGenre = ({ genre }) => {

    return (dispatch) => {
        dispatch(ebooksWithGenreRequest());

        axios.get(`/ebooks/genres/${genre}`)
            .then((response) => {
                dispatch(ebooksWithGenreRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, ebooksWithGenreRequestFailure, error);
            });
    };
};