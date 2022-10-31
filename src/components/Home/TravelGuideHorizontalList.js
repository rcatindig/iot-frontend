import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as Constants from '../../helpers/Constants';

class TravelGuideHorizontalList extends Component {
    render() {
        const { items, viewAllLink, itemClickHandler } = this.props
        let imageUrls = []

        if (items !== null && items !== undefined) {
            imageUrls = items.map(item => {
                return item.posterImagePath
            })
        }

        return (
            <div className="mt-6">
                <div className="my-3 flex justify-between items-baseline">
                    <h1 className="text-white font-semibold text-lg">
                        Travel Guide
                        </h1>
                    <button className="block focus:outline-none">
                        <Link to={viewAllLink} className="text-sm text-myflixGray2 hover:underline hover:text-gray-300">
                            View All
                            </Link>
                    </button>
                </div>
                <div className="-mx-5 flex flex-row overflow-x-scroll overflow-y-hidden">
                    {
                        imageUrls &&
                            imageUrls.length > 0 ?
                            imageUrls.map((url, index) => {
                                if (index === 0) {
                                    return <img key={index} src={Constants.RESOURCE_URL + url} alt="flag" onClick={itemClickHandler.bind(this, items[index])} className="rounded-full object-cover h-20 w-20 ml-5 mr-2 cursor-pointer" />
                                } else if (index === imageUrls.length - 1) {
                                    return <img key={index} src={Constants.RESOURCE_URL + url} alt="flag" onClick={itemClickHandler.bind(this, items[index])} className="rounded-full object-cover h-20 w-20 ml-2 mr-5 cursor-pointer" />
                                } else {
                                    return <img key={index} src={Constants.RESOURCE_URL + url} alt="flag" onClick={itemClickHandler.bind(this, items[index])} className="rounded-full object-cover h-20 w-20 mx-2 cursor-pointer" />
                                }
                            })
                            :
                            <div className="w-full">
                                <p className="text-myflixGray2 font-normal text-sm text-center">
                                    No travel guides were found
                                </p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

TravelGuideHorizontalList.propTypes = {
    viewAllLink: PropTypes.string,
    items: PropTypes.array,
    itemClickHandler: PropTypes.func
}

export default TravelGuideHorizontalList;