import * as actions from "./actionTypes";
import axios from "axios";
import { handleError } from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// MUSIC PLAYLIST
export const musicPlaylistRequest = () => ({ type: actions.MUSICPLAYLIST_REQUEST });

export const musicPlaylistRequestSuccess = (musicPlaylist) => ({
    type: actions.MUSICPLAYLIST_REQUEST_SUCCESS,
    payload: musicPlaylist
});

export const musicPlaylistRequestFailure = (errorMessage) => ({
    type: actions.MUSICPLAYLIST_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMusicPlaylists = () => {

    return (dispatch) => {
        dispatch(musicPlaylistRequest());

        axios.get("/playlists")
            .then((response) => {
                dispatch(musicPlaylistRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, musicPlaylistRequestFailure, error);
            });
    };
};

// MUSIC
export const musicRequest = () => ({ type: actions.MUSIC_REQUEST });

export const musicRequestSuccess = (music) => ({
    type: actions.MUSIC_REQUEST_SUCCESS,
    payload: music
});

export const musicRequestFailure = (errorMessage) => ({
    type: actions.MUSIC_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchMusic = ({ title }) => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(musicRequest());

            axios.get("/playlists/music", {
                params: {
                    "title": title
                }
            })
                .then((response) => {
                    dispatch(musicRequestSuccess(response.data.data.content));
                    resolve();
                })
                .catch((error) => {
                    handleError(dispatch, musicRequestFailure, error);
                    reject();
                });
        })
    };
};
