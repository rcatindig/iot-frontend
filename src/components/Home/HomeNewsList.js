import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HomeNewsList extends Component {
    render() {
        const { newsItems, viewAllLink, itemClickHandler } = this.props

        return (
            <div className="mt-6">
                <div className="my-3 flex justify-between items-baseline">
                    <h1 className="text-white font-semibold text-lg">
                        News
                        </h1>
                    <button className="block focus:outline-none">
                        <Link to={viewAllLink} className="text-sm text-myflixGray2 hover:underline hover:text-gray-300">
                            View All
                            </Link>
                    </button>
                </div>
                <div className="flex flex-col">
                    {
                        // TO DO: truncate the title before rendering it here 138-characters
                        newsItems !== null &&
                            newsItems !== undefined &&
                            newsItems.length > 0 ?
                            newsItems.map((item, index) => {
                                return (
                                    <div key={index} onClick={itemClickHandler} className="w-full mb-4 p-3 bg-myflixGray1 rounded-lg flex cursor-pointer">
                                        <div className="">
                                            <img src={item.thumbnailImageUrl} alt="..." className="h-16 w-16 rounded-lg object-cover" />
                                        </div>

                                        <div className="flex-1 ml-3 h-16 overflow-hidden">
                                            <p className="w-full text-white text-xs font-semibold leading-tight">{item.title}</p>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="w-full">
                                <p className="text-myflixGray2 font-normal text-sm text-center">
                                    No news items
                                </p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

HomeNewsList.propTypes = {
    newsItems: PropTypes.array.isRequired,
    viewAllLink: PropTypes.string.isRequired,
}

export default HomeNewsList;