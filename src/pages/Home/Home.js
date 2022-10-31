import React, { Component } from 'react'
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMovies } from '../../actions/movieActions';
import { fetchEbooks } from '../../actions/ebookActions';
import { fetchAudioBooks } from '../../actions/audiobookActions';
import { fetchCountryTravelGuides } from '../../actions/travelGuideActions';
import { fetchMusicPlaylists } from '../../actions/musicActions';
import { fetchSeries } from '../../actions/seriesActions';
import { fetchAdvertisements } from '../../actions/miscActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import HorizontalImageList from '../../components/Home/HorizontalImageList';
import Searchbar from '../../components/Home/Searchbar';
import TravelGuideHorizontalList from '../../components/Home/TravelGuideHorizontalList';
import HomeNewsList from '../../components/Home/HomeNewsList';

class Home extends Component {

    componentDidMount() {
        this.props.fetchAdvertisements()
        this.props.fetchMovies()
        this.props.fetchEbooks()
        this.props.fetchAudioBooks()
        this.props.fetchMusicPlaylists()
        this.props.fetchCountryTravelGuides()
        this.props.fetchSeries()
    }

    componentDidUpdate() {
        // token expired or package duration consumed
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

    handleOnclickTravelGuide = (country) => {
        const location = {
            pathname: `travelguides/${country.title}`,
        }
        this.props.history.push(location)
    }

    handleOnclickNewsDetails = (url) => {
        const location = {
            pathname: `news/1`,
            state: { myUrl: url }
        }
        this.props.history.push(location)
    }

    render() {
        const newsItems = [
            {
                "title": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor adipisicing elit. Lorem ipsum dolor. adipisicing elit. Lorem ipsum dolor",
                "thumbnailImageUrl": "https://source.unsplash.com/random/100x100"
            },
            {
                "title": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor adipisicing elit. Lorem ipsum dolor. adipisicing elit. Lorem ipsum dolor",
                "thumbnailImageUrl": "https://source.unsplash.com/random/100x100"
            },
            {
                "title": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor adipisicing elit. Lorem ipsum dolor. adipisicing elit. Lorem ipsum dolor",
                "thumbnailImageUrl": "https://source.unsplash.com/random/100x100"
            },
            {
                "title": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor adipisicing elit. Lorem ipsum dolor. adipisicing elit. Lorem ipsum dolor",
                "thumbnailImageUrl": "https://source.unsplash.com/random/100x100"
            },
        ]

        const { advertisements, movies, ebooks, audiobooks, musicPlaylists, countryTravelGuides, series } = this.props;

        // TODO -- ADD PULSE/SKELETON ANIMATION FOR LOADING
        return (
            <div className="container relative mx-auto px-5 pb-6">
                <Searchbar />

                <HorizontalImageList
                    title="Movies"
                    advertisements={advertisements}
                    viewAllLink={{ pathname: "/movies" }}
                    isBanner={true}
                    items={movies}
                    itemClickHandler={this.handleOnClickMovie} />

                <HorizontalImageList
                    title="Series"
                    viewAllLink={{ pathname: "/series" }}
                    items={series}
                    itemClickHandler={this.handleOnclickSeries} />

                <HorizontalImageList
                    title="Musics"
                    viewAllLink={{ pathname: "/musics" }}
                    items={musicPlaylists}
                    itemClickHandler={this.handleOnClickMusic} />

                <HorizontalImageList
                    title="E-books"
                    viewAllLink={{ pathname: "/ebooks" }}
                    items={ebooks}
                    itemClickHandler={this.handleOnClickEbook} />

                <HorizontalImageList
                    title="Audio books"
                    viewAllLink={{ pathname: "/audiobooks" }}
                    items={audiobooks}
                    itemClickHandler={this.handleOnClickAudioBook} />

                <TravelGuideHorizontalList
                    viewAllLink="/travelguides"
                    items={countryTravelGuides}
                    itemClickHandler={this.handleOnclickTravelGuide}
                />

                <HomeNewsList
                    viewAllLink="/news"
                    newsItems={newsItems}
                    itemClickHandler={this.handleOnclickNewsDetails} />

            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    movies: state.movie.movies,
    ebooks: state.ebook.ebooks,
    audiobooks: state.audiobook.audiobooks,
    travelGuides: state.travelGuide.travelGuides,
    musicPlaylists: state.music.musicPlaylists,
    movie: state.movie.movie,
    ebook: state.ebook.ebook,
    audiobook: state.audiobook.audiobook,
    travelGuide: state.travelGuide.travelGuide,
    countryTravelGuides: state.countryTravelGuide.countryTravelGuides,
    series: state.series.series,
    advertisements: state.misc.advertisements,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMovies: () => dispatch(fetchMovies()),
    fetchEbooks: () => dispatch(fetchEbooks()),
    fetchAudioBooks: () => dispatch(fetchAudioBooks()),
    fetchMusicPlaylists: () => dispatch(fetchMusicPlaylists()),
    fetchCountryTravelGuides: () => dispatch(fetchCountryTravelGuides()),
    fetchSeries: () => dispatch(fetchSeries()),
    fetchAdvertisements: () => dispatch(fetchAdvertisements()),
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
