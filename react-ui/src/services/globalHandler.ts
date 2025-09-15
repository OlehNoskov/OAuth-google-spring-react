import axios from "axios";

// Globally unauthenticated handler for all axios requests
 axios.interceptors.response.use(
    response => response,
     async error => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);