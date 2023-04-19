import axios from "axios";

//89253798/json/

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;