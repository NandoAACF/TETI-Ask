import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetDocument = (status = "verified") => {
    const [docs, setDocs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const {onRefetch, refetch} = useRefetch();

    useEffect(() => {
        const endpoint = category
            ? `/documents/category/${status}/${category}`
            : `/documents/${status}`
        api.get(endpoint)
            .then((res) => setDocs(res.data))
            .catch(console.log);
    }, [onRefetch, category]);

    const data = !search ? docs : docs.filter(doc => 
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase()) 
    );

    return { data, refetch, setCategory, setSearch };
};

export const useGetUnverifiedDocument = () => {
    return useGetDocument("unverified");
}

export const useGetVerifiedDocument = () => {
    return useGetDocument("verified");
}

export const postDocument = async (document) => {
    const payload = {
        ...document,
        status: "unverified",
    };
    return api.post("/document", payload);
};

export const updateDocument = async (id, document) => {
    const payload = {
        ...document,
        status: "verified",
    };
    return api.put(`/document/${id}`, payload);
};

export const verifyDocument = async (id) => {
    return api.put(`/document/verify/${id}`);
};

export const deleteDocument = async (id) => {
    return api.delete(`/document/${id}`);
};
