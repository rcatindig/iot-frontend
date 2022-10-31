import * as actions from "./actionTypes";
import axios from "axios";
import { handleError} from "../helpers/AuthHelper";

// Action Creators
// Entry point for state manipulation

// TRAVELGUIDES
export const countryTravelGuidesRequest = () => ({ type: actions.COUNTRY_TRAVELGUIDES_REQUEST });

export const countryTravelGuidesRequestSuccess = (countryTravelGuides) => ({
    type: actions.COUNTRY_TRAVELGUIDES_REQUEST_SUCCESS,
    payload: countryTravelGuides
});

export const countryTravelGuidesRequestFailure = (errorMessage) => ({
    type: actions.COUNTRY_TRAVELGUIDES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchCountryTravelGuides = () => {

    return (dispatch) => {
        dispatch(countryTravelGuidesRequest());

        axios.get("/travel-guides/countries")
            .then((response) => {
                dispatch(countryTravelGuidesRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, countryTravelGuidesRequestFailure, error);
            });
    };
};

export const travelGuidesRequest = () => ({ type: actions.TRAVELGUIDES_REQUEST });

export const travelGuidesRequestSuccess = (travelGuides) => ({
    type: actions.TRAVELGUIDES_REQUEST_SUCCESS,
    payload: travelGuides
});

export const travelGuidesRequestFailure = (errorMessage) => ({
    type: actions.TRAVELGUIDES_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchTravelGuides = ({ title }) => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(travelGuidesRequest());
            
            axios.get("/travel-guides", {
                params: {
                    "title": title
                }
            })
                .then((response) => {
                    dispatch(travelGuidesRequestSuccess(response.data.data.content));
                    resolve()
                })
                .catch((error) => {
                    handleError(dispatch, travelGuidesRequestFailure, error);
                    reject();
                });
        })
    };
};


// TRAVELGUIDE DETAILS
export const travelGuideDetailsRequest = () => ({
    type: actions.TRAVELGUIDE_DETAILS_REQUEST
});

export const travelGuideDetailsRequestSuccess = (travelGuideDetails) => ({
    type: actions.TRAVELGUIDE_DETAILS_REQUEST_SUCCESS,
    payload: travelGuideDetails
});

export const travelGuideDetailsRequestFailure = (errorMessage) => ({
    type: actions.TRAVELGUIDE_DETAILS_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchTravelGuideDetails = ({ name, country }) => {

    return (dispatch) => {
        dispatch(travelGuideDetailsRequest());

        axios.get("/travel-guides/details", {
            params: {
                "name": name,
                "country": country
            }
        })
            .then((response) => {
                dispatch(travelGuideDetailsRequestSuccess(response.data.data.content));
            })
            .catch((error) => {
                handleError(dispatch, travelGuideDetailsRequestFailure, error);
            });
    };
};
