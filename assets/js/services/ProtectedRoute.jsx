import React from 'react';
import {Route} from "react-router";
import {Redirect} from "react-router-dom";

/**
 *
 * @param {boolean} auth (isAuthenticated)
 * @param {string} path
 * @param {react.Component} component
 * @returns {*}
 * @constructor
 */
export const ProtectedRoute = ({auth, path, component}) => {
    return(
        auth? (
        <Route path={path} component={ component } />
        ) : (
        <Redirect to="/login" />)
    )
};