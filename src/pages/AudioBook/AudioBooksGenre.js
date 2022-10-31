import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchAudioBooksWithGenre } from '../../actions/audiobookActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { toPascalCase } from '../../helpers/StringUtil';
import ListImageView from '../../components/ListImageView';
import { logoutHandler } from '../../helpers/AuthHelper';

class AudioBooksGenre extends Component {

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.props.fetchAudioBooksWithGenre({ genre })
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
        const { audiobooks } = this.props;
        const { genre } = this.props.match.params;

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={`${toPascalCase(genre)} Audiobooks`} className="pt-4" />

                <ListImageView
                    title={toPascalCase(genre)}
                    items={audiobooks}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    audiobooks: state.audiobook.audiobooks,
})

const mapDispatchToProps = (dispatch) => ({
    fetchAudioBooksWithGenre: (genre) => dispatch(fetchAudioBooksWithGenre(genre)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AudioBooksGenre);