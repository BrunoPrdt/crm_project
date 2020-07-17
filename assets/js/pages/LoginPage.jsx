import React, {useState, useContext} from 'react';
import axios from 'axios';
import {SERVER_URL, SETUP_APP} from '../services/Config';
import UserContext from "../context/UserContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [loginError, setLoginError] = useState("");
    const userContextValue = useContext(UserContext);

    /**
     *
     * @param event
     */
    const handleChange = event=>{
        const {name, value} = event.currentTarget;
        setCredentials({...credentials, [name]:value});
    };

    /**
     *
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async event => {
        event.preventDefault();//ne recharge pas la page
        try {
            await axios
                .post(`${SERVER_URL}/api/login_check`, credentials)
                .then(response => response.data.token)
            ;
            props.onLogin(true);
            setLoginError("");
            let setupData =  SETUP_APP();//TODO faire en sorte de récup ici les data php pour update
            setTimeout(function(){
                console.log('1', userContextValue);//TODO suppr les console.log après debug
                console.log("2", setupData);
                userContextValue.updateUserData(setupData);
            }, 500);
            setTimeout(function(){
                toast.success("Vous êtes désormais connecté ! :)");
                props.history.replace('/');
            }, 500);
        }catch (e) {
            console.log(e);
            setLoginError("Le compte renseigné n'existe pas ou les informations sont invalides.");
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            <h1>Connexion à QuickFactures</h1>
            <form action="" onSubmit={handleSubmit}>
                <Field name="username" label="Adresse email" type="email" value={credentials.username} placeholder="Adresse email de connexion"
                       onChange={handleChange} error={loginError}
                />
                <Field name="password" label="Mot de passe" type="password" value={credentials.password} placeholder="Mot de passe"
                       onChange={handleChange} error={loginError}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Se connecter</button>
                </div>
            </form>
        </>//TODO: beautifull design
    );
};

export default LoginPage;