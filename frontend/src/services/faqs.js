import { useEffect, useState } from "react";
import api, { useRefetch } from "./api";

export const useGetVerifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        api.get("/faqs/verified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, []);
    return { data: faqs };
};

export const useGetUnverifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    const { onRefetch, refetch } = useRefetch();
    useEffect(() => {
        api.get("/faqs/unverified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, [onRefetch]);
    return { data: faqs, refetch };
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
