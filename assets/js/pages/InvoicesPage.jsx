import React, {useEffect, useState} from 'react';
import {findAllInvoices, deleteInvoice} from "../services/InvoicesRequestAPI";
import Pagination from "../components/Pagination";

function InvoicesPagesBis() {

    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect( () => {
        findAllInvoices()
            .then(newData => setInvoices(newData))
            .catch(error => console.log("Oups il semble qu'il y ait une erreur: ", error.response))
        ;
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
    const filteredInvoices = invoices.filter(i => (i.customer.firstName.toLowerCase().includes(search)) ||
        (i.customer.lastName.toLowerCase().includes(search)) ||
        (i.customer.compagny.toLowerCase().includes(search)) ||
        (i.sentAT.toLowerCase().includes(search)));

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
                    <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                    <td>{invoice.customer.compagny}</td>
                    <td className="text-center">
                        <a href="#">{invoice.amount.toLocaleString()} €</a>
                    </td>
                    <td>{invoice.sentAT}</td>
                    <td>{invoice.status}</td>
                    <td>
                        <button
                            disabled={invoices.length > 0}
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
                    <th className="text-center">Numéro de facture</th>
                    <th>Client</th>
                    <th>Entreprise</th>
                    <th className="text-center">Montant</th>
                    <th>Envoyée le</th>
                    <th >Status</th>
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

export default InvoicesPagesBis;