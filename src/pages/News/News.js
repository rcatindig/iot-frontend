import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import ScrollToTop from '../../components/Util/ScrollToTop';
import backIcon from '../../assets/icon-chevron-left.png';

import newsCoverImage from '../../assets/moviePoster2.jpg';


class News extends Component {

    handleBack = (e) => {
        this.props.history.goBack()
    }

    handleItemClickHandler = () => {
        this.props.history.push('/news/1')
    }

    render() {
        const newsItems = [...Array(12)].map(x => 0);

        // TODO: truncate the text before displaying here 
        return (
            <div className="flex container mx-auto pb-6 flex-col py-16">
                <ScrollToTop />


                {
                    newsItems.map((key, index) => {
                        if (index % 4 === 0) {
                            return (
                                <div key={index} className="flex-1 relative w-full justify-center my-1 shadow-md" onClick={this.handleItemClickHandler.bind(this)}>
                                    <div className={`w-6 h-6 absolute top-0 left-0 m-4 ${index !== 0 ? `hidden` : ``}`}>
                                        <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={this.handleBack.bind(this)} />
                                    </div>

                                    <img src={newsCoverImage} alt="news" className="w-full object-cover" />

                                    <div className="w-full h-24 absolute left-0 bottom-0 right-0 gradient-darkgrey"></div>

                                    <div className="absolute bottom-0 left-0 mx-3 my-2 w-3/4">
                                        <p className="text-white font-bold text-xl leading-tight">Corona Virus survivor stories</p>
                                        <p className="pt-1 text-white font-light text-sm">GMA News Online</p>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="w-full h-32 my-1 px-2" onClick={this.handleItemClickHandler.bind(this)}>
                                    <div className="bg-myflixGray1 flex flex-row shadow-md">
                                        <div className="flex-none">
                                            <img src={newsCoverImage} alt="news" className="h-32 w-32 object-cover" />
                                        </div>

                                        <div className="ml-2 flex flex-col relative">
                                            <p className="text-white my-1 font-semibold text-lg leading-snug">Corona Virus survivor stories</p>
                                            <p className="text-white text-sm font-light leading-snug">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem quidem nostrum rerum </p>
                                            <p className="text-white my-1 text-sm absolute left-0 bottom-0">GMA News Online</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default withRouter(News);