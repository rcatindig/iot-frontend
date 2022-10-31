import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import * as Constants from '../helpers/Constants';

import arrowIcon from '../assets/icon-chevron-left.png';

class ListImageView extends Component {

    render() {
        const { title, items, itemClickHandler, type } = this.props

        let imgClass = "h-20 rounded-md";

        if (type === "musics") {
            imgClass = "h-20 w-16 rounded-lg object-cover ";
        } else if (type === "episode") {
            imgClass = "h-12 w-20 rounded-md";
        }

        const modifiedTitle = (title.indexOf("travel") !== -1) ? title : "";

        return (
            <div className="flex flex-col my-6">
                <div>
                    <p className="text-white font-semibold text-lg">
                        {modifiedTitle}
                    </p>
                </div>

                <div className="flex flex-col my-3">
                    {

                        items &&
                            items.length > 0 ?
                            items.map((item, index) => {
                                const name = item.name || item.title;
                                const subtitle = item.year || item.author || item.series;
                                const travelGuideSrc = (type === "travel-guides") ? "/travelguides/" : ""

                                return (
                                    <div key={index} className="mb-1 py-2 px-2 hover:bg-myflixLightBlue rounded-md cursor-pointer" onClick={itemClickHandler.bind(this, item)}>
                                        <div className="flex flex-row">
                                            <div className="flex-none">
                                                <img src={Constants.RESOURCE_URL + travelGuideSrc + item.posterImagePath} alt="cover" className={imgClass} />
                                            </div>

                                            <div className="ml-3 flex flex-col w-full text-white">
                                                <p className="font-medium text-base">{name}</p>
                                                <p className="font-light text-sm">{subtitle}</p>
                                            </div>

                                            <div className="flex-none my-auto">
                                                <img src={arrowIcon} alt="arrow" className="h-5 w-5 transform -rotate-180" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="w-full">
                                <p className="text-myflixGray2 font-normal text-sm text-center">
                                    No {title.toLowerCase()} were found
                                </p>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

ListImageView.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array,
    itemClickHandler: PropTypes.func.isRequired
}

export default withRouter(ListImageView);