// lib/axios.js (or .ts if using TypeScript)
import axiosLib from 'axios';
import Cookies from 'js-cookie';

const axios = axiosLib.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
    withCredentials: true, // allow sending cookies
    withXSRFToken: true,
});

axios.interceptors.request.use(async (config) => {
    // Safely access method with a default fallback
    if ((config.method || '').toLowerCase() !== 'get' && !Cookies.get('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie');
        //config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    return config;
});

export default axios;