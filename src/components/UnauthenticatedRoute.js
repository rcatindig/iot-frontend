import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const UnauthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to="/home" />
            }
        />
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(UnauthenticatedRoute);
