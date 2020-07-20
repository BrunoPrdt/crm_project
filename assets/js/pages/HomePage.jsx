import React, {useContext} from 'react';
import UserContext from "../context/UserContext";
import {NavLink} from "react-router-dom";

/**
 *
 * @returns {*}
 * @constructor
 */
const HomePage = (props) => {
    const userData = useContext(UserContext);

    return (
        <div className="jumbotron">
            <h1 className="display-3 mb-5">{props.auth ? "Bienvenue" : "Bienvenue sur QuickFactures"} !</h1>
            {props.auth ?
                <>
                    <h2>Que souhaitez-vous faire ?</h2>
                </> :
                <>
                    <h2>C'est une simple application de gestion de vos factures.</h2>
                </>
            }
            <hr className="my-4" />
            {props.auth ?
                <>
                    <p>Vous pouvez créer une facture ou un nouveau clients, visualiser les existants.</p>
                </> :
                <>
                    <h5>Créez votre compte et authentifiez-vous. Vous pourrez ensuite créer vos clients, éditer leur factures...</h5>
                    <p>Un compte de test se trouve à votre disposition, cliquez directement sur connexion.</p>
                    <p className="lead">
                        <NavLink className="btn btn-primary btn-lg" to="/register" role="button">Créer mon compte</NavLink>
                    </p>
                </>
            }
        </div>
    );
};

export default HomePage;