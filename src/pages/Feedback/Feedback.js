import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { fetchFeedback, submitFeedback } from '../../actions/feedbackActions';

import ScrollToTop from '../../components/Util/ScrollToTop';

class Feedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            hasError: false
        }
    }

    componentDidMount() {
        this.props.fetchFeedback()
        this.invalidateTimer()
    }

    invalidateTimer() {
        clearInterval(window.durationUtil)
    }

    setAnswerOnQuestion = (question, e) => {
        const selectedAnswer = e.target.value;
        const questionId = question.id;
        const questionType = question.question_type;

        let items = [...this.state.questions];
        let itemIndex = items.findIndex((e) => e.questionId === questionId);

        if (itemIndex !== -1) {
            let item = items[itemIndex];
            if (questionType === 1) {
                item.optionId = selectedAnswer;
            } else if (questionType === 2) {
                item.answer = e.target.value;
            }
            items[itemIndex] = item;
        } else {
            if (questionType === 1) {
                items.push({ questionId: questionId, optionId: selectedAnswer, answer: "" })
            } else if (questionType === 2) {
                items.push({ questionId: questionId, optionId: null, answer: selectedAnswer })
            }
        }

        this.setState({ questions: items, hasError: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const questions = this.state.questions;

        if (questions && questions.length === this.props.feedbackQuestions.length) {
            const feedback = {
                "purchaseId": localStorage.getItem("idp"),
                "answers": this.state.questions
            }

            this.props.submitFeedback(feedback)
                .then(() => {
                    console.log("Successfully submitted feedback");
                    localStorage.clear();
                    this.props.history.replace('/thankyou');
                })
                .catch((error) => {
                    console.log("Failed to submit feedback:", error);
                })
        } else {
            this.setState({ hasError: true });
        }
    }

    render() {
        // JUST PUTTING IT HERE. I don't understand why the original devs didn't create a table with a 
        // column -  with enum values instead... 
        // NOTE:
        // question_type VALUES: 
        // 1 - Multiple Choice, 
        // 2 - Free Text

        const { feedbackQuestions } = this.props;

        return (
            <div className="container relative mx-auto px-5 pb-6 py-16 text-white">
                <ScrollToTop />
                <h1 className="text-lg font-bold text-myflixBlueGreen">Customer Feedback Survey</h1>

                <p className="pt-3">Please answer the questions below</p>

                <form className="pt-4">
                    {
                        feedbackQuestions &&
                        feedbackQuestions.length > 0 &&
                        feedbackQuestions.map((question, index) => {

                            return (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{index + 1}. {question.question_text}</p>

                                    <div className={`pt-2 px-2 grid ${question.question_type === 1 ? "grid-cols-2" : "grid-cols-1"} gap-2`}
                                        onChange={this.setAnswerOnQuestion.bind(this, question)}>
                                        {
                                            question.options &&
                                                question.options.length > 0 ?
                                                question.options.map((option, index) => {
                                                    return (
                                                        <label key={index} className="inline-flex items-center">
                                                            <input type="radio" className="form-radio bg-myflixDarkGray text-myflixBlueGreen" name={`q${question.id}`} value={option.option_id} />
                                                            <span className="ml-2 font-light text-sm">{option.text}</span>
                                                        </label>
                                                    )
                                                })
                                                :
                                                <div key={index} className="w-full text-black">
                                                    <textarea className="w-full p-2 rounded-sm" name={`q${question.id}`} rows="5">

                                                    </textarea>
                                                </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </form>

                {this.state.hasError &&
                    <p className="text-red-500 text-sm mt-3">Please answer all the questions</p>
                }

                {this.props.error &&
                    <p className="text-red-500 text-sm mt-3">Please input valid answers</p>
                }

                <button onClick={this.handleSubmit} className="mt-6 bg-myflixBlueGreen hover:bg-teal-400 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    feedbackQuestions: state.feedback.feedbackQuestions,
    error: state.feedback.error,
    isLoading: state.feedback.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    fetchFeedback: () => dispatch(fetchFeedback()),
    submitFeedback: (feedback) => dispatch(submitFeedback(feedback)),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Feedback);