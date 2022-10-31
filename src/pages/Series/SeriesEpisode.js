import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchSeriesEpisodes } from '../../actions/seriesActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { toPascalCase } from '../../helpers/StringUtil';
import ListImageView from '../../components/ListImageView';

class SeriesEpisode extends Component {

    componentDidMount() {
        const { genre, series, season } = this.props.match.params;

        this.props.fetchSeriesEpisodes({ genre: genre, series: series, season : season })
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

    handleItemClickHandler = (episode) => {
        const location = {
            pathname: `/series/${episode.genre}/${episode.series}/${episode.season}/${episode.title}`,
            state: { episode: episode }
        }
        this.props.history.push(location)
    }

    render() {
        const { episodes } = this.props;
        const { season } = this.props.match.params;

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={`${toPascalCase(season)}`} className="pt-4" />

                <ListImageView 
                    title={toPascalCase(season)}
                    type="episode"
                    items={episodes !== undefined ? episodes : []}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    episodes: state.series.episodes,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSeriesEpisodes: (genre, series, season) => dispatch(fetchSeriesEpisodes(genre, series, season)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SeriesEpisode);