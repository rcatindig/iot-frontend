import * as actions from './actionTypes';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// Action Creators
// Entry point for state manipulation

// LOGIN
export const loginRequest = () => ({ type: actions.LOGIN_REQUEST })

export const loginRequestSuccess = (accessToken) => ({
    type: actions.LOGIN_REQUEST_SUCCESS,
    payload: accessToken
})

export const loginRequestFailure = (errorMessage) => ({
    type: actions.LOGIN_REQUEST_FAILURE,
    payload: errorMessage
})

// Async Action
export const login = ({ email, passcode, modelType }) => {

    return (dispatch) => {
        return new Promise((resolove, reject) => {
            dispatch(loginRequest())

            axios.post("/login", {
                "email": email,
                "passcode": passcode,
                "modelType": modelType
            })
                .then(response => {
                    // Store the token to localStorage 
                    const token = response.data.accessToken;
                    localStorage.setItem("token", token)

                    const decoded = jwt_decode(token);
                    localStorage.setItem("idp", decoded.id);

                    // Set the token on axios header for all the succeeding requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    dispatch(loginRequestSuccess(token))
                    resolove()
                })
                .catch((error) => {
                    if (error.response === null || error.response === undefined) {
                        dispatch(loginRequestFailure("Failed to login"))
                        console.log("Failed to login:", error)
                    } else {
                        dispatch(loginRequestFailure(error.response.data.error))
                    }
                    reject()
                })
        })

    }
}

// LOGOUT
export const logoutRequest = () => ({ type: actions.LOGOUT_REQUEST })

export const logoutRequestSuccess = () => ({
    type: actions.LOGOUT_REQUEST_SUCCESS
})

export const logoutRequestFailure = (errorMessage) => ({
    type: actions.LOGOUT_REQUEST_FAILURE,
    payload: errorMessage
})

export const logout = () => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(logoutRequest())

            const purchaseId = localStorage.getItem("idp");
            axios.post("/logout", {
                purchaseId: purchaseId
            })
                .then(response => {
                    // Clear the token from the localStorage
                    localStorage.removeItem("token");
                    dispatch(logoutRequestSuccess());
                    resolve();
                })
                .catch((error) => {
                    if (error.response === null || error.response === undefined) {
                        dispatch(logoutRequestFailure("Failed to logout"))
                    } else {
                        dispatch(logoutRequestFailure(error.response.data.error))
                    }
                    reject();
                })
        })
    }
}

// CLEAR ERRORS
export const clearErrors = () => ({ type: actions.CLEAR_ERRORS })

// TOKEN EXPIRED 
export const tokenExpired = () => ({ type: actions.TOKEN_EXPIRED })

// PACKAGE DURATION CONSUMED
export const packageConsumed = () => ({ type: actions.PACKAGE_CONSUMED })

// INCREMENT LOGOUT ATTEMPTS
export const incrementLogoutAttempts = () => ({ type: actions.INCREMENT_LOGOUT_ATTEMPTS })