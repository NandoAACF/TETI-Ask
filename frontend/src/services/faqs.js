import { useEffect, useState } from "react";

export const API_URL = "http://localhost:5000/api";

export const useGetFaqs = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        fetch(API_URL + "/faqs")
            .then((res) => res.json())
            .then((data) => setFaqs(data))
            .catch(console.log);
    }, []);
    return faqs;
};
