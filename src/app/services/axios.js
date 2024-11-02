// lib/axios.js (or .ts if using TypeScript)
import axiosLib from 'axios';
import Cookies from 'js-cookie';

const axios = axiosLib.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

// Ensure cookies are sent with requests by default
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
    // Only fetch CSRF token if the request is not GET
    if ((config.method || '').toLowerCase() !== 'get') {
        await axios.get('/sanctum/csrf-cookie');  // Match the Vue path for CSRF token retrieval
        config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');  // Set CSRF token header
    }
    return config;
});

export default axios;