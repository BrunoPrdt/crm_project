import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {createInvoice, updateInvoiceById} from "../services/InvoicesRequestAPI";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import {findAllCustomers} from "../services/CustomersRequestAPI";
import axios from "axios";
import {SERVER_URL} from "../services/Config";

const CreateAndUpdateInvoicePage = ({history, match}) => {

    /**
     * initial state for invoice  creation
     */
    const [invoice, setInvoice] = useState({
        amount: undefined,
        customer: "",
        status: "",
        sentAT: undefined,
        chrono: undefined,
        compagny: "",
    });
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: "",
        sentAT: "",
        chrono: "",
        compagny: "",
    });
    const [customers, setCustomers] = useState([]);
    const [axiosError, setAxiosError] = useState("");
    const [editing, setEditing] = useState(false);
    const id = match.params.id;

    /**
     *
     * @returns {Promise<void>}
     */
    const getAllCustomers = async () => {
        try {
            const data = await findAllCustomers();
            setCustomers(data);
        }catch (error) {
            console.log("erreur :", error.response);
            setAxiosError(error.response);
        }
    };

    /**
     * get all customers when dom load or reload
     */
    useEffect(() => {
        getAllCustomers();
    }, []);

    /**
     *
     * @param {number} id
     * @returns {Promise<void>}
     */
    const getOneInvoiceById = async (id) => {
        const source = axios.CancelToken.source();
        try {
            const data = await axios
                .get(`${SERVER_URL}/api/invoices/${id}`, {
                    cancelToken: source.token,
                })
                .then(response => response.data);
            const {chrono,sentAt, status, amount, customer} = data;
            setInvoice({chrono, sentAt, status, amount, customer: customer.id, compagny: customer.compagny});
        }catch (error) {
            console.log(error);
            setAxiosError(error);
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
                getOneInvoiceById(id);
            }
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
        setInvoice({...invoice, [name]:value});
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
                await updateInvoiceById(id, invoice);
                //TODO : flash notification de succès !
                setErrors({});
                setTimeout(function () {
                    history.replace('/factures');
                }, 500);
            }else {
                let d = new Date();
                let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                setInvoice(invoice.sentAT= date);
                await createInvoice(invoice);
                //TODO : flash notification de succès !
                setErrors({});
                setTimeout(function () {
                    history.replace('/factures');
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
            }
            console.log(response);
            setAxiosError(response);
        }
    };

    return (
        <>
            {!editing ? <h1 className="mb-3">Création d'une facture</h1> :
                <h1 className="mb-3">Modification d'une facture</h1>}
            {axiosError && <p className="invalid-feedback">{axiosError}</p>}
            {invoice.length === 0 && (
                <div className="alert-info">
                    <p>Récupération des données</p>
                </div>
            )}

            <form action="" onSubmit={handleSubmit}>
                <Field name="amount"
                       label="Montant"
                       type="number"
                       placeholder="Montant de la facture"
                       value={invoice.amount}
                       error={errors.amount}
                       onChange={handleChange}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    <option value="">Sélectionnez un client dans la liste</option>
                    {customers.map(customer =>
                        <option key={customer.id} value={customer.id}>{customer.lastName} {customer.firstName}</option>
                    )}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange}
                    >
                    <option value="">Sélectionnez un statut</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                    <option value="SENT">Envoyée</option>
                </Select>
                {editing &&
                (<>
                    <Field name="compagny"
                           label="Entreprise"
                           type="text"
                           placeholder="Entreprise du client"
                           value={invoice.compagny}
                           error={errors.compagny}
                           onChange={handleChange}
                    />
                    <Field name="chrono"
                           label="Numéro de facture"
                           type="text"
                           placeholder="Numéro de facture"
                           value={invoice.chrono}
                           error={errors.chrono}
                           onChange={handleChange}
                    />
                </>)
                }
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Valider</button>
                    <Link to="/factures" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
};

CreateAndUpdateInvoicePage.propTypes = {

};

export default CreateAndUpdateInvoicePage;