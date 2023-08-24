import axios from 'axios';

// Create new instance
const baseAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
baseAxios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
baseAxios.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default baseAxios;