import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import ScrollToTop from '../../components/Util/ScrollToTop';

import backIcon from '../../assets/icon-chevron-left.png';
import moviePoster from '../../assets/moviePoster2.jpg';


class NewsDetails extends Component {

    handleBack = (e) => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div className="flex container relative mx-auto pb-6 flex-col py-16">
                <ScrollToTop />

                <div className="flex flex-row px-3">
                    <div className="mr-2">
                        <img src={backIcon} alt="back" className="w-6 h-6 cursor-pointer" onClick={this.handleBack}/>
                    </div>

                    <div className="flex flex-col w-full items-center text-center">
                        <h1 className="leading-none text-white font-semibold text-xl">Corona Virus survivor, korono virus Corona Virus survivor, korono virus Corona Virus survivor, korono virus</h1>
                        <p className="pt-3 text-myflixGray2 font-light text-sm">Author - Source Name</p>
                        <p className="text-myflixGray2 font-light text-sm">20 hrs ago</p>
                    </div>
                </div>

                <div className="py-5">
                    <img src={moviePoster} alt="cover" className="w-full h-64 object-cover" />
                    <p className="px-5 pt-2 text-myflixGray2 font-light text-xs">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio officiis vel beatae  </p>
                </div>

                <div className="px-5 text-white">
                    <p className="text-base font-light pb-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates eligendi ea possimus quam repellat tempora rerum earum facilis fugit quod aspernatur amet dolorem numquam, aliquam id molestias minima nam magnam!
                    </p>

                    <p className="text-base font-light pb-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates eligendi ea possimus quam repellat tempora rerum earum facilis fugit quod aspernatur amet dolorem numquam, aliquam id molestias minima nam magnam!at tempora rerum earum facilis fugit quod aspernatur amet dolorem numquam, aliquam id molestias minima nam magnam!
                    </p>

                    <p className="text-base font-light pb-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates eligendi ea possimus quam repe
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(NewsDetails);