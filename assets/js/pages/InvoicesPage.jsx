import React, {useEffect, useState} from 'react';
import {findAllInvoices, deleteInvoice} from "../services/InvoicesRequestAPI";
import Pagination from "../components/Pagination";
import * as moment from "moment";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/Loaders/TableLoader";

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée",
};

/**
 *
 * @returns {*}
 * @constructor
 */
function InvoicesPages() {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setInvoices([]);
        try {
            findAllInvoices()
                .then(newData => setInvoices(newData));
            setTimeout(()=>{
                setLoading(false);
            }, 1000);
        } catch(error) {
            console.log("Oups il semble qu'il y ait une erreur: ", error.response);
            toast.error("Une erreur est survenue lors du chargement des factures");
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
            await deleteInvoice(id);
            toast.success(`Facture supprimée !`)
        }catch (error) {
            setInvoices(originalInvoices);
            toast.error("Une erreur est survenue");
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
                        <Link to={`/factures/${invoice.id}`}>{invoice.customer.firstName} {invoice.customer.lastName}</Link>
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
                        <Link to={`/factures/${invoice.id}`} className="btn btn-sm btn-secondary mr-1">Editer</Link>
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
        <>
            <div className="d-flex mb-3 justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link className="btn btn-primary" to="/factures/nouveau">Nouvelle facture</Link>
            </div>

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
                {!loading && <tbody>
                {renderTable()}
                </tbody>}
            </table>

            {loading &&
                <div>
                    <p className="my-5">Récupération des données</p>
                    <TableLoader />
                </div>
            }

            {filteredInvoices.length > itemsPerPage && (
                // TODO : aggorythme de pagination à rajouter plus tard
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredInvoices.length}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}

export default InvoicesPages;