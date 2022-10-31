import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchSeriesDetails } from '../../actions/seriesActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';
import backIcon from '../../assets/icon-chevron-left.png';

class SeriesDetail extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchSeriesDetails({ title: id });
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

    handleBack = (e) => {
        this.props.history.goBack()
    }

    handleOnClickSeriesWatch = (series) => {
        const genreName = series.genres[0];
        const location = {
            pathname: `/series/${genreName}/${series.title}`,
        }
        this.props.history.push(location)
    }

    render() {

        const {
            title,
            author,
            summary,
            posterImagePath,
        } = this.props.series;

        return (
            <div className="flex container relative mx-auto px-5 pb-6 flex-col py-16">
                <ScrollToTop />
                <div className="flex-1 relative w-full justify-center">
                    <div className="w-6 h-6 absolute top-0 left-0 m-4">
                        <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={this.handleBack.bind(this)} />
                    </div>

                    {posterImagePath &&
                        (
                            <img src={Constants.RESOURCE_URL + posterImagePath} alt="series" className="w-full object-cover rounded-tl-lg rounded-tr-lg" />
                        )
                    }

                    <div className="w-full h-56 absolute left-0 bottom-0 right-0 gradient-darkgrey"></div>

                    <div className="absolute bottom-0 left-0 mx-6 my-6 w-1/2">
                        <p className="text-white font-bold text-2xl leading-tight">{title}</p>
                        <p className="pt-1 text-myflixGray2 font-light text-sm">{author}</p>
                    </div>
                </div>

                <button
                    className="w-full mt-1 mb-3 bg-myflixLightBlue text-white text-lg font-semibold py-2 rounded-md focus:outline-none focus:shadow-outline hover:bg-blue-400"
                    onClick={this.handleOnClickSeriesWatch.bind(this, this.props.series)}>
                    Watch
                </button>

                <div className="w-full">
                    <p className="text-white text-lg font-bold py-3">Synopsis</p>
                    <p className="text-white font-light leading-snug">{summary}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    series: state.series.currentSeries,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSeriesDetails: ({ title }) => dispatch(fetchSeriesDetails({ title })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SeriesDetail);