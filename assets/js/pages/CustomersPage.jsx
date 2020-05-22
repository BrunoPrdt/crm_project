import React, {useEffect, useState} from 'react';
import axios from 'axios';
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

    useEffect( () => {
       axios.get('http://127.0.0.1:8000/api/customers')
            .then(response => response.data['hydra:member'])
           .then(newData => setCustomers(newData))
           .catch(error => console.log("Oups il semble qu'il y ait une erreur: ", error.response))
       ;
    }, []);

    /**
     *
     * @param id
     */
    function handleDelete(id) {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));

        axios
            .delete(`http://127.0.0.1:8000/api/customers/${id}`)
            .then(() => console.log("suppression ok")
        )
            .catch(error => {
                setCustomers(originalCustomers);
                console.log('echec de la suppression :', error.response);
            });
    }

    /**
     *
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
     *
     * @param page
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearch(e.currentTarget.value);
        setCurrentPage(1);
    };
    //to filter !
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