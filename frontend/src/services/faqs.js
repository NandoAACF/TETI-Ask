import axios from "axios";
import { useEffect, useState } from "react";

export const API_URL = "http://localhost:5000/api";

export const useGetVerifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + "/faqs/verified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, []);
    return faqs;
};

export const useGetUnverifiedFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        axios
            .get(API_URL + "/faqs/unverified")
            .then((res) => setFaqs(res.data))
            .catch(console.log);
    }, []);
    return faqs;
};
