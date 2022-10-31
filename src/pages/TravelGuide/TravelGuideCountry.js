import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchTravelGuides } from '../../actions/travelGuideActions';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import ListImageView from '../../components/ListImageView';
import { logoutHandler } from '../../helpers/AuthHelper';

class TravelGuideCountry extends Component {

    constructor(props) {
        super(props)
        this.state = { //state is by default an object
            travelGuideLists: []
        }
    }

    componentDidMount = () => {
        const { country } = this.props.match.params;

        this.props.fetchTravelGuides({ title: country })
            .then(() => {
                var travelGuideLists = [];

                this.props.travelGuidesPerCountry.forEach(item => {
                    let travelGuideList = {
                        title: item.name,
                        country: item.country,
                        filePath: item.filePath,
                        author: "",
                        posterImagePath: "/travelguides/" + item.posterImagePath,
                    }

                    travelGuideLists.push(travelGuideList);
                })

                this.setState({ travelGuideLists: travelGuideLists });
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

    handleItemClickHandler = (travelGuide) => {
        const location = {
            pathname: `/travelguides/view/${travelGuide.title}@${travelGuide.country}`,
        }
        this.props.history.push(location)
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const travelGuideList = this.state.travelGuideLists;
        const { country } = this.props.match.params;

        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={country} className="pt-4" />

                <ListImageView
                    title="Travel Guides"
                    items={travelGuideList}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    travelGuidesPerCountry: state.travelGuide.travelGuidesPerCountry,
})

const mapDispatchToProps = (dispatch) => ({
    fetchTravelGuides: ({ title }) => dispatch(fetchTravelGuides({ title })),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TravelGuideCountry);