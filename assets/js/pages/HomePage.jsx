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
            <h1 className="display-3">Bienvenue {props.auth ? userData.userData.firstName : "sur QuickFactures"} !</h1>
            {props.auth ?
                <>
                    <p className="lead">Que souhaitez-vous faire ?</p>
                </> :
                <>
                    <p className="lead">C'est une simple application de gestion de vos factures.</p>
                </>
            }
            <hr className="my-4" />
            {props.auth ?
                <>
                    <p>Vous pouvez créer une facture ou un nouveau clients, visualiser les existants.</p>
                </> :
                <>
                    <p>Créez votre compte et authentifiez-vous. Vous pourrez ensuite créer vos clients, éditer leur factures...</p>
                    <p className="lead">
                        <NavLink className="btn btn-primary btn-lg" to="/register" role="button">Créer mon compte</NavLink>
                    </p>
                </>
            }
        </div>
    );
};

export default HomePage;