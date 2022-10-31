import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    travelGuides: [],
    travelGuide: {},
    travelGuidesPerCountry: []
};

const travelGuideReducer = (state = initialState, action) => {
    switch (action.type) {
        // TRAVELGUIDES
        case actions.TRAVELGUIDES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.TRAVELGUIDES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                travelGuidesPerCountry: action.payload
            };
        case actions.TRAVELGUIDES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // TRAVELGUIDE DETAILS
        case actions.TRAVELGUIDE_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.TRAVELGUIDE_DETAILS_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                travelGuide: action.payload
            };
        case actions.TRAVELGUIDE_DETAILS_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default travelGuideReducer;
