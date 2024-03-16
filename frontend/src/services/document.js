import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetVerifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("")
    useEffect(() => {
        const endpoint = category
            ? `/documents/category/verified/${category}`
            : "/documents/verified"
        api.get(endpoint)
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, [category]);
    const data = !search ? docs : docs.filter(doc => 
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase()) 
    )
    return { data, setCategory, setSearch };
};

export const useGetUnverifiedDocument = () => {
    const [docs, setDocs] = useState([]);
    const [category, setCategory] = useState("");
    const {onRefetch, refetch} = useRefetch();
    useEffect(() => {
        const endpoint = category
            ? `/documents/category/unverified/${category}`
            : "/documents/unverified"
        api.get(endpoint)
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, [onRefetch, category]);
    return { data: docs, refetch, setCategory };
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
