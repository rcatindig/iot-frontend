import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/authActions';
import { fetchModelType, fetchUserAgreement } from '../../actions/miscActions';

import logo from '../../assets/myflix-logo.png';
import closeIcon from '../../assets/icon-close-black.png';
import LoadingView from '../../components/LoadingView';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showAgreementModal: false,
            email: '',
            passcode: ''
        }
    }

    componentDidMount() {
        this.props.clearErrors()
        this.props.fetchUserAgreement()
        this.props.fetchModelType()
        this.invalidateTimer()
    }

    invalidateTimer() {
        // invalidate existing timer if there are any
        clearInterval(window.durationUtil)
    }
    toggleUserAgreement = () => {
        this.setState({ showAgreementModal: !this.state.showAgreementModal })
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePasscodeChange = (e) => {
        this.setState({ passcode: e.target.value })
    }

    handleLogin = () => {
        const data = {
            email: this.state.email,
            passcode: this.state.passcode,
            modelType: this.props.modelType
        }

        this.props.login(data)
            .then(() => {
                this.props.history.push('/home')
            })
            .catch(err => { })
    }

    createMarkup = () => {
        return { __html: this.props.userAgreement };
    }

    render() {
        // TODO: MOBILE RESPONSIVE LAYOUT 
        const { error, isLoading, modelType } = this.props;

        return (
            <div className="container relative mx-auto px-5 pb-6 py-16">
                <img src={logo} alt="logo" className="h-40 mx-auto rounded-full shadow-darkBlack" />

                <h1 className="text-lg font-semibold pt-12 text-myflixBlueGreen">Enjoy your journey with MyFlix!</h1>

                <input className="mt-4 text-base bg-myflixGray1 placeholder-myflixGray2 appearance-none border-2 border-myflixGray1 rounded-md w-full h-10 py-2 px-4 text-white leading-tight focus:outline-none focus:border-myflixBlueGreen transition duration-300 ease-in-out" id="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input>

                {modelType === "paid" &&
                    <input className="mt-4 text-base bg-myflixGray1 placeholder-myflixGray2 appearance-none border-2 border-myflixGray1 rounded-md w-full h-10 py-2 px-4 text-white leading-tight focus:outline-none focus:border-myflixBlueGreen transition duration-300 ease-in-out" id="passcode" type="password" placeholder="Passcode" value={this.state.passcode} onChange={this.handlePasscodeChange}></input>
                }

                {/* Display error here */}
                {error &&
                    <p className="text-red-500 text-sm mt-3">{error}</p>
                }

                {modelType === "paid" &&
                    <p className="mt-4 text-myflixGray2 text-xs font-light">
                        Don't have a passcode?&nbsp;
                        {/* TODO add link */}
                        <Link to="/login" className="text-white focus:outline-none focus:shadow-outline hover:underline">Click here to buy online</Link>
                    </p>
                }
                <button onClick={this.handleLogin} className="mt-8 bg-myflixBlueGreen hover:bg-teal-400 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>

                <p className="mt-4 text-myflixGray2 text-xs font-light">
                    By clicking on Login, you agree to the&nbsp;
                    <span className="text-myflixLightBlue focus:outline-none focus:shadow-outline hover:underline font-bold" onClick={this.toggleUserAgreement}>User Agreement</span>
                </p>

                {this.state.showAgreementModal &&
                    <div className="w-full h-full py-8 px-8 fixed top-0 left-0 bg-myflixDarkGray opacity-75 z-40 transition-all duration-300 ease-in-out"></div>
                }

                {this.state.showAgreementModal &&

                    <div className="w-full h-full py-8 px-6 fixed top-0 left-0 bg-transparent z-50 flex justify-center content-center transition-all duration-300 ease-in-out">
                        <div className="absolute top-0 right-0 mr-12 mt-12 z-40 text-black" onClick={this.toggleUserAgreement}>
                            <img src={closeIcon} alt="close" className="h-6 w-6 cursor-pointe" />
                        </div>

                        <div className="relative w-full h-full bg-white my-auto py-16 overflow-y-scroll px-4">
                            <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 mb-8 mx-6">
                            <button className="bg-myflixBlueGreen hover:bg-teal-400 w-full text-white font-medium py-2 focus:outline-none focus:shadow-outline" onClick={this.toggleUserAgreement}>
                                OK
                            </button>
                        </div>
                    </div>
                }

                {isLoading && <LoadingView />}
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
    userAgreement: state.misc.userAgreement,
    modelType: state.misc.modelType
})

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(login(data)),
    clearErrors: () => dispatch(clearErrors()),
    fetchUserAgreement: () => dispatch(fetchUserAgreement()),
    fetchModelType: () => dispatch(fetchModelType())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
