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
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const findOneCustomerById = async (id) => {
    try {
        const data = await axios
            .get(`${SERVER_URL}/api/customers/${id}`)
            .then(response => response.data);
        console.log("data 1", data);
    }catch (error) {
        console.log(error.response);
    }
};

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function deleteCustomer(id) {
    return await axios
        .delete(`${SERVER_URL}/api/customers/${id}`)
}