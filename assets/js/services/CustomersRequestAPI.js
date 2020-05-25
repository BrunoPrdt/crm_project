import axios from 'axios';

export async function findAllCustomers() {
    return (await axios
        .get('http://127.0.0.1:8000/api/customers')
        .then(response => response.data['hydra:member'])
        .then(newData => setCustomers(newData))
        .catch(error => console.log("Oups il semble qu'il y ait une erreur: ", error.response))
    )
}

export function deleteCustomer(id) {
    return axios
        .delete(`http://127.0.0.1:8000/api/customers/${id}`)
}