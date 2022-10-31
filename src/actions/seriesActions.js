import * as actions from "./actionTypes";
import axios from "axios";
import { handleError } from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// SERIES
export const seriesRequest = () => ({ type: actions.SERIES_REQUEST });

export const seriesRequestSuccess = (series) => ({
    type: actions.SERIES_REQUEST_SUCCESS,
    payload: series
});

export const seriesRequestFailure = (errorMessage) => ({
    type: actions.SERIES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchSeries = () => {

    return (dispatch) => {
        dispatch(seriesRequest());

        axios.get("/series")
            .then((response) => {
                dispatch(seriesRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, seriesRequestFailure, error);
            });
    };
};


// SERIES DETAILS
export const seriesDetailsRequest = () => ({
    type: actions.SERIES_DETAILS_REQUEST
});

export const seriesDetailsRequestSuccess = (seriesDetails) => ({
    type: actions.SERIES_DETAILS_REQUEST_SUCCESS,
    payload: seriesDetails
});

export const seriesDetailsRequestFailure = (errorMessage) => ({
    type: actions.SERIES_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});


// Async Action
export const fetchSeriesDetails = ({ title }) => {

    return (dispatch) => {
        dispatch(seriesDetailsRequest());

        axios.get("/series/details", {
            params: {
                "title": title
            }
        })
            .then((response) => {
                dispatch(
                    seriesDetailsRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, seriesDetailsRequestFailure, error);
            });
    };
};


// SERIES SEASONS
export const seriesSeasonsRequest = () => ({
    type: actions.SERIES_SEASONS_REQUEST
});

export const seriesSeasonsRequestSuccess = (seriesSeasons) => ({
    type: actions.SERIES_SEASONS_REQUEST_SUCCESS,
    payload: seriesSeasons
});

export const seriesSeasonsRequestFailure = (errorMessage) => ({
    type: actions.SERIES_SEASONS_REQUEST_FAILURE,
    payload: errorMessage
});


// Async Action
export const fetchSeriesSeasons = ({ genre, series }) => {

    return (dispatch) => {
        dispatch(seriesSeasonsRequest());

        axios.get("/series/seasons", {
            params: {
                "genre": genre,
                "series": series
            }
        })
            .then((response) => {
                dispatch(seriesSeasonsRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, seriesSeasonsRequestFailure, error);
            });
    };
};


// SERIES EPISODES
export const seriesEpisodesRequest = () => ({
    type: actions.SERIES_EPISODES_REQUEST
});

export const seriesEpisodesRequestSuccess = (seriesEpisodes) => ({
    type: actions.SERIES_EPISODES_REQUEST_SUCCESS,
    payload: seriesEpisodes
});

export const seriesEpisodesRequestFailure = (errorMessage) => ({
    type: actions.SERIES_EPISODES_REQUEST_FAILURE,
    payload: errorMessage
});


// Async Action
export const fetchSeriesEpisodes = ({ genre, series, season }) => {


    return (dispatch) => {
        dispatch(seriesEpisodesRequest());

        axios.get("/series/episodes", {
            params: {
                "genre": genre,
                "series": series,
                "season": season
            }
        })
            .then((response) => {
                dispatch(
                    seriesEpisodesRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, seriesEpisodesRequestFailure, error);
            });
    };
};



// SERIES EPISODE DETAILS
export const seriesEpisodeDetailsRequest = () => ({
    type: actions.SERIES_EPISODE_DETAILS_REQUEST
});

export const seriesEpisodeDetailsRequestSuccess = (seriesEpisode) => ({
    type: actions.SERIES_EPISODE_DETAILS_REQUEST_SUCCESS,
    payload: seriesEpisode
});

export const seriesEpisodeDetailsRequestFailure = (errorMessage) => ({
    type: actions.SERIES_EPISODE_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});


// Async Action
export const fetchSeriesEpisodeDetails = ({ genre, series, season, episode }) => {

    return (dispatch) => {
        dispatch(seriesEpisodeDetailsRequest());

        axios.get("/episode", {
            params: {
                "genre": genre,
                "series": series,
                "season": season,
                "episode": episode
            }
        })
            .then((response) => {
                dispatch(
                    seriesEpisodeDetailsRequestSuccess(response.data.data.content)
                );
            })
            .catch((error) => {
                handleError(dispatch, seriesEpisodeDetailsRequestFailure, error);
            });
    };
};

// SERIES GENRES
export const seriesGenresRequest = () => ({ type: actions.SERIES_GENRES_REQUEST });

export const seriesGenresRequestSuccess = (seriesGenres) => ({
    type: actions.SERIES_GENRES_REQUEST_SUCCESS,
    payload: seriesGenres
});

export const seriesGenresRequestFailure = (errorMessage) => ({
    type: actions.SERIES_GENRES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchSeriesGenres = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(seriesGenresRequest());

            axios.get("/series/genres")
                .then((response) => {
                    dispatch(seriesGenresRequestSuccess(response.data.data.content));
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, seriesGenresRequestFailure, error);
                    reject();
                });
        })
    };
};


// SERIES WITH GENRE
export const seriesWithGenreRequest = () => ({ type: actions.SERIES_WITH_GENRE_REQUEST });

export const seriesWithGenreRequestSuccess = (series) => ({
    type: actions.SERIES_WITH_GENRE_REQUEST_SUCCESS,
    payload: series
});

export const seriesWithGenreRequestFailure = (errorMessage) => ({
    type: actions.SERIES_WITH_GENRE_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchSeriesWithGenre = ({ genre }) => {

    return (dispatch) => {
        dispatch(seriesWithGenreRequest());

        axios.get(`/series/genres/${genre}`)
            .then((response) => {
                dispatch(seriesWithGenreRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, seriesWithGenreRequestFailure, error);
            });
    };
};