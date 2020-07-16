import axios from 'axios';
import {SERVER_URL} from "./Config";

/**
 *
 * @param {object} user
 */
export function createUser(user) {
    axios.post(`${SERVER_URL}/api/users`, user);
}