import React from 'react';
import 'bootstrap';
import { Logout } from "../pages/LogoutPage";

/**
 *
 * @returns {*}
 * @constructor
 */
const Navbar = () => {

    const app_logout = async () =>{
        console.log('Déconnexion en cours');
        try {
            await Logout();
            console.log('Vous venez d\'être déconnecté, vous allez être redirigé.');
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
        </div>
    );
};

export default Navbar;
