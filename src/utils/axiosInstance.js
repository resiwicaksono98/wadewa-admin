/** @format */

import axios from "axios";
const BASE_URL = `http://localhost:5000/api`;

export const httpRequest = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
});
