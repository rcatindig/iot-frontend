import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout } from '../../actions/authActions';
import { fetchSeriesGenres } from '../../actions/seriesActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import HorizontalImageList from '../../components/Home/HorizontalImageList';
import ScrollToTop from '../../components/Util/ScrollToTop';


class Series extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seriesWithGenre: []
        }
    }

    componentDidMount() {
        // TODO apply redux here
        this.props.fetchSeriesGenres()
            .then(() => {
                this.props.genres.forEach(genre => {
                    const currentSeriesWithGenre = {
                        genre: genre,
                        series: []
                    }
                    axios.get(`/series/genres/${genre}`)
                        .then((response) => {
                            currentSeriesWithGenre.series = response.data.data.content;
                            this.setState({ seriesWithGenre: [...this.state.seriesWithGenre, currentSeriesWithGenre] })
                        })
                        .catch((error) => {
                            console.log("Failed to get series with genre ", genre, " ", error)
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

    handleItemClickHandler = (series) => {
        const location = {
            pathname: `/series/${series.title}`
        }
        this.props.history.push(location)
    }

    render() {
        console.log(this.state.seriesWithGenre)
        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title="Series" className="pt-4" />

                {
                    this.state.seriesWithGenre.length > 0 ?
                        this.state.seriesWithGenre.map((collection, index) => {
                            const viewAllLink = {
                                pathname: "/series/genre/" + collection.genre.toLowerCase()
                            }

                            return (
                                <HorizontalImageList
                                    key={index}
                                    title={collection.genre}
                                    viewAllLink={viewAllLink}
                                    items={collection.series}
                                    itemClickHandler={this.handleItemClickHandler} />
                            );
                        })
                        :
                        <div className="w-full py-8">
                            <p className="text-myflixGray2 font-normal text-sm text-center">
                                No series were found
                                </p>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    genres: state.series.genres,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSeriesGenres: () => dispatch(fetchSeriesGenres()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Series);