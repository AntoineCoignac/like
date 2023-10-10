import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://likecreators.azurewebsites.net/api/", withCredentials: true
});

export default newRequest;