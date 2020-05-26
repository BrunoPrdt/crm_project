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
    )
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export function deleteCustomer(id) {
    return axios
        .delete(`${SERVER_URL}/api/customers/${id}`)
}