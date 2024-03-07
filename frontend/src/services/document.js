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

export const postDocument = async (document) => {
    const payload = {
        ...document,
        status: "unverified",
        category: "Akademik"
    }
    return api.post("/document", payload)
}

export const verifyDocument = async (id) => {
    return api.put(`/document/verify/${id}`)
}