import axios from "axios";
import { API_URL } from "../Util/Util";

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    withXSRFToken: true
});

export default apiClient;