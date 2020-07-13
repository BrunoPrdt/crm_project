import React from 'react';
import axios from 'axios';
import {SERVER_URL} from '../services/Config';

/**
 *
 * @returns {Promise<void>}
 * @constructor
 */
const Logout = async () => {
    await axios
        .post(`${SERVER_URL}/api/logout`)
        .then(response => response.data)
    ;
};

export { Logout };