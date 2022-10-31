import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authActions';
import { fetchEbookGenres } from '../../actions/ebookActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import HorizontalImageList from '../../components/Home/HorizontalImageList';
import ScrollToTop from '../../components/Util/ScrollToTop';


class Ebooks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ebooksWithGenre: []
        }
    }

    componentDidMount() {
        // TODO apply redux here
        this.props.fetchEbookGenres()
            .then(() => {
                this.props.genres.forEach(genre => {
                    const currentEbooksWithGenre = {
                        genre: genre,
                        ebooks: []
                    }
                    axios.get(`/ebooks/genres/${genre}`)
                        .then((response) => {
                            currentEbooksWithGenre.ebooks = response.data.data.content;
                            this.setState({ ebooksWithGenre: [...this.state.ebooksWithGenre, currentEbooksWithGenre] })
                        })
                        .catch((error) => {
                            console.log("Failed to get ebooks with genre ", genre, " ", error)
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

    handleItemClickHandler = (ebook) => {
        const location = {
            pathname: `/ebooks/${ebook.title}`
        }
        this.props.history.push(location)
    }

    render() {

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title="E-books" className="pt-4" />

                {
                    this.state.ebooksWithGenre.length > 0 ?
                        this.state.ebooksWithGenre.map((collection, index) => {
                            const viewAllLink = {
                                pathname: "/ebooks/genre/" + collection.genre.toLowerCase()
                            }

                            return (
                                <HorizontalImageList
                                    key={index}
                                    title={collection.genre}
                                    viewAllLink={viewAllLink}
                                    items={collection.ebooks}
                                    itemClickHandler={this.handleItemClickHandler} />
                            );
                        })
                        :
                        <div className="w-full py-8">
                            <p className="text-myflixGray2 font-normal text-sm text-center">
                                No ebooks were found
                            </p>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    genres: state.ebook.genres,
})

const mapDispatchToProps = (dispatch) => ({
    fetchEbookGenres: () => dispatch(fetchEbookGenres()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Ebooks);