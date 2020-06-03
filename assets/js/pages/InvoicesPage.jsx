import React, {useEffect, useState} from 'react';
import {findAllInvoices, deleteInvoice} from "../services/InvoicesRequestAPI";
import Pagination from "../components/Pagination";
import * as moment from "moment";

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée",
};

function InvoicesPages() {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect( () => {
        try {
            findAllInvoices()
                .then(newData => setInvoices(newData))
        } catch(error) {
            console.log("Oups il semble qu'il y ait une erreur: ", error.response);
        }
    }, []);

    /**
     * Gestion du changement de page
     * @param page
     */
    const handlePageChange = (page) => setCurrentPage(page);

    /**
     * Gestion de la recherche
     * @param e
     */
    const handleSearch = (e) => {
        setSearch(e.currentTarget.value);
        setCurrentPage(1);
    };

    /**
     *
     * @param id
     */
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await deleteInvoice(id)
        }catch (error) {
            setInvoices(originalInvoices);
        }
    };

    // filtrage des customers en fonction de la recherche
    const filteredInvoices = invoices.filter(i => (i.customer.firstName.toLowerCase().includes(search.toLowerCase())) ||
        (i.customer.lastName.toLowerCase().includes(search.toLowerCase())) ||
        (i.customer.compagny.toLowerCase().includes(search.toLowerCase())) ||
        (STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())) ||
        (i.amount.toString().includes(search.toLowerCase())) ||
        (i.sentAT.toString().includes(search.toLowerCase())));

    const itemsPerPage = 10;
    const paginationTable = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    /**
     * Gestion du rendu du tableau
     * @returns {*}
     */
    function renderTable() {
        return paginationTable.map((invoice, index) => {
            return(
                <tr key={index}>
                    <td>{invoice.chrono}</td>
                    <td>
                        <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                    </td>
                    <td>{invoice.customer.compagny}</td>
                    <td>{moment(invoice.sentAT).format('DD/MM/YYYY')}</td>
                    <td className="text-center">
                        { invoice.status === "PAID" && <span className="badge badge-success" style={{"width": "80px"}}>{STATUS_LABELS[invoice.status]}</span> }
                        { invoice.status === "SENT" && <span className="badge badge-info" style={{"width": "80px"}}>{STATUS_LABELS[invoice.status]}</span> }
                        { invoice.status === "CANCELLED" && <span className="badge badge-warning" style={{"width": "80px"}}>{STATUS_LABELS[invoice.status]}</span> }
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                    <td>
                        <button
                        className="btn btn-sm btn-secondary mr-1"
                        onClick={() => handleDelete(invoice.id)}
                    >
                        Editer
                    </button>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(invoice.id)}
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <h1>Liste des factures</h1>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher ..."
                    onChange={handleSearch}
                    value={search}
                />
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro de facture</th>
                    <th>Client</th>
                    <th>Entreprise</th>
                    <th>Envoyée le</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Montant</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {invoices.length === 0 && (
                    <tr>
                        <td>Récupération des données ...</td>
                    </tr>
                )}
                {renderTable()}
                </tbody>
            </table>
            {filteredInvoices.length > itemsPerPage && (
                // TODO : aggorythme de pagination à rajouter plus tard
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredInvoices.length}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default InvoicesPages;