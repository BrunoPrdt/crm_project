import React, {useState} from 'react';
import Field from "../components/Field";
import {Link} from "react-router-dom";
import axios from 'axios';
import {SERVER_URL} from "../services/Config";

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

    /**
     *
     * @param event
     */
    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setCustomer({...customer, [name]:value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await axios.post(`${SERVER_URL}/api/customers`, customer);
            setErrors({});
            setTimeout(function () {
                props.history.push('/clients');
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
            <h1 className="mb-3">Création d'un client</h1>
            {customer.error && <p className="invalid-feedback">{customer.error}</p>}
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