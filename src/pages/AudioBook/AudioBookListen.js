import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchAudiobookDetails } from '../../actions/audiobookActions';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';

import { logoutHandler } from '../../helpers/AuthHelper';
import { PDFReader } from 'reactjs-pdf-reader';
import ReactAudioPlayer from 'react-audio-player';

class AudioBookListen extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchAudiobookDetails({ title: id });
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

    handleBack = (e) => {
        this.props.history.goBack()
    }

    render() {
        const { filePath, audioPath } = this.props.audiobook;

        return (
            <div className="flex container relative mx-auto px-5 pb-6 flex-col py-16">
                <ScrollToTop />
                <div className="flex-1 relative w-full justify-center">

                    {
                        audioPath ?
                            (
                                <ReactAudioPlayer
                                    src={Constants.RESOURCE_URL + audioPath}
                                    autoPlay
                                    controls
                                    style={{ width: "100%" }}
                                />
                            )
                            :
                            (<div className="w-full my-10">
                                <p className="text-myflixGray2 font-normal text-sm text-center">
                                    No audio file was found
                                </p>
                            </div>)
                    }

                    {
                        filePath ?
                            (
                                <div style={{ overflow: 'scroll', height: 600 }}>
                                    <PDFReader url={Constants.RESOURCE_URL + filePath}
                                        showAllPage={true}
                                        width="300" />
                                </div>
                            )
                            :
                            (<div className="w-full my-10">
                                <p className="text-myflixGray2 font-normal text-sm text-center">
                                    No ebook file was found
                                </p>
                            </div>)
                    }

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    audiobook: state.audiobook.audiobook,
})

const mapDispatchToProps = (dispatch) => ({
    fetchAudiobookDetails: ({ title }) => dispatch(fetchAudiobookDetails({ title })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AudioBookListen);