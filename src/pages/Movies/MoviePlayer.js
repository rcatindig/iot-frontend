import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as shaka from 'shaka-player';

import { logout } from '../../actions/authActions';
import { fetchMovieDetails } from '../../actions/movieActions';

import * as Constants from '../../helpers/Constants';
import ScrollToTop from '../../components/Util/ScrollToTop';
import backIcon from '../../assets/icon-chevron-left.png';
import { logoutHandler } from '../../helpers/AuthHelper';

class MoviePlayer extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchMovieDetails({ name: id });
    }

    componentDidUpdate() {
        if (this.props.isTokenExpired) {
            this.handleExpTokenPackageConsumed();
        }

        shaka.polyfill.installAll();

        // Check to see if the browser supports the basic APIs Shaka needs.
        if (shaka.Player.isBrowserSupported()) {
            // Everything looks good!

            if (!this.props.isLoading)
                this.initVideoPlayer();
        } else {
            // This browser does not have the minimum set of APIs we need.
            console.error('Browser not supported!');
        }


    }

    handleExpTokenPackageConsumed() {
        // TODO find more efficient way to handle expired token and consumed duration
        console.log("Clearing the timer...");
        clearInterval(window.durationUtil)

        logoutHandler(this.props.logout, () => {
            this.props.history.push("/feedback");
        })
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    initVideoPlayer = async () => {
        // Create a Player instance.
        const video = document.getElementById('video');
        const player = new shaka.Player(video);

        // Attach player to the window to make it easy to access in the JS console.
        window.player = player;

        // Listen for error events.
        player.addEventListener('error', this.onErrorEvent);

        const { filePath } = this.props.movie;

        // Try to load a manifest.
        // This is an asynchronous process.
        if (filePath !== null && filePath.length > 0) {
            try {
                const manifestUri = Constants.RESOURCE_URL + filePath;

                await player.load(manifestUri);
                // This runs if the asynchronous load is successful.
                console.log('The video has now been loaded!');
            } catch (e) {
                // onError is executed if the asynchronous load fails.
                console.error("Failed to load video:", e);
            }
        } else {
            console.log("No video was found");
        }
    }

    onErrorEvent = (event) => {
        // Extract the shaka.util.Error object from the event.
        console.error(event.detail);
    }

    render() {

        const { bannerImagePath } = this.props.movie;

        return (
            <div className="flex flex-col py-12">
                <ScrollToTop />
                <div className="w-full h-64 bg-gray-600">
                    <div className="relative">
                        <div className="w-6 h-6 absolute top-0 left-0 m-4 z-50">
                            <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={this.handleBack.bind(this)} />
                        </div>

                        <video id="video"
                            className="w-full h-64 object-cover"
                            width="100%"
                            poster={Constants.RESOURCE_URL + bannerImagePath}
                            controls autoPlay />
                    </div>
                </div>

                {/* <ShakaPlayer autoPlay 
                    src="http://127.0.0.1:3030/static/movies/The%20Old%20Guard%20(2020)/TheOldGuard2020.mp4"
                    width="auto"
                    height="auto"
                    /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    movie: state.movie.movie,
    isLoading: state.movie.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    fetchMovieDetails: ({ name }) => dispatch(fetchMovieDetails({ name })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MoviePlayer);