import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchSeriesWithGenre } from '../../actions/seriesActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { toPascalCase } from '../../helpers/StringUtil';
import ListImageView from '../../components/ListImageView';

class SeriesGenre extends Component {

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.props.fetchSeriesWithGenre({ genre })
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

    handleItemClickHandler = (series) => {
        const location = {
            pathname: `/series/${series.title}`
        }
        this.props.history.push(location)
    }

    render() {
        const { series } = this.props;
        const { genre } = this.props.match.params;
        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={`${toPascalCase(genre)} Series`} className="pt-4" />

                <ListImageView 
                    title={toPascalCase(genre)}
                    items={series}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    series: state.series.series,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSeriesWithGenre: (genre) => dispatch(fetchSeriesWithGenre(genre)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SeriesGenre);