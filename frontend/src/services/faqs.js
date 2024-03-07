import { useEffect, useState } from "react";
import api from "./api";

export const useGetVerifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        api
            .get("/faqs/verified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, []);
    return faqs;
};

export const useGetUnverifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        api
            .get("/faqs/unverified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, []);
    return faqs;
};

export const postFaq = async (faq) => {
    const payload = {
        ...faq,
        status: "unverified",
        category: "Akademik"
    }
    return api.post("/faq", payload)
}

export const verifyFAQ = async (id) => {
    return api.put(`/faq/verify/${id}`)
}