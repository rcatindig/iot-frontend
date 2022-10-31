import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMusicPlaylists } from '../../actions/musicActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import ListImageView from '../../components/ListImageView';
import { logoutHandler } from '../../helpers/AuthHelper';

class Musics extends Component {

    componentDidMount() {
        this.props.fetchMusicPlaylists();
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

    handleItemClickHandler = (playlist) => {
        const location = {
            pathname: `musics/${playlist.title}`
        }
        this.props.history.push(location)
    }
    
    render() {
        const { musicPlaylists } = this.props;

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title="Music Playlists" className="pt-4" />

                <ListImageView
                    title="music playlists"
                    items={musicPlaylists}
                    type="musics"
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    musicPlaylists: state.music.musicPlaylists,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMusicPlaylists: () => dispatch(fetchMusicPlaylists()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Musics);