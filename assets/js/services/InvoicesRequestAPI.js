import axios from 'axios';
import {SERVER_URL} from "./Config";

/**
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function findAllInvoices() {
    return (await axios
            .get(`${SERVER_URL}/api/invoices`)
            .then(response => response.data['hydra:member'])
    )
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function deleteInvoice(id) {
    return await axios
        .delete(`${SERVER_URL}/api/invoices/${id}`)
}