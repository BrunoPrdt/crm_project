import React from 'react';

const LoginPage = () => {
    return (
        <>
            <h1>Connexion à l'application</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email" placeholder="Adresse email de connexion" name="username" id="username" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" placeholder="Mot de passe" name="password" id="password" className="form-control"/>
                </div>
            </form>
        </>
    );
};

export default LoginPage;