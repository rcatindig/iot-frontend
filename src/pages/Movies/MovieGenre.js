import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMoviesWithGenre } from '../../actions/movieActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { toPascalCase } from '../../helpers/StringUtil';
import ListImageView from '../../components/ListImageView';
import { logoutHandler } from '../../helpers/AuthHelper';

class MovieGenre extends Component {

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.props.fetchMoviesWithGenre({ genre });
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

    handleItemClickHandler = (movie) => {
        const location = {
            pathname: `/movies/${movie.name}`
        }
        this.props.history.push(location)
    }

    render() {
        const { movies } = this.props;
        const { genre } = this.props.match.params;

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={`${toPascalCase(genre)} Movies`} className="pt-4" />

                <ListImageView
                    title={toPascalCase(genre)}
                    items={movies}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    movies: state.movie.movies,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMoviesWithGenre: (genre) => dispatch(fetchMoviesWithGenre(genre)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MovieGenre);