import React, {useEffect, useState} from 'react';
import {findAllCustomers, deleteCustomer} from "../services/CustomersRequestAPI";
import Pagination from "../components/Pagination";

/**
 *
 * @returns {*}
 * @constructor
 */
const CustomersPage = () => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    /**
     * Permet d'aller récupérer les customers
     * @returns {Promise<void>}
     */
    const fetchCustomers = async () => {
        try {
            const data = await findAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.log("Oups il semble qu'il y ait une erreur: ", error.response);
        }
    };
    /**
     * On va chercher les customers au chargement du composant
     */
    useEffect(  () => fetchCustomers(), []);

    /**
     * Gestion de la suppression d'un customer
     * @param id
     */
    async function handleDelete(id) {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));
        try {
            await deleteCustomer(id)
        } catch (error) {
            setCustomers(originalCustomers);
        }
    }

    /**
     * Gestion du rendu du tableau
     * @returns {*}
     */
    function renderTable() {
        return paginationTable.map((customer, index) => {
            return(
                <tr key={index}>
                    <td>{customer.id}</td>
                    <td>
                        <a href="#">{customer.firstName} {customer.lastName}</a>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.compagny}</td>
                    <td className="text-center">
                        <span className="badge badge-light">{customer.invoices.length}</span>
                    </td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                    <td>
                        <button
                            disabled={customer.invoices.length > 0}
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(customer.id)}
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            )
        })
    }

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
    // filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(c => (c.firstName.toLowerCase().includes(search)) ||
        (c.lastName.toLowerCase().includes(search)) ||
        (c.email.toLowerCase().includes(search)) ||
        (c.compagny.toLowerCase().includes(search)));

    const itemsPerPage = 10;
    const paginationTable = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return (
        <div>
            <h1>Liste des clients</h1>

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
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                {customers.length === 0 && (
                    <tr>
                        <td>Récupération des données ...</td>
                    </tr>
                )}
                {renderTable()}
                </tbody>
            </table>
            {filteredCustomers.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCustomers.length}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default CustomersPage;