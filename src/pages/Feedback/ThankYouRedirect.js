import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import myflixLogo from '../../assets/myflix-logo.png';
import hmLogo from '../../assets/hm-logo.png';

class ThankYouRedirect extends Component {

    constructor(props) {
        super(props)

        this.state = {
            counter: 3,
            timer: ''
        }
    }

    componentDidMount() {
        const timer = setInterval(() => this.updateCounter(), 1000);
        this.setState({ timer: timer })
        this.invalidateTimer()
    }

    invalidateTimer() {
        clearInterval(window.durationUtil)
    }
    
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    updateCounter() {
        if (this.state.counter === 0) {
            clearInterval(this.state.timer)
            this.handleRedirect()
        } else {
            this.setState({ counter: this.state.counter - 1 })
        }
    }

    handleRedirect = () => {
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="container py-16 px-10 flex-col mx-auto text-center justify-center ">

                <div className="pt-12 pb-10">
                    <div className="flex flex-row justify-center">
                        <img src={myflixLogo} alt="myflix" className="h-16 mr-4" />

                        <img src={hmLogo} alt="hm" className="h-16 ml-4" />
                    </div>
                </div>

                <h1 className="text-lg font-bold text-myflixBlueGreen">Thank you for using MyFlix!</h1>

                <p className="text-white font-light text-xs py-6">
                    You will be automatically redirected to login page in {this.state.counter} secs. If you are not redirected, please use the button below
                </p>

                <button onClick={this.handleRedirect} className="mt-6 bg-myflixBlueGreen hover:bg-teal-400 w-full sm:w-64 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                    Go to Login
                </button>
            </div>
        )
    }
}

export default withRouter(ThankYouRedirect);