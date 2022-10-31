import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchMusic } from '../../actions/musicActions';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';
import { logoutHandler } from '../../helpers/AuthHelper';

import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

class MusicPlaylist extends Component {

    constructor(props) {
        super(props)
        this.state = { //state is by default an object
            audioList: []
        }
    }

    componentDidMount = () => {
        const { playlist } = this.props.match.params;
        this.props.fetchMusic({ title: playlist })
            .then(() => {
                var audioLists = [];

                this.props.musicPlaylist.forEach(res => {
                    let audioList = {
                        name: res.name,
                        singer: res.singer,
                        cover: Constants.RESOURCE_URL + "/musics/" + res.cover,
                        musicSrc: Constants.RESOURCE_URL + "/musics/" + res.musicSrc,
                    }

                    audioLists.push(audioList);
                })

                this.setState({ audioList: audioLists });
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

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const audoList = this.state.audioList;

        const options = {
            // audio lists model
            audioLists: audoList,
            // default play index of the audio player  [type `number` default `0`]
            defaultPlayIndex: 0,
            showDownload: false,
            showMiniModeCover: true,
            mode: "full",
            bounds: 'body',
            showMiniProcessBar: true,
            remove: false,
            drag: true,
            showThemeSwitch: false,
        }

        return (
            <div className="flex flex-col py-12">
                <ScrollToTop />
                {
                    audoList.length > 0 &&
                    (
                        <ReactJkMusicPlayer {...options} />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    musicPlaylist: state.music.musicPlaylist,
})

const mapDispatchToProps = (dispatch) => ({
    fetchMusic: ({ title }) => dispatch(fetchMusic({ title })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MusicPlaylist);