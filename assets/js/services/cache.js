const CACHE = {};

/**
 *
 * @param {string} key
 * @param {unknown} data
 */
export function setCache(key, data) {
    CACHE[key] = {
        data: data,
        cachedAt: new Date().getTime(),
    };
}

/**
 *
 *
 * @param {string} key
 * @returns {Promise<unknown>}
 */
export function getCache(key) {
    return new Promise((resolve)=>{
        resolve(CACHE[key] && (CACHE[key].cachedAt + (15*60*1000) ) > new Date().getTime() ? CACHE[key].data : null)
    });
}

export function invalidateCache(key) {
    delete CACHE[key];
}