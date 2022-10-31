import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Constants from '../../helpers/Constants';

class HorizontalImageList extends Component {

    // GET RANDOM INT FROM 0 TO MAX - 1
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    openLink = (link) => {
        const win = window.open(link, '_blank');
        win.focus();
    }

    render() {
        const { advertisements, title, viewAllLink, isBanner, items, itemClickHandler } = this.props
        const imageWidth = isBanner ? 'w-56' : 'w-20';
        const itemList = [];

        if (items !== null && items !== undefined && items.length > 0) {

            items.forEach(item => {
                itemList.push({
                    imageUrl: Constants.RESOURCE_URL + (isBanner ? item.bannerImagePath : item.posterImagePath),
                    clickHandler: () => itemClickHandler(item)
                })
            });


            if (advertisements !== null && advertisements !== undefined && advertisements.length > 0) {
                for (let i = 0; i < advertisements.length; i++) {
                    const ad = advertisements[i];
                    const adInsertIndex = this.getRandomInt(itemList.length);
                    itemList.splice(adInsertIndex, 0, { imageUrl: ad.imageUrl, clickHandler: () => this.openLink(ad.link) })
                }
            }
        }

        return (
            <div className="mt-6">
                <div className="my-3 flex justify-between items-baseline">
                    <h1 className="text-white font-semibold text-lg">
                        {title}
                    </h1>
                    <button className="block focus:outline-none">
                        <Link to={viewAllLink} className="text-sm text-myflixGray2 hover:underline hover:text-gray-300">
                            View All
                            </Link>
                    </button>
                </div>
                <div className="-mx-5 flex flex-row overflow-x-scroll overflow-y-hidden">
                    {
                        itemList !== null &&
                            itemList !== undefined &&
                            itemList.length > 0 ?
                            itemList.map((item, index) => {
                                if (index === 0) {
                                    return <img key={index} src={item.imageUrl} alt="img" className={imageWidth + " h-32 rounded-lg ml-5 mr-2 object-cover cursor-pointer"} onClick={item.clickHandler} />
                                } else if (index === itemList.length - 1) {
                                    return <img key={index} src={item.imageUrl} alt="img" className={imageWidth + " h-32 rounded-lg ml-2 mr-5 object-cover cursor-pointer"} onClick={item.clickHandler} />
                                } else {
                                    return <img key={index} src={item.imageUrl} alt="img" className={imageWidth + " h-32 rounded-lg mx-2 object-cover cursor-pointer"} onClick={item.clickHandler} />
                                }
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

HorizontalImageList.propTypes = {
    title: PropTypes.string,
    viewAllLink: PropTypes.object,
    isBanner: PropTypes.bool,
    items: PropTypes.array,
    itemClickHandler: PropTypes.func
}

export default HorizontalImageList;