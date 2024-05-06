import axios from "axios";
import { useState } from "react";

export const API_URL = "https://teti-ask-be.vercel.app/api";

const api = axios.create({
    baseURL: API_URL,
});

export const useRefetch = () => {
    const [onRefetch, setRefetch] = useState(false);
    const refetch = () => setRefetch(!onRefetch);
    return { onRefetch, refetch };
};

export default api;
