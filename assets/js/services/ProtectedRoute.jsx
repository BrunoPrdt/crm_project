import React from 'react';
import {Route} from "react-router";
import {Redirect} from "react-router-dom";

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const ProtectedRoute = props => {
    return(
        props.auth? (
        <Route path={props.path} component={ props.component } />
        ) : (
        <Redirect to="/login" />)
    )
};