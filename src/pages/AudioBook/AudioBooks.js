import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authActions';
import { fetchAudiobookGenres } from '../../actions/audiobookActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import HorizontalImageList from '../../components/Home/HorizontalImageList';
import ScrollToTop from '../../components/Util/ScrollToTop';

class AudioBooks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            audiobooksWithGenre: []
        }
    }

    componentDidMount() {
        // TODO apply redux here
        this.props.fetchAudiobookGenres()
            .then(() => {
                this.props.genres.forEach(genre => {
                    const currentAudiobooksWithGenre = {
                        genre: genre,
                        audiobooks: []
                    }
                    axios.get(`/audiobooks/genres/${genre}`)
                        .then((response) => {
                            currentAudiobooksWithGenre.audiobooks = response.data.data.content;
                            this.setState({ audiobooksWithGenre: [...this.state.audiobooksWithGenre, currentAudiobooksWithGenre] })
                        })
                        .catch((error) => {
                            console.log("Failed to get audiobooks with genre ", genre, " ", error)
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

    handleItemClickHandler = (audiobook) => {
        const location = {
            pathname: `/audiobooks/${audiobook.title}`
        }
        this.props.history.push(location)
    }

    render() {

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title="Audio Books" className="pt-4" />
                {
                    this.state.audiobooksWithGenre.length > 0 ?
                        this.state.audiobooksWithGenre.map((collection, index) => {
                            const viewAllLink = {
                                pathname: "/audiobooks/genre/" + collection.genre.toLowerCase()
                            }

                            return (
                                <HorizontalImageList
                                    key={index}
                                    title={collection.genre}
                                    viewAllLink={viewAllLink}
                                    items={collection.audiobooks}
                                    itemClickHandler={this.handleItemClickHandler} />
                            );
                        })
                        :
                        <div className="w-full py-8">
                            <p className="text-myflixGray2 font-normal text-sm text-center">
                                No audio books were found
                            </p>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    genres: state.audiobook.genres,
})

const mapDispatchToProps = (dispatch) => ({
    fetchAudiobookGenres: () => dispatch(fetchAudiobookGenres()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AudioBooks);