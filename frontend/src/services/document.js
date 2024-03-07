import { useEffect, useState } from "react";
import api from "./api";

export const useGetVerifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        api
            .get("/documents/verified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, []);
    return docs;
};

export const useGetUnverifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        api
            .get("/documents/unverified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, []);
    return docs;
};