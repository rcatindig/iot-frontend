import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { fetchEbooksWithGenre } from '../../actions/ebookActions';

import { logoutHandler } from '../../helpers/AuthHelper';

import PageTitle from '../../components/PageTitle';
import Searchbar from '../../components/Home/Searchbar';
import ScrollToTop from '../../components/Util/ScrollToTop';
import { toPascalCase } from '../../helpers/StringUtil';
import ListImageView from '../../components/ListImageView';

class EbookGenre extends Component {

    componentDidMount() {
        const { genre } = this.props.match.params;
        this.props.fetchEbooksWithGenre({ genre })
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
        const { ebooks } = this.props;
        const { genre } = this.props.match.params;
        return (
            <div className="container relative mx-auto px-5 pb-6">
                <ScrollToTop />
                <Searchbar />

                <PageTitle title={`${toPascalCase(genre)} E-books`} className="pt-4" />

                <ListImageView 
                    title={toPascalCase(genre)}
                    items={ebooks}
                    itemClickHandler={this.handleItemClickHandler}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    ebooks: state.ebook.ebooks,
})

const mapDispatchToProps = (dispatch) => ({
    fetchEbooksWithGenre: (genre) => dispatch(fetchEbooksWithGenre(genre)),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EbookGenre);