import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    countryTravelGuides: [],
    countryTravelGuide: {},
};

const countryTravelGuideReducer = (state = initialState, action) => {
    switch (action.type) {
        // TRAVELGUIDES
        case actions.COUNTRY_TRAVELGUIDES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.COUNTRY_TRAVELGUIDES_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                countryTravelGuides: action.payload
            };
        case actions.COUNTRY_TRAVELGUIDES_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };



        default:
            return state;
    }
};

export default countryTravelGuideReducer;
