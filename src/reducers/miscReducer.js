import * as actions from '../actions/actionTypes';

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: '',
    userAgreement: '',
    deviceId: '',
    modelType: '',
    advertisements: [],
    timeRemaining: '',
    searchResults: ''
}

const miscReducer = (state = initialState, action) => {
    switch (action.type) {
        // USER AGREEMENT
        case actions.USER_AGREEMENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.USER_AGREEMENT_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                userAgreement: action.payload,
            };
        case actions.USER_AGREEMENT_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // DEVICE ID
        case actions.DEVICE_ID_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.DEVICE_ID_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                deviceId: action.payload,
            };
        case actions.DEVICE_ID_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // MODEL TYPE
        case actions.MODEL_TYPE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.MODEL_TYPE_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                modelType: action.payload,
            };
        case actions.MODEL_TYPE_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // ADVERTISEMENTS
        case actions.ADVERTISEMENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.ADVERTISEMENTS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                advertisements: action.payload,
            };
        case actions.ADVERTISEMENTS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // TIME REMAINING
        case actions.TIME_REMAINING_REQUEST:
            return {
                ...state,
                // isLoading: true
            };
        case actions.TIME_REMAINING_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                // isLoading: false,
                timeRemaining: action.payload,
            };
        case actions.TIME_REMAINING_REQUEST_FAILURE:
            return {
                ...state,
                // isLoading: false,
                error: action.payload
            };
        // SEARCH
        case actions.SEARCH_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SEARCH_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                searchResults: action.payload,
            };
        case actions.SEARCH_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default miscReducer;