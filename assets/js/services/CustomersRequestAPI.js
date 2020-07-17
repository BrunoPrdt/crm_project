import axios from 'axios';
import {SERVER_URL} from "./Config";
import {getCache, setCache} from "./cache";

/**
 *
 * @returns {Promise<unknown>}
 */
export async function findAllCustomers() {
    const cachedCustomers = await getCache("customers");

    if (cachedCustomers) {
        return cachedCustomers;
    }else {
        return (await axios
                .get(`${SERVER_URL}/api/customers`)
                .then(response => {
                    const customers = response.data['hydra:member'];
                    setCache("customers", customers);
                    return customers;
                })
        );
    }
}

/**
 *
 * @param {number} id
 * @param {object} customer
 */
export function updateCustomerById(id, customer) {
    axios.put(`${SERVER_URL}/api/customers/${id}`, customer).then( async response => {
        const cachedData = await getCache("customers");
        if (cachedData){
            const index = cachedData.findIndex(c => c.id === +id);
            const newCachedCustomer = response.data;
            cachedData[index] = newCachedCustomer;
            setCache('customers', cachedData);
        }
        return response;
    });
}

/**
 *
 * @param {object} customer
 */
export function createCustomer(customer) {
    axios.post(`${SERVER_URL}/api/customers`, customer).then( async response => {
        const cachedData = await getCache("customers");
        if (cachedData){
            setCache('customers', [...cachedData, response.data]);
        }
        return response;
    });
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function deleteCustomer(id) {
    return await axios
        .delete(`${SERVER_URL}/api/customers/${id}`).then( async response => {
            const cachedData = await getCache("customers");
            if (cachedData){
                setCache('customers', cachedData.filter(data => data.id !== id));
            }
            return response;
        })
}