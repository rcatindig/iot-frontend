import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchEbookDetails } from '../../actions/ebookActions';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';

import { logoutHandler } from '../../helpers/AuthHelper';
import { PDFReader } from 'reactjs-pdf-reader';

class EbookRead extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchEbookDetails({ title: id });
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
        const { filePath } = this.props.ebook;

        return (
            <div className="flex container relative mx-auto px-5 pb-6 flex-col py-16">
                <ScrollToTop />
                <div className="flex-1 relative w-full justify-center">

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
    ebook: state.ebook.ebook,
})

const mapDispatchToProps = (dispatch) => ({
    fetchEbookDetails: ({ title }) => dispatch(fetchEbookDetails({ title })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EbookRead);