import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchTravelGuideDetails } from '../../actions/travelGuideActions';

import ScrollToTop from '../../components/Util/ScrollToTop';
import * as Constants from '../../helpers/Constants';
import { PDFReader } from 'reactjs-pdf-reader';
import { logoutHandler } from '../../helpers/AuthHelper';

class TravelGuideDetail extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        const data = id.split('@');
        const name = data[0];
        const country = data[1];
        this.props.fetchTravelGuideDetails({ name, country });
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
        const { filePath } = this.props.travelGuideDetails;

        return (
            <div className="flex container relative mx-auto px-5 pb-6 flex-col py-16">
                <ScrollToTop />
                <div className="flex-1 relative w-full justify-center">

                    <div style={{ overflow: 'scroll', height: 600 }}>
                        {
                            filePath &&
                            (
                                <PDFReader url={Constants.RESOURCE_URL + "/travelguides" + filePath}
                                    showAllPage={true}
                                    width="300" />
                            )
                        }
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    travelGuideDetails: state.travelGuide.travelGuide,
})

const mapDispatchToProps = (dispatch) => ({
    fetchTravelGuideDetails: ({ name, country }) => dispatch(fetchTravelGuideDetails({ name, country })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TravelGuideDetail);