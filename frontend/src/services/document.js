import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetVerifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(() => {
        const endpoint = category
            ? `/documents/category/verified/${category}`
            : "/documents/verified"
        api.get(endpoint)
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, [category]);
    return { data: docs, setCategory };
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
