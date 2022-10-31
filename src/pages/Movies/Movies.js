import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authActions';
import { fetchMovieGenres } from '../../actions/movieActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import HorizontalImageList from '../../components/Home/HorizontalImageList';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { logoutHandler } from '../../helpers/AuthHelper';

class Movies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moviesWithGenre: []
        }
    }

    componentDidMount() {
        // TODO apply redux here
        this.props.fetchMovieGenres()
            .then(() => {
                this.props.genres.forEach(genre => {
                    const currentMoviesWithGenre = {
                        genre: genre,
                        movies: []
                    }
                    axios.get(`/movies/genres/${genre}`)
                        .then((response) => {
                            currentMoviesWithGenre.movies = response.data.data.content;
                            this.setState({ moviesWithGenre: [...this.state.moviesWithGenre, currentMoviesWithGenre] })
                        })
                        .catch((error) => {
                            console.log("Failed to get movies with genre ", genre, " ", error)
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            })
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

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title="Movies" className="pt-4" />

                {
                    this.state.moviesWithGenre.length > 0 ?
                        this.state.moviesWithGenre.map((collection, index) => {
                            const viewAllLink = {
                                pathname: "/movies/genre/" + collection.genre.toLowerCase(),
                            }

                            return (
                                <HorizontalImageList
                                    key={index}
                                    title={collection.genre}
                                    viewAllLink={viewAllLink}
                                    items={collection.movies}
                                    itemClickHandler={this.handleItemClickHandler} />
                            );
                        })
                        :
                        <div className="w-full py-8">
                            <p className="text-myflixGray2 font-normal text-sm text-center">
                                No movies were found
                            </p>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    genres: state.movie.genres,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMovieGenres: () => dispatch(fetchMovieGenres()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Movies);