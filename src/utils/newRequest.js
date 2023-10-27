import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://test-like.azurewebsites.net/api", withCredentials: true
});

export default newRequest;