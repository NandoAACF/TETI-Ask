import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetVerifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    useEffect(() => {
        const endpoint = category
            ? `/faqs/category/verified/${category}`
            : "/faqs/verified"
        api.get(endpoint)
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, [category]);
    const data = !search ? faqs : faqs.filter(faq => 
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()) 
    );
    return { data, setCategory, setSearch };
};

export const useGetUnverifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    const [category, setCategory] = useState("");
    const {onRefetch, refetch} = useRefetch();
    useEffect(() => {
        const endpoint = category
            ? `/faqs/category/unverified/${category}`
            : "/faqs/unverified"
        api.get(endpoint)
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, [onRefetch, category]);
    return { data: faqs, refetch, setCategory };
};

export const postFaq = async (faq) => {
    const payload = {
        ...faq,
        status: "unverified",
    };
    return api.post("/faq", payload);
};

export const verifyFAQ = async (id) => {
    return api.put(`/faq/verify/${id}`);
};

export const deleteFAQ = async (id) => {
    return api.delete(`/faq/${id}`);
};
