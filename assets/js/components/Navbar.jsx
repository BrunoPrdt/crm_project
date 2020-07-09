import React, {useState} from 'react';
import 'bootstrap';
import { Logout } from "../pages/LogoutPage";
import {withRouter} from "react-router";

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
                <a className="navbar-brand" href="/#">QuickFactures</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/#clients">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#factures">Factures</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a href="#login" className="btn btn-success">Connexion !</a>
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
