import React, {useState} from 'react';
import axios from 'axios';
import {SERVER_URL} from '../services/Config';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [loginError, setLoginError] = useState("");

    const handleChange = event=>{
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setCredentials({...credentials, [name]:value});
    };

    const handleSubmit = async event => {
        event.preventDefault();//ne recharge pas la page
        try {
            const token = await axios
                .post(`${SERVER_URL}/api/login_check`, credentials)
                //.then(response => response.data['hydra:member'])
                .then(response => response.data.token)
            ;
            setLoginError("");
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        }catch (e) {
            console.log(e.response);
            setLoginError("Le compte renseigné n'existe pas ou les informations sont invalides.");
        }
    };
    // TODO : database connexion to register

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