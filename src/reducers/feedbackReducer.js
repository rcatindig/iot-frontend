import * as actions from "../actions/actionTypes";

// Reducers - Pure functions only, no side effects
// accepts the previous state and returns the new state

const initialState = {
    isLoading: false,
    error: "",
    feedbackQuestions: {},
    feedbackAnswers: {}
};

const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
        // GET FEEDBACK/SURVEY
        case actions.FEEDBACK_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.FEEDBACK_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                feedbackQuestions: action.payload
            };
        case actions.FEEDBACK_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        // SUBMIT FEEDBACK
        case actions.SUBMIT_FEEDBACK_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actions.SUBMIT_FEEDBACK_REQUEST_SUCCESS:
            return {
                ...state,
                error: '',
                isLoading: false,
                feedbackAnswers: ''
            };
        case actions.SUBMIT_FEEDBACK_REQUEST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default feedbackReducer;
