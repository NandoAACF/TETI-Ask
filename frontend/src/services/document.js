import axios from "axios";
import { useEffect, useState } from "react";

export const API_URL = "http://localhost:5000/api";

export const useGetVerifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + "/documents/verified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, []);
    return docs;
};

export const useGetUnverifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + "/documents/unverified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, []);
    return docs;
};
