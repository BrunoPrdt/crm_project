import React, {Component} from 'react';
import {findAllCustomers, deleteCustomer} from "../services/CustomersRequestAPI";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/Loaders/TableLoader";

/**
 *
 */
class CustomersPagesBis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            currentPage: 1,
            search: "",
            loading: true,
        }
    }

    componentDidMount() {
        try {
            findAllCustomers()
                .then(newData => this.setState({customers: newData}));
            setTimeout(()=>{
                this.setState({loading: false});
            }, 1000);
        }catch(error){
            console.log("Oups il semble qu'il y ait une erreur: ", error.response);
            toast.error("Une erreur est survenue lors du chargement des clients");
        }
    }

    render() {
        /**
         * Gestion du changement de page
         * @param {number} page
         */
        const handlePageChange = (page) => this.setState({currentPage: page});

        /**
         * Gestion de la recherche
         * @param {event} e
         */
        const handleSearch = (e) => {
            this.setState({search: e.currentTarget.value});
            this.setState({currentPage: 1});
        };

        /**
         *
         * @param id {id}
         */
        const handleDelete = async (id) => {
            const originalCustomers = [...this.state.customers];
            this.setState({customers: this.state.customers.filter(customer => customer.id !== id)});
            try {
                await deleteCustomer(id)
                toast.success('Client supprimé !')
            }catch (error) {
                this.setState({customers: originalCustomers});
                toast.error("Une erreur est survenue");
            }
        };

        // filtrage des customers en fonction de la recherche
        const filteredCustomers = this.state.customers.filter(c => (c.firstName.toLowerCase().includes(this.state.search.toLowerCase())) ||
            (c.lastName.toLowerCase().includes(this.state.search.toLowerCase())) ||
            (c.email.toLowerCase().includes(this.state.search.toLowerCase())) ||
            (c.compagny.toLowerCase().includes(this.state.search.toLowerCase())));

        const itemsPerPage = 10;
        const paginationTable = Pagination.getData(filteredCustomers, this.state.currentPage, itemsPerPage);

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
                            <Link to={`/clients/${customer.id}`}>{customer.firstName} {customer.lastName}</Link>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.compagny}</td>
                        <td className="text-center">
                            <span className="badge badge-light" style={{"width": "80px"}}>{customer.invoices.length}</span>
                        </td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                            <Link to={`/clients/${customer.id}`} className="btn btn-sm btn-secondary mr-1">Editer</Link>
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

        return (
            <>
                <div className="d-flex mb-3 justify-content-between align-items-center">
                    <h1>Liste des clients</h1>
                    <Link className="btn btn-primary" to="/clients/nouveau">Nouveau client</Link>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher ..."
                        onChange={handleSearch}
                        value={this.state.search}
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
                        {!this.state.loading && <tbody>
                            {renderTable()}
                        </tbody>}
                    </table>

                {this.state.loading &&
                <div>
                    <p className="my-5">Récupération des données</p>
                    <TableLoader />
                </div>
                }

                {filteredCustomers.length > itemsPerPage && (
                    <Pagination
                        currentPage={this.state.currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredCustomers.length}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    }
}

export default CustomersPagesBis;