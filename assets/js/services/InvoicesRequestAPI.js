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
 * @param {number} id
 * @param {object} invoice
 */
export function updateInvoiceById(id, invoice) {
    axios.put(`${SERVER_URL}/api/invoices/${id}`, {...invoice, amount: Number(invoice.amount), customer: `/api/customers/${invoice.customer}`});
}

/**
 *
 * @param {object} invoice
 */
export function createInvoice(invoice) {
    axios.post(`${SERVER_URL}/api/invoices`, {...invoice, customer: `/api/customers/${invoice.customer}`});
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