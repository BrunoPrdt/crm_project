import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios, {AxiosStatic as Axios} from 'axios';
import {SERVER_URL} from "../services/Config";
import {createCustomer, updateCustomerById} from "../services/CustomersRequestAPI";
import {toast} from "react-toastify";
import FormContentLoader from "../components/Loaders/FormContentLoader";

/**
 *
 * @param history
 * @param match
 * @returns {*}
 * @constructor
 */
const CreateAndUpdateCustomerPage = ({history, match}) => {

    /**
     * initial state for customer  creation
     */
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        compagny: "",
        phonenumber: undefined,
        adress: "",
        zipcode: "",
        city: "",
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        compagny: "",
        phonenumber: "",
        adress: "",
        zipcode: "",
        city: "",
    });

    const [editing, setEditing] = useState(false);
    const id = match.params.id;
    const [loading, setLoading] = useState(true);
//TODO : refactor in CustomersRequestAPI.js
    /**
     *
     * @param {number} id
     * @returns {Promise<void>}
     */
    const getOneCustomerById = async (id) => {
        const source = axios.CancelToken.source();
        try {
            const data = await axios
                .get(`${SERVER_URL}/api/customers/${id}`, {
                    cancelToken: source.token,
                })
                .then(response => response.data);
            const {firstName, lastName, email, compagny, phoneNumber, address, zipcode, city} = data;
            setCustomer({firstName, lastName, email, compagny, phoneNumber, address, zipcode, city});
            setLoading(false);
        }catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue lors de la récupération du client demandé");
        }
    };

    /**
     * load customer objet if id !nouveau
     */
    useEffect( () => {
        let mounted = true;
        if (id !== "nouveau") {
            setEditing(true);
            if (mounted) {
                getOneCustomerById(id);
            }
        }else {
            setLoading(false);
        }
        /**
         * clean useeffect after load
         */
        return function cleanup() {
            mounted = false
        };
    }, [id]);

    /**
     * Input event
     * @param event
     */
    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setCustomer({...customer, [name]:value});
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
        try {
            if (editing) {
                await updateCustomerById(id, customer);
                toast.success("Le client a bien été modifié");
                setErrors({});
                setTimeout(function () {
                    history.replace('/clients');
                }, 500);
            }else {
                await createCustomer(customer);
                toast.success("Le client a bien été créé");
                setErrors({});
                setTimeout(function () {
                    history.replace('/clients');
                }, 500);
            }
        }catch (response) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
                toast.error("Erreur(s) dans votre formulaire");
            }
            console.log(response);
            toast.error("Une erreur est survenue lors de la création du client");
        }
    };

    return (
        <>
            {!editing ? <h1 className="mb-3">Création d'un client</h1> :
                <h1 className="mb-3">Modification d'un client</h1>}
            {customer.length === 0 && (
                <div className="alert-info">
                    <p>Récupération des données</p>
                </div>
            )}
            {loading &&
            <div>
                <p>Chargement des données</p>
                <FormContentLoader />
            </div>
            }

            {!loading && <form action="" onSubmit={handleSubmit}>
                <Field name="lastName"
                       label="Nom de famille"
                       type="text"
                       placeholder="Nom de famille du client"
                       value={customer.lastName}
                       error={errors.lastName}
                       onChange={handleChange}
                />
                <Field name="firstName"
                       label="Prénom"
                       type="text"
                       placeholder="Prénom du client"
                       value={customer.firstName}
                       error={errors.firstName}
                       onChange={handleChange}
                />
                <Field name="email"
                       label="Email du client"
                       type="email"
                       placeholder="Email du client"
                       value={customer.email}
                       error={errors.email}
                       onChange={handleChange}
                />
                <Field name="compagny"
                       label="Entreprise"
                       type="text"
                       placeholder="Entreprise du client"
                       value={customer.compagny}
                       error={errors.compagny}
                       onChange={handleChange}
                />
                <Field name="phonenumber"
                       label="Numéro de téléphone"
                       type="text"
                       placeholder="Numéro de l'entreprise ou du client"
                       value={customer.phonenumber}
                       error={errors.phonenumber}
                       onChange={handleChange}
                />
                <Field name="adress"
                       label="Adresse"
                       type="text"
                       placeholder="Numéro et rue"
                       value={customer.adress}
                       error={errors.adress}
                       onChange={handleChange}
                />
                <Field name="zipcode"
                       label="Code postale"
                       type="text"
                       placeholder="Code postale"
                       value={customer.zipcode}
                       error={errors.zipcode}
                       onChange={handleChange}
                />
                <Field name="city"
                       label="Ville"
                       type="text"
                       placeholder="Ville"
                       value={customer.city}
                       error={errors.city}
                       onChange={handleChange}
                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Valider</button>
                    <Link to="/clients" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>}
        </>
    );
};

export default CreateAndUpdateCustomerPage;