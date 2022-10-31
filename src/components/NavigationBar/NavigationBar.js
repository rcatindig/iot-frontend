import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout, incrementLogoutAttempts, logoutRequestSuccess } from '../../actions/authActions';
import { fetchTimeRemaining } from '../../actions/miscActions';
import { logoutHandler } from '../../helpers/AuthHelper';

import logo from '../../assets/myflix-text-logo.png';
import menuIcon from '../../assets/icon-menu.png';
import closeIcon from '../../assets/icon-close.png';
import arrowIcon from '../../assets/icon-chevron-left.png';
import LoadingView from '../LoadingView';


class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isLanguageMenuOpen: false
        }
    }

    componentDidUpdate() {
        // token expired or package duration consumed
        if (this.props.isAuthenticated &&
            (this.props.isPackageConsumed || this.props.isTokenExpired)) {
            this.handleExpTokenPackageConsumed();
        }

        if (this.props.isAuthenticated &&
            this.props.modelType === "paid" &&
            !this.props.isPackageConsumed) {
            console.log("Tmr is up and running")
            clearInterval(window.durationUtil)

            window.durationUtil = setInterval(() => {
                this.props.fetchTimeRemaining()
            }, 5000);
        }
    }

    handleExpTokenPackageConsumed() {
        // TODO find more efficient way to handle expired token and consumed duration
        console.log("Clearing the timer...");
        clearInterval(window.durationUtil)

        logoutHandler(this.props.logout, (err) => {
            if (err) {
                this.props.incrementLogoutAttempts()

                if (this.props.logoutAttempts >= 5) {
                    // LOGOUT THE USER AFTER 5 ATTEMPTS (remove token from storage, set flags to false)
                    console.log("Logging out the user after a number of logout attempts...");
                    localStorage.removeItem("token");
                    this.props.logoutRequestSuccess();
                    this.props.history.push("/feedback");
                }
            } else {
                this.props.history.push("/feedback");
            }
        })
    }

    handleOnLogoClick = () => {
        this.props.history.push('/home')
    }

    handleLogout = () => {
        this.props.logout()
            .then(() => {
                this.props.history.push('/feedback');
            })
        this.toggleDrawer()
    }

    toggleDrawer = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    toggleLanguageAccordion = () => {
        this.setState({ isLanguageMenuOpen: !this.state.isLanguageMenuOpen })
    }

    render() {
        return this.props.isAuthenticated && (
            <div className="pt-3 pb-1 fixed z-10 px-5 left-0 top-0 right-0 w-full bg-myflixDarkGray">
                <div className="flex items-center justify-between">
                    <div>
                        <img src={logo} alt="MyFlix" className="h-8 cursor-pointer" onClick={this.handleOnLogoClick.bind(this)} />
                    </div>

                    <button className="block focus:outline-none">
                        <img src={menuIcon} alt="menu icon" className="h-8 w-8" onClick={this.toggleDrawer} />
                    </button>
                </div>


                {/* SIDE DRAWER */}
                <div className={`transform ${this.state.isOpen ? `visible` : `hidden`} absolute inset-0 w-full h-screen opacity-75 bg-black transition-all duration-300 ease-in-out`} onClick={this.toggleDrawer} >
                </div>

                <div className={`transform ${this.state.isOpen ? `translate-x-0` : `translate-x-full`} py-5 bg-myflixDarkGray h-screen w-8/12 sm:w-1/2 md:w-7/12 lg:w-3/12 absolute top-0 right-0 transition-all duration-500 ease-in-out text-white`} >
                    <div className="px-4 flex flex-row justify-end">
                        <img src={closeIcon} alt="close" className="h-6 w-6 cursor-pointer" onClick={this.toggleDrawer} />
                    </div>

                    <div className="flex flex-row justify-between px-4 my-5">
                        <span className="text-base">Time Remaining</span>
                        <span>00:00:00</span>
                    </div>

                    {/* SIDE BAR ITEMS */}
                    <div className="w-full">
                        <div className="flex flex-row justify-between align-middle px-4 py-3 bg-myflixGray4 border-myflixGray1 hover:bg-myflixBlueGreen border-b cursor-pointer select-none overscroll-y-contain" onClick={this.toggleLanguageAccordion}>
                            <span>Language</span>

                            <div className={`transform ${this.state.isLanguageMenuOpen ? `rotate-90` : `-rotate-90`} transition-all duration-300 ease-in-out`}>
                                <img src={arrowIcon} alt="arrow" className="h-5 w-5 cursor-pointer" />
                            </div>
                        </div>

                        {/* LANGUAGE ITEMS */}
                        <div className={`w-full ${this.state.isLanguageMenuOpen ? `h-auto` : `h-0`} overflow-hidden transition-all duration-300 ease-in-out select-none`}>
                            <div className="px-4 py-3 bg-myflixGray4 border-myflixGray1 hover:bg-myflixBlueGreen border-b cursor-pointer">
                                <span className="pl-5">English</span>
                            </div>

                            <div className="px-4 py-3 bg-myflixGray4 border-myflixGray1 hover:bg-myflixBlueGreen border-b cursor-pointer">
                                <span className="pl-5">Thai</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 py-3 bg-myflixGray4 border-myflixGray1 hover:bg-myflixBlueGreen border-b cursor-pointer select-none" onClick={this.handleLogout}>
                        <span>Logout</span>
                    </div>

                </div>

                { this.props.isLoading && <LoadingView />}
            </div >
        )
    }
}


const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    isPackageConsumed: state.auth.isPackageConsumed,
    isAuthenticated: state.auth.isAuthenticated,
    logoutAttempts: state.auth.logoutAttempts,
    error: state.auth.error,
    isLoading: state.auth.isLoading,
    timeRemaining: state.misc.timeRemaining,
    modelType: state.misc.modelType,
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    incrementLogoutAttempts: () => dispatch(incrementLogoutAttempts()),
    logoutRequestSuccess: () => dispatch(logoutRequestSuccess()),
    fetchTimeRemaining: () => dispatch(fetchTimeRemaining()),
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(NavigationBar);