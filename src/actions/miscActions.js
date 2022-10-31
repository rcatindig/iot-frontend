import * as actions from './actionTypes';
import axios from 'axios';
import { handleError } from "../helpers/AuthHelper";
const querystring = require('querystring');

// Action Creators
// Entry point for state manipulation

// USER AGREEMENT
export const userAgreementRequest = () => ({ type: actions.USER_AGREEMENT_REQUEST })

export const userAgreementRequestSuccess = (userAgreement) => ({
    type: actions.USER_AGREEMENT_REQUEST_SUCCESS,
    payload: userAgreement
})

export const userAgreementRequestFailure = (errorMessage) => ({
    type: actions.USER_AGREEMENT_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const fetchUserAgreement = () => {

    return (dispatch) => {
        dispatch(userAgreementRequest())

        axios.get("/user-agreement")
            .then(response => {
                dispatch(userAgreementRequestSuccess(response.data.data.content))
            })
            .catch((error) => {
                if (error.response === null || error.response === undefined) {
                    dispatch(userAgreementRequestFailure(error))
                } else {
                    dispatch(userAgreementRequestFailure(error.response.data.error))
                }
            })
    }
}


// DEVICE ID
export const deviceIdRequest = () => ({ type: actions.DEVICE_ID_REQUEST })

export const deviceIdRequestSuccess = (deviceId) => ({
    type: actions.DEVICE_ID_REQUEST_SUCCESS,
    payload: deviceId
})

export const deviceIdRequestFailure = (errorMessage) => ({
    type: actions.DEVICE_ID_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const fetchDeviceId = () => {

    return (dispatch) => {
        dispatch(deviceIdRequest())

        axios.get("/device-id")
            .then(response => {
                dispatch(deviceIdRequestSuccess(response.data.data.id))
            })
            .catch((error) => {
                if (error.response === null || error.response === undefined) {
                    dispatch(deviceIdRequestFailure(error))
                } else {
                    dispatch(deviceIdRequestFailure(error.response.data.error))
                }
            })
    }
}


// MODEL TYPE
export const modelTypeRequest = () => ({ type: actions.MODEL_TYPE_REQUEST })

export const modelTypeRequestSuccess = (modelType) => ({
    type: actions.MODEL_TYPE_REQUEST_SUCCESS,
    payload: modelType
})

export const modelTypeRequestFailure = (errorMessage) => ({
    type: actions.MODEL_TYPE_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const fetchModelType = () => {

    return (dispatch) => {
        dispatch(modelTypeRequest())

        axios.get("/model-type")
            .then(response => {
                dispatch(modelTypeRequestSuccess(response.data.data.modelType))
            })
            .catch((error) => {
                if (error.response === null || error.response === undefined) {
                    dispatch(modelTypeRequestFailure(error))
                } else {
                    dispatch(modelTypeRequestFailure(error.response.data.error))
                }
            })
    }
}


// ADVERTISEMENTS
export const advertisementsRequest = () => ({ type: actions.ADVERTISEMENTS_REQUEST })

export const advertisementsRequestSuccess = (advertisements) => ({
    type: actions.ADVERTISEMENTS_REQUEST_SUCCESS,
    payload: advertisements
})

export const advertisementsRequestFailure = (errorMessage) => ({
    type: actions.ADVERTISEMENTS_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const fetchAdvertisements = () => {

    return (dispatch) => {
        dispatch(advertisementsRequest())

        axios.get("/advertisements")
            .then(response => {
                dispatch(advertisementsRequestSuccess(response.data.data.advertisements))
            })
            .catch((error) => {
                dispatch(advertisementsRequestFailure(error.response.data.error))
            })
    }
}


// TIME-REMAINING
export const timeRemainingRequest = () => ({ type: actions.TIME_REMAINING_REQUEST })

export const timeRemainingRequestSuccess = (timeRemaining) => ({
    type: actions.TIME_REMAINING_REQUEST_SUCCESS,
    payload: timeRemaining
})

export const timeRemainingRequestFailure = (errorMessage) => ({
    type: actions.TIME_REMAINING_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const fetchTimeRemaining = () => {

    return (dispatch) => {
        dispatch(timeRemainingRequest())

        axios.get("/time-remaining")
            .then(response => {
                dispatch(timeRemainingRequestSuccess(response.data.data.timeRemaining))
            })
            .catch((error) => {
                handleError(dispatch, timeRemainingRequestFailure, error);
            })
    }
}

// SEARCH
export const searchRequest = () => ({ type: actions.SEARCH_REQUEST })

export const searchRequestSuccess = (search) => ({
    type: actions.SEARCH_REQUEST_SUCCESS,
    payload: search
})

export const searchRequestFailure = (errorMessage) => ({
    type: actions.SEARCH_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const search = (searchTerm, categories) => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(searchRequest())

            axios.post("/search?" + querystring.stringify({
                "term": searchTerm,
                "categories": categories
            }))
                .then(response => {
                    dispatch(searchRequestSuccess(response.data.data))
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, searchRequestFailure, error);
                    reject()
                })
        })
    }
}