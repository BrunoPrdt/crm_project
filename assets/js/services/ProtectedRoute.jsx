import React from 'react';
import {Route} from "react-router";
import {Redirect} from "react-router-dom";

export const ProtectedRoute = props => {
    return(
        props.auth? (
        <Route path={props.path} component={ props.component } />
        ) : (
        <Redirect to="/login" />)
    )
};