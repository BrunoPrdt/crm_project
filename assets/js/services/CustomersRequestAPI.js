import axios from 'axios';
import {SERVER_URL} from "./Config";

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function findAllCustomers() {
    return (await axios
            .get(`${SERVER_URL}/api/customers`)
            .then(response => response.data['hydra:member'])
    );
}

/**
 *
 * @param {number} id
 * @param {object} customer
 */
export function updateCustomerById(id, customer) {
    axios.put(`${SERVER_URL}/api/customers/${id}`, customer);
}

/**
 *
 * @param {object} customer
 */
export function createCustomer(customer) {
    axios.post(`${SERVER_URL}/api/customers`, customer);
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function deleteCustomer(id) {
    return await axios
        .delete(`${SERVER_URL}/api/customers/${id}`)
}