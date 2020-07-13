import jwtDecode from 'jwt-decode';

/**
 *
 * @returns {boolean}
 */
export default function isAuthenticated() {
    const token = document.getElementById('root').dataset.token;
    if (token){
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()){
            return true;
        } return false
    } return false
}