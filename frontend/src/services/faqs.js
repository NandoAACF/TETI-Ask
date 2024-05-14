import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetFaqs = (status = "verified") => {
    const [faqs, setFaqs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const {onRefetch, refetch} = useRefetch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const endpoint = category
            ? `/faqs/category/${status}/${category}`
            : `/faqs/${status}`
        api.get(endpoint)
            .then((res) => setFaqs(res.data))
            .catch(console.log)
            .finally(() => setLoading(false));
    }, [category, onRefetch]);

    const data = !search ? faqs : faqs.filter(faq => 
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()) 
    );

    return { data, refetch, setCategory, setSearch, loading };
};

export const useGetUnverifiedFaqs = () => {
    return useGetFaqs("unverified");
};

export const useGetVerifiedFaqs = () => {
    return useGetFaqs("verified");
}

export const useGetFaqCategory = (status) => {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        api.get(`/faqs/categories/${status}`)
            .then((res) => setCategory(res.data))
            .catch(console.log);
    })
    return { category }
}

export const postFaq = async (faq) => {
    const payload = {
        ...faq,
        status: "unverified",
    };
    return api.post("/faq", payload);
};

export const updateFaq = async (id, faq) => {
    const payload = {
        ...faq,
        status: "verified",
    };
    return api.put(`/faq/${id}`, payload);
};

export const verifyFAQ = async (id) => {
    return api.put(`/faq/verify/${id}`);
};

export const deleteFAQ = async (id) => {
    return api.delete(`/faq/${id}`);
};
