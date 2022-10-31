import * as actions from "./actionTypes";
import axios from "axios";

// Action Creators
// Entry point for state manipulation

// GET FEEDBACK
export const feedbackRequest = () => ({ type: actions.FEEDBACK_REQUEST });

export const feedbackRequestSuccess = (feedback) => ({
    type: actions.FEEDBACK_REQUEST_SUCCESS,
    payload: feedback
});

export const feedbackRequestFailure = (errorMessage) => ({
    type: actions.FEEDBACK_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const fetchFeedback = () => {

    return (dispatch) => {
        dispatch(feedbackRequest());

        axios.get("/feedback")
            .then((response) => {
                dispatch(feedbackRequestSuccess(response.data.data.survey));
            })
            .catch((error) => {
                dispatch(feedbackRequestFailure(error.response.data.error));
            });
    };
};


// POST FEEDBACK
export const submitFeedbackRequest = () => ({
    type: actions.SUBMIT_FEEDBACK_REQUEST
});

export const submitFeedbackRequestSuccess = (submitFeedback) => ({
    type: actions.SUBMIT_FEEDBACK_REQUEST_SUCCESS,
    payload: submitFeedback
});

export const submitFeedbackRequestFailure = (errorMessage) => ({
    type: actions.SUBMIT_FEEDBACK_REQUEST_FAILURE,
    payload: errorMessage
});

// Async Action
export const submitFeedback = (feedbackAnswers) => {

    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(submitFeedbackRequest());

            axios.post("/feedback", feedbackAnswers)
                .then((response) => {
                    dispatch(submitFeedbackRequestSuccess(response.data.message));
                    resolve()
                })
                .catch((error) => {
                    dispatch(submitFeedbackRequestFailure(error.response.data.error));
                    reject(error);
                });
        })
    };
};
