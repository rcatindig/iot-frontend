import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import { search, searchRequestFailure } from '../../actions/miscActions';

import searchIcon from '../../assets/icon-search.png';
import filterIcon from '../../assets/icon-filter.png';
import closeIcon from '../../assets/icon-close.png';
import LoadingView from '../../components/LoadingView';

class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            searchTerm: "",
            categories: ["movies"],
            sortBy: "a-z"
        }
    }

    toggleDrawer = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value.trim() })
    }

    handleCategoryChange = (e) => {
        const name = e.target.name;
        let categories = [...this.state.categories];
        const index = categories.indexOf(name);

        if (index === -1) {
            categories.push(name);
        } else {
            categories.splice(index, 1)
        }

        this.setState({ categories: categories });
    }

    handleCheckboxChange = (e) => {
        const name = e.target.name;
        this.setState({ sortBy: name });
    }


    handleSearch = () => {
        if (!this.state.searchTerm) {
            this.toggleDrawer()
            return;
        }

        let categories = [...this.state.categories];
        // Make sure movies is checked if there are no categories selected
        if (categories.length === 0 && categories.indexOf("movies") === -1) {
            categories.push("movies");
        }

        this.setState({ categories: categories });

        this.props.search(this.state.searchTerm, categories.toString())
            .then(() => {
                this.toggleDrawer()
                this.props.history.push("/search");
            })
            .catch(() => {
                this.props.searchRequestFailure()
             })
    }

    render() {
        const {
            isOpen,
            categories
        } = this.state;

        return (
            <div className="mt-16 flex justify-between items-center ">
                <div className="flex-1 flex flex-row" onClick={this.toggleDrawer}>
                    <input disabled type="text" placeholder="Find movies, series, ebooks and more..." className="pl-4 pr-8 py-2 bg-myflixGray1 w-full text-white border-2 border-myflixGray1 rounded-md focus:outline-none focus:border-myflixBlueGreen focus:shadow-darkBlack transition duration-300 ease-in-out truncate" />
                    <button className="block focus:outline-none -m-8">
                        <img src={searchIcon} alt="search icon" className="h-6" />
                    </button>
                </div>

                <button className="ml-3 block focus:outline-none">
                    <img src={filterIcon} alt="filter icon" className="h-6" onClick={this.toggleDrawer} />
                </button>

                {/* SIDE DRAWER */}
                <div className={`transform ${isOpen ? `visible z-20` : `hidden`} fixed top-0 left-0 right-0 w-full h-screen opacity-75 bg-black transition-all duration-300 ease-in-out`} onClick={this.toggleDrawer} >
                </div>

                <div className={`transform ${isOpen ? `translate-x-0 z-20` : `translate-x-full`} fixed top-0 right-0 py-5 px-4 bg-myflixDarkGray h-screen w-9/12 sm:w-1/2 md:w-7/12 lg:w-3/12 transition-all duration-300 ease-in-out text-white flex flex-col`} >
                    <div className="flex flex-row justify-end">
                        <img src={closeIcon} alt="close" className="h-6 w-6 cursor-pointer" onClick={this.toggleDrawer} />
                    </div>

                    {/* Search bar */}
                    <div className="pb-3 mt-3">
                        <h1 className="font-bold text-base">
                            Search
                        </h1>
                    </div>

                    <div className="flex flex-row">
                        <input type="text"
                            placeholder="Find movies, series, ebooks and more..."
                            className="pl-4 pr-8 py-2 bg-myflixGray1 w-full text-white border-2 border-myflixGray1 rounded-md focus:outline-none focus:border-myflixBlueGreen focus:shadow-darkBlack transition duration-300 ease-in-out truncate"
                            onChange={this.handleSearchChange} />
                        <button className="block focus:outline-none -m-8">
                            <img src={searchIcon} alt="search icon" className="h-6" />
                        </button>
                    </div>

                    <div className="w-full h-px bg-myflixGray1 my-5"></div>

                    {/* CATEGORY */}
                    <div className="">
                        <div className="pb-3">
                            <h1 className="font-bold text-base">
                                Category
                            </h1>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-sm">
                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("movies") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="movies" />
                                    <span className="ml-2">Movies</span>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("series") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="series" />
                                    <span className="ml-2">Series</span>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("audiobooks") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="audiobooks" />
                                    <span className="ml-2">Audiobooks</span>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("ebooks") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="ebooks" />
                                    <span className="ml-2">E-books</span>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("music") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="music" />
                                    <span className="ml-2">Music</span>
                                </label>
                            </div>

                            <div>
                                <label className="inline-flex items-center">
                                    <input checked={categories.indexOf("travel-guides") !== -1} onChange={this.handleCategoryChange} type="checkbox"
                                        className="h-4 w-4 form-checkbox bg-myflixDarkGray text-myflixBlueGreen" name="travel-guides" />
                                    <span className="ml-2">Travel Guides</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button onClick={this.handleSearch} className="mt-6 bg-myflixBlueGreen hover:bg-teal-400 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                        Search
                    </button>
                </div>

                {this.props.isLoading && <LoadingView />}

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isTokenExpired: state.auth.isTokenExpired,
    searchResults: state.misc.searchResults,
    isLoading: state.misc.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    search: (term, categories) => dispatch(search(term, categories)),
    searchRequestFailure: () => dispatch(searchRequestFailure()),
    logout: () => dispatch(logout())
})

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Searchbar);