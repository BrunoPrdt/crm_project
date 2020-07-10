import React, {useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '../services/Config';

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [loginError, setLoginError] = useState("");

    const handleChange = event=>{
        const {name, value} = event.currentTarget;
        setCredentials({...credentials, [name]:value});
    };

    const handleSubmit = async event => {
        event.preventDefault();//ne recharge pas la page
        try {
            await axios
                .post(`${SERVER_URL}/api/login_check`, credentials)
                .then(response => response.data.token)
            ;
            setLoginError("");
            props.history.push('/');
        }catch (e) {
            setLoginError("Le compte renseigné n'existe pas ou les informations sont invalides.");
        }
    };

    return (
        <>
            <h1>Connexion à QuickFactures</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        onChange={handleChange}
                        value={credentials.username}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name="username"
                        id="username"
                        className={"form-control" + (loginError ? " is-invalid" : "")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        onChange={handleChange}
                        value={credentials.password}
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password"
                        className={"form-control" + (loginError ? " is-invalid" : "")}
                    />
                    {loginError && <p className="invalid-feedback">{loginError}</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>
            </form>
        </>//TODO: beautifull design
    );
};

export default LoginPage;