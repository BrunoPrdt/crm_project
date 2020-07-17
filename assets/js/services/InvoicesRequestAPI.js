import axios from 'axios';
import {SERVER_URL} from "./Config";
import {getCache, setCache} from "./cache";

/**
 *
 * @returns {Promise<unknown>}
 */
export async function findAllInvoices() {
    const cachedInvoices = await getCache("invoices");

    if (cachedInvoices) {
        return cachedInvoices;
    }else {
        return (await axios
                .get(`${SERVER_URL}/api/invoices`)
                .then(response => {
                    const invoices = response.data['hydra:member'];
                    setCache("invoices", invoices);
                    return invoices;
                })
        )
    }
}

/**
 *
 * @param {number} id
 * @param {object} invoice
 */
export function updateInvoiceById(id, invoice) {
    axios.put(`${SERVER_URL}/api/invoices/${id}`, {...invoice, amount: Number(invoice.amount), customer: `/api/customers/${invoice.customer}`}).then( async response => {
        const cachedData = await getCache("invoices");
        if (cachedData){
            const index = cachedData.findIndex(c => c.id === +id);
            const newCachedInvoice = response.data;
            cachedData[index] = newCachedInvoice;
            setCache('invoices', cachedData);
        }
        return response;
    });
}

/**
 *
 * @param {object} invoice
 */
export function createInvoice(invoice) {
    axios.post(`${SERVER_URL}/api/invoices`, {...invoice, customer: `/api/customers/${invoice.customer}`}).then( async response => {
        const cachedData = await getCache("invoices");
        if (cachedData){
            setCache('invoices', [...cachedData, response.data]);
        }
        return response;
    });
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function deleteInvoice(id) {
    return await axios
        .delete(`${SERVER_URL}/api/invoices/${id}`).then( async response => {
            const cachedData = await getCache("invoices");
            if (cachedData){
                setCache('invoices', cachedData.filter(data => data.id !== id));
            }
            return response;
        })
}