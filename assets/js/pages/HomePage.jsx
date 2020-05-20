import React from 'react';

const HomePage = (props) => {
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bienvenue sur QuickFactures !</h1>
            <p className="lead">C'est une simple application de gestion de vos factures.</p>
            <hr className="my-4" />
                <p>Créez votre compte et authentifiez-vous. Vous pourrez ensuite créer vos clients, éditer leur factures...</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Créer mon compte</a>
                </p>
        </div>
    );
};

export default HomePage;