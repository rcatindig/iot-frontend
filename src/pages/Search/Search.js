import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { search } from '../../actions/miscActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import ListImageView from '../../components/ListImageView';
import { logoutHandler } from '../../helpers/AuthHelper';

class Search extends Component {

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

    handleOnClickMovie = (movie) => {
        const location = {
            pathname: `/movies/${movie.name}`
        }
        this.props.history.push(location)
    }

    handleOnClickEbook = (ebook) => {
        const location = {
            pathname: `/ebooks/${ebook.title}`
        }
        this.props.history.push(location)
    }

    handleOnClickAudioBook = (audiobook) => {
        const location = {
            pathname: `/audiobooks/${audiobook.title}`
        }
        this.props.history.push(location)
    }

    handleOnclickSeries = (series) => {
        const location = {
            pathname: `/series/${series.title}`
        }
        this.props.history.push(location)
    }

    handleOnClickMusic = (playlist) => {
        const location = {
            pathname: `musics/${playlist.title}`,
        }
        this.props.history.push(location)
    }

    handleOnclickTravelGuide = (travelGuide) => {
        const location = {
            pathname: `/travelguides/view/${travelGuide.name}@${travelGuide.country}`,
        }
        this.props.history.push(location)
    }

    handleMovieItemClickHandler = (movie) => {
        const location = {
            pathname: `/movies/${movie.name}`
        }
        this.props.history.push(location)
    }

    isEmpty = (collection) => {
        if (collection === null || collection === undefined) {
            return true
        }

        return collection.length === 0
    }

    render() {
        const { movies, series, ebooks, audiobooks, countryTravelGuides, music } = this.props.searchResults;
        const isEmptySearchResults = this.isEmpty(movies) && this.isEmpty(series) &&
            this.isEmpty(ebooks) && this.isEmpty(audiobooks) &&
            this.isEmpty(countryTravelGuides) && this.isEmpty(music);

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                {/* MOVIES */}
                {
                    movies &&
                    movies.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Movies`} className="pt-4" />

                            <ListImageView
                                title={""}
                                items={movies}
                                itemClickHandler={this.handleOnClickMovie}
                            />
                        </div>
                    )
                }

                {/* SERIES */}
                {
                    series &&
                    series.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Series`} className="pt-4" />

                            <ListImageView
                                title={""}
                                items={series}
                                itemClickHandler={this.handleOnclickSeries}
                            />
                        </div>
                    )
                }

                {/* EBOOKS */}
                {
                    ebooks &&
                    ebooks.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Ebooks`} className="pt-4" />

                            <ListImageView
                                title={""}
                                items={ebooks}
                                itemClickHandler={this.handleOnClickEbook}
                            />
                        </div>
                    )
                }

                {/* AUDIOBOOKS */}
                {
                    audiobooks &&
                    audiobooks.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Audiobooks`} className="pt-4" />

                            <ListImageView
                                title={""}
                                items={audiobooks}
                                itemClickHandler={this.handleOnClickAudioBook}
                            />
                        </div>
                    )
                }

                {/* MUSIC */}
                {
                    music &&
                    music.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Music`} className="pt-4" />

                            <ListImageView
                                title={""}
                                type="musics"
                                items={music}
                                itemClickHandler={this.handleOnClickMusic}
                            />
                        </div>
                    )
                }

                {/* TRAVEL GUIDES */}
                {
                    countryTravelGuides &&
                    countryTravelGuides.length > 0 &&
                    (
                        <div className="w-full">
                            <PageTitle title={`Travel Guides`} className="pt-4" />

                            <ListImageView
                                title={""}
                                type="travel-guides"
                                items={countryTravelGuides}
                                itemClickHandler={this.handleOnclickTravelGuide}
                            />
                        </div>
                    )
                }

                {
                    isEmptySearchResults &&
                    (
                        <div className="w-full my-16">
                            <p className="text-myflixGray2 font-normal text-lg text-center">
                                No search results
                                </p>
                        </div>
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    searchResults: state.misc.searchResults,
    isLoading: state.misc.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    search: (term, categories) => dispatch(search(term, categories)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Search);