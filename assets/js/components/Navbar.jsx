import React, {useContext, useState} from 'react';
import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";
import 'bootstrap';
import { Logout } from "../pages/LogoutPage";
import {withRouter} from "react-router";
import { NavLink } from "react-router-dom";
import {toast} from "react-toastify";
import {invalidateCache} from "../services/cache";

/**
 *
 * @returns {*}
 * @constructor
 */
const Navbar = (props) => {
    const [logoutInfos, setLogoutInfos] = useState("");
    const userData = useContext(UserContext);//TODO implement avatar
    const auth = useContext(AuthContext);

    /**
     *
     * @returns {Promise<void>}
     */
    const app_logout = async () =>{
        setTimeout(function () {
            setLogoutInfos('Déconnexion en cours, vidage du cache');
            try {
                invalidateCache("invoices");
                toast.success("cache factures supprimé");
            }catch (e) {
                toast.info("cache factures vide");
            }
            try {
                invalidateCache("customers");
                toast.success("cache clients supprimé")
            }catch (e) {
                toast.info("cache client vide");
            }
            try {
                invalidateCache("users");
                toast.success("cache utilisateur supprimé")
            }catch (e) {
                toast.info("cache utilisateur vide")
            }
        }, 500);
        try {
            await Logout();
            props.onLogout(false);
            setLogoutInfos('Vous venez d\'être déconnecté, vous allez être redirigé.');
            toast.info("Vous êtes désormais déconnecté :-)");
            setTimeout(function(){
                setLogoutInfos('');
                props.history.push('/');
            }, 1000);
        }catch(e){
            console.log('Un problème est survenu : ', e);
            props.history.replace('/');
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
                    {props.auth &&
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/clients">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/factures">Factures</NavLink>
                        </li>
                    </ul>
                    }
                    <ul className="navbar-nav ml-auto">
                        {props.auth ?
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={app_logout}>Déconnexion</button>
                                </li>
                            </> :
                            <>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Inscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success">Connexion !</NavLink>
                                </li>
                            </>

                        }
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
