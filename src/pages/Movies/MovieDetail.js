import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMovieDetails } from '../../actions/movieActions';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';
import { logoutHandler } from '../../helpers/AuthHelper';

import backIcon from '../../assets/icon-chevron-left.png';
import playIcon from '../../assets/icon-play.png';
import seriesPoster from '../../assets/seriesPoster.jpg';

class MovieDetail extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchMovieDetails({ name: id });
    }
    componentDidUpdate() {
        if (this.props.isTokenExpired) {
            this.handleExpTokenPackageConsumed();
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

    handleOnClickPlayMovie = (movie) => {
        const location = {
            pathname: `/movies/player/${movie.name}`
        }
        this.props.history.push(location)
    }

    render() {
        const casts = [...Array(0)].map(x => 0);

        const {
            name,
            year,
            summary,
            duration,
            bannerImagePath,
            genres
        } = this.props.movie;

        return (
            <div className="flex flex-col py-12">
                <ScrollToTop />
                <div className="w-full h-64 bg-gray-600">
                    <div className="relative">
                        <div className="w-6 h-6 absolute top-0 left-0 m-4">
                            <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={this.handleBack.bind(this)} />
                        </div>

                        <div className="w-16 h-16 absolute play-button-center">
                            <img src={playIcon} alt="play" onClick={this.handleOnClickPlayMovie.bind(this, this.props.movie)} />
                        </div>

                        {bannerImagePath &&
                            (
                                <img src={Constants.RESOURCE_URL + bannerImagePath} alt="poster" className="w-full h-64 object-cover" />
                            )
                        }

                        <div className="w-full h-32 absolute left-0 bottom-0 right-0 gradient-darkgrey"></div>

                    </div>
                </div>

                {/* title, duration genre */}
                <div className="w-full px-5 py-1">
                    <p className="text-white text-3xl font-semibold">
                        {name}
                    </p>

                    <p className="text-myflixGray2 font-light text-sm">
                        <span>{year}</span>
                        <span className="px-4">{duration}</span>
                    </p>

                    <div className="py-3 text-myflixGray2 font-light text-sm">
                        {
                            genres && genres.length > 0 ?
                                genres.map((genre, index) => {
                                    return <span key={index} className="border-myflixGray2 border rounded px-2 py-1 mr-3">{genre}</span>
                                })
                                :
                                <span className="border-myflixGray2 border rounded px-2 py-1 mr-3">No Genre</span>
                        }
                    </div>
                </div>

                <div className="w-full px-5 pt-3 pb-6">
                    <p className="text-white font-bold text-lg">
                        Plot Summary
                    </p>

                    <p className="py-2 leading-snug text-white font-light text-sm">
                        {summary}
                    </p>
                </div>

                <div className="">
                    <p className="px-5 text-white font-bold text-lg">
                        Cast
                    </p>

                    <div className="px-5 mt-2 w-full flex flex-row overflow-x-auto overflow-y-hidden">
                        {
                            casts.length > 0 ?
                                casts.map((key, index) => {
                                    return <div key={index} className="mr-2 flex-none w-24">
                                        <div className="h-20 w-20 mx-auto">
                                            <img src={seriesPoster} alt="cast" className="h-20 w-20 rounded-full object-cover" />
                                        </div>

                                        <p className="pt-2 text-white font-light text-xs text-center leading-snug">Juan Dela Cruz</p>

                                        <p className="pt-1 text-myflixGray2 text-center text-xs font-light leading-snug">Sarah Bareilles</p>
                                    </div>
                                })
                                :
                                <div className="w-full">
                                    <p className="text-myflixGray2 font-normal text-sm text-center">
                                        No casts were found
                                </p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    movie: state.movie.movie,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMovieDetails: ({ name }) => dispatch(fetchMovieDetails({ name })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MovieDetail);