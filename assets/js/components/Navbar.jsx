import React, {useState} from 'react';
import 'bootstrap';
import { Logout } from "../pages/LogoutPage";
import {withRouter} from "react-router";
import { NavLink } from "react-router-dom";

/**
 *
 * @returns {*}
 * @constructor
 */
const Navbar = (props) => {
    const [logoutInfos, setLogoutInfos] = useState("");

    const app_logout = async () =>{
        setLogoutInfos('Déconnexion en cours');
        try {
            await Logout();
            setLogoutInfos('Vous venez d\'être déconnecté, vous allez être redirigé.');
            setTimeout(function(){
                setLogoutInfos('');
                props.history.push('/');
            }, 3000);
        }catch(e){
            console.log('Un problème est survenu : ', e);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/">QuickFactures</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clients">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/factures">Factures</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="" className="nav-link">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="btn btn-success">Connexion !</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={app_logout}>Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </nav>
            {logoutInfos &&
                <div className="alert alert-dismissible alert-warning">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <h4 className="alert-heading">Warning!</h4>
                    <p className="mb-0"><a href="#" className="alert-link">{ logoutInfos }</a>.</p>
                </div>
            }
        </div>
    );
};

export default withRouter(Navbar);
