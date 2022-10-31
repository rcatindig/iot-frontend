import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchCountryTravelGuides } from '../../actions/travelGuideActions';

import * as Constants from '../../helpers/Constants';
import ScrollToTop from '../../components/Util/ScrollToTop';
import PageTitle from '../../components/PageTitle';
import { logoutHandler } from '../../helpers/AuthHelper';

class TravelGuides extends Component {

    componentDidMount() {
        this.props.fetchCountryTravelGuides()
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

    itemClickHandler = (country) => {
        const location = {
            pathname: `travelguides/${country.title}`,
        }
        this.props.history.push(location)
    }

    render() {
        const { countryTravelGuides } = this.props;

        return (
            <div className="flex container relative mx-auto pb-6 px-5 flex-col py-16">
                <ScrollToTop />

                <PageTitle title="Travel Guides" />

                <div className="py-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

                    {
                        countryTravelGuides !== null &&
                        countryTravelGuides !== undefined &&
                        countryTravelGuides.length > 0 &&
                        countryTravelGuides.map((guide, index) => {
                            return (
                                <div key={index} className="flex flex-row cursor-pointer hover:bg-gray-800 rounded-lg" onClick={this.itemClickHandler.bind(this, guide)}>
                                    <div className="mr-2">
                                        <img src={Constants.RESOURCE_URL + guide.posterImagePath} alt="flag" className="h-16 w-16 object-cover rounded-lg" />
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <p className="text-white text-base">{guide.title}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    (countryTravelGuides === null ||
                        countryTravelGuides === undefined) &&
                    (
                        <div className="w-full py-8">
                            <p className="text-myflixGray2 font-normal text-sm text-center">
                                No travel guides were found
                            </p>
                        </div>)

                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    countryTravelGuides: state.countryTravelGuide.countryTravelGuides,
})

const mapDispatchToProps = (dispatch) => ({
    fetchCountryTravelGuides: () => dispatch(fetchCountryTravelGuides()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TravelGuides);