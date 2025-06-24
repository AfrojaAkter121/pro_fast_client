import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;