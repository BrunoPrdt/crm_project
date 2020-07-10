import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../services/UserContext";
import {NavLink} from "react-router-dom";

/**
 *
 * @returns {*}
 * @constructor
 */
const HomePage = () => {
    const [isOnline, setIsOnline] =  useState(false);
    const userData = useContext(UserContext);
    useEffect(()=>{
        userData && setIsOnline(true);
    });//TODO revoir le display dynamique conditionel qui ne s'exécute que lords du rechargement de la page
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bienvenue {isOnline ? userData.userData.firstName : "sur QuickFactures"} !</h1>
            {userData ?
                <>
                    <p className="lead">Que souhaitez-vous faire ?</p>
                </> :
                <>
                    <p className="lead">C'est une simple application de gestion de vos factures.</p>
                </>
            }
            <hr className="my-4" />
            {userData ?
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