import React, {useEffect, useState} from 'react';
import Field from "../components/Field";
import {Link} from "react-router-dom";
import axios, {AxiosStatic as Axios} from 'axios';
import {SERVER_URL} from "../services/Config";
import {findOneCustomerById} from "../services/CustomersRequestAPI";

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const CreateCustomerPage = (props) => {

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
    const id = props.match.params.id;
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
        }catch (error) {
            if (Axios.isCancel(error)) {
            } else {
                throw error
            }
        }
    };

    useEffect( () => {
        let mounted = true;
        if (id !== "nouveau") {
            setEditing(true);
            if (mounted) {
                getOneCustomerById(id);
            }
        }
        return function cleanup() {
            mounted = false
        };
    }, []);

    /**
     *
     * @param event
     */
    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setCustomer({...customer, [name]:value});
    }

    /**
     *
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await axios.put(`${SERVER_URL}/api/customers/${id}`, customer);
                //TODO : flash notification de succès !
                setErrors({});
                setTimeout(function () {
                    props.history.replace('/clients');
                }, 500);
            }
            await axios.post(`${SERVER_URL}/api/customers`, customer);
            //TODO : flash notification de succès !
            setErrors({});
            setTimeout(function () {
                props.history.replace('/clients');
            }, 500);
        }catch (error) {
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.map(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return (
        <>
            {!editing ? <h1 className="mb-3">Création d'un client</h1> :
                <h1 className="mb-3">Modification d'un client</h1>}
            {customer.error && <p className="invalid-feedback">{customer.error}</p>}
            {customer.length === 0 && (
                <div className="alert-info">
                    <p>Récupération des données</p>
                </div>
            )}
            <form action="" onSubmit={handleSubmit}>
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
            </form>
        </>
    );
};

export default CreateCustomerPage;