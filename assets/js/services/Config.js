import jwtDecode from 'jwt-decode';

export const SERVER_URL = "https://127.0.0.1:8000";

/**
 *
 * @returns {any | undefined}
 * @constructor
 */
export const SETUP_APP = () => {
    const token = document.getElementById('root').dataset.token;
    if (token) {
        return jwtDecode(token);
    }
};