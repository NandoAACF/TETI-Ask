import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetFaqs = (status = "verified") => {
    const [faqs, setFaqs] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const {onRefetch, refetch} = useRefetch();

    useEffect(() => {
        const endpoint = category
            ? `/faqs/category/${status}/${category}`
            : `/faqs/${status}`
        api.get(endpoint)
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, [category, onRefetch]);

    const data = !search ? faqs : faqs.filter(faq => 
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()) 
    );

    return { data, refetch, setCategory, setSearch };
};

export const useGetUnverifiedFaqs = () => {
    return useGetFaqs("unverified");
};

export const useGetVerifiedFaqs = () => {
    return useGetFaqs("verified");
}

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
