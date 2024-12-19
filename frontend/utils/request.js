import axios from "axios";
import { request } from "express";

const request = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users/',

});
export default request;