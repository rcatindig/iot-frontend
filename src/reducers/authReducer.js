import * as actions from '../actions/actionTypes';

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isAuthenticated: false,
    accessToken: "",
    isLoading: false,
    error: "",
    isTokenExpired: false,
    isPackageConsumed: false,
    logoutAttempts: 0,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                accessToken: action.payload,
                isAuthenticated: true,
                isTokenExpired: false,
                isPackageConsumed: false
            };
        case actions.LOGIN_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case actions.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.LOGOUT_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                accessToken: '',
                isAuthenticated: false,
                isPackageConsumed: false,
                logoutAttempts: 0
            };
        case actions.LOGOUT_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: ""
            };
        case actions.TOKEN_EXPIRED:
            return {
                ...state,
                isTokenExpired: true
            };
        case actions.PACKAGE_CONSUMED:
            return {
                ...state,
                isPackageConsumed: true
            };
        case actions.INCREMENT_LOGOUT_ATTEMPTS:
            return {
                ...state,
                logoutAttempts: state.logoutAttempts + 1,
            };
        default:
            return state;
    }
}

export default authReducer;