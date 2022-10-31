import * as actions from "./actionTypes";
import axios from "axios";
import { handleError} from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// MOVIES
export const moviesRequest = () => ({ type: actions.MOVIES_REQUEST });

export const moviesRequestSuccess = (movies) => ({
    type: actions.MOVIES_REQUEST_SUCCESS,
    payload: movies
});

export const moviesRequestFailure = (errorMessage) => ({
    type: actions.MOVIES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMovies = () => {

    return (dispatch) => {
        dispatch(moviesRequest());

        axios.get("/movies")
            .then((response) => {
                dispatch(moviesRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, moviesRequestFailure, error);
            });
    };
};


// MOVIE DETAILS
export const movieDetailsRequest = () => ({
    type: actions.MOVIE_DETAILS_REQUEST
});

export const movieDetailsRequestSuccess = (movieDetails) => ({
    type: actions.MOVIE_DETAILS_REQUEST_SUCCESS,
    payload: movieDetails
});

export const movieDetailsRequestFailure = (errorMessage) => ({
    type: actions.MOVIE_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMovieDetails = ({ name }) => {

    return (dispatch) => {
        dispatch(movieDetailsRequest());

        axios.get("/movies/details", {
            params: {
                "name": name
            }
        })
            .then((response) => {
                dispatch(movieDetailsRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, movieDetailsRequestFailure, error);
            });
    };
};


// MOVIE GENRES
export const movieGenresRequest = () => ({ type: actions.MOVIE_GENRES_REQUEST });

export const movieGenresRequestSuccess = (movieGenres) => ({
    type: actions.MOVIE_GENRES_REQUEST_SUCCESS,
    payload: movieGenres
});

export const movieGenresRequestFailure = (errorMessage) => ({
    type: actions.MOVIE_GENRES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMovieGenres = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {

            dispatch(movieGenresRequest());

            axios.get("/movies/genres")
                .then((response) => {
                    dispatch(movieGenresRequestSuccess(response.data.data.content));
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, movieGenresRequestFailure, error);
                    reject();
                });
        })
    }
};


// MOVIE WITH GENRE
export const moviesWithGenreRequest = () => ({ type: actions.MOVIES_WITH_GENRE_REQUEST });

export const moviesWithGenreRequestSuccess = (movies) => ({
    type: actions.MOVIES_WITH_GENRE_REQUEST_SUCCESS,
    payload: movies
});

export const moviesWithGenreRequestFailure = (errorMessage) => ({
    type: actions.MOVIES_WITH_GENRE_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMoviesWithGenre = ({ genre }) => {

    return (dispatch) => {
        dispatch(moviesWithGenreRequest());

        axios.get(`/movies/genres/${genre}`)
            .then((response) => {
                dispatch(moviesWithGenreRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, moviesWithGenreRequestFailure, error);
            });
    };
};