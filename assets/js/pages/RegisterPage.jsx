import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {createUser} from "../services/UserRequestApi";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

/**
 *
 * @param history
 * @returns {*}
 * @constructor
 */
const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [submittedError, setSubmittedError] = useState('');

    /**
     * Input event
     * @param event
     */
    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setUser({...user, [name]:value});
    }

    /**
     * Submit event
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async event => {
        /**
         * don't reload dom
         */
        event.preventDefault();
        if (user.password === user.passwordConfirm) {
            try {
                await createUser(user);
                toast.success("La création de l'utilisateur a été réalisée avec succès !");
                setErrors({});
                setSubmittedError('');
                setTimeout(function () {
                    history.replace('/login');
                }, 500);
            }catch (response) {
                const {violations} = response.data;
                if (violations) {
                    const apiErrors = {};
                    violations.map(violation => {
                        apiErrors[violation.propertyPath] = violation.message;
                    });
                    setErrors(apiErrors);
                }
                toast.error("Erreur(s) dans votre formulaire");
            }
        }else {
            setSubmittedError('Les mots de passe ne correspondent pas !');
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            <h1  className="mb-3">Création d'un compte</h1>
            <form action="" onSubmit={handleSubmit}>
                <Field name="firstName"
                       label="Prénom"
                       type="text"
                       placeholder="Votre Prénom"
                       value={user.firstName}
                       error={errors.firstName}
                       onChange={handleChange}
                />
                <Field name="lastName"
                       label="Nom"
                       type="text"
                       placeholder="Votre nom"
                       value={user.lastName}
                       error={errors.lastName}
                       onChange={handleChange}
                />
                <Field name="email"
                       label="Email"
                       type="email"
                       placeholder="Votre email"
                       value={user.email}
                       error={errors.email}
                       onChange={handleChange}
                />
                <Field name="password"
                       label="Mot de passe"
                       type="password"
                       placeholder="Votre mot de passe"
                       value={user.password}
                       error={errors.password}
                       onChange={handleChange}
                />
                <Field name="passwordConfirm"
                       label="Confirmez le mot de passe"
                       type="password"
                       placeholder="resaisir le mot de passe"
                       value={user.passwordConfirm}
                       error={errors.passwordConfirm}
                       onChange={handleChange}
                />
                <div className="form-group">
                    <p className={"d-none form-control" + (submittedError && " is-invalid")} />
                    {submittedError && <p className="invalid-feedback">{submittedError}</p>}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success mr-2">Valider</button>
                    <Link to="/login" className="btn btn-secondary">J'ai déjà un compte</Link>
                    <Link to="/" className="btn btn-link">Retour à l'accueil</Link>
                </div>
            </form>
        </>
    );
};

export default RegisterPage;