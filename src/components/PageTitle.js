import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PageTitle extends Component {
    render() {
        const { title, className } = this.props
        return (
            <div className={`relative flex items-center justify-center my-4 ${className}`}>
                <div className="bg-myflixGray1 w-full h-px"></div>

                <div className="bg-myflixDarkGray px-2 absolute">
                    <p className="text-white font-semibold text-lg">{title}</p>
                </div>
            </div>
        )
    }
}

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default PageTitle;