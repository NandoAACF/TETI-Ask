import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetVerifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        api.get("/documents/verified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, []);
    return { data: docs };
};

export const useGetUnverifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    const { onRefetch, refetch } = useRefetch();
    useEffect(() => {
        api.get("/documents/unverified")
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, [onRefetch]);
    return { data: docs, refetch };
};

export const postDocument = async (document) => {
    const payload = {
        ...document,
        status: "unverified",
    };
    return api.post("/document", payload);
};

export const verifyDocument = async (id) => {
    return api.put(`/document/verify/${id}`);
};

export const deleteDocument = async (id) => {
    return api.delete(`/document/${id}`);
};
