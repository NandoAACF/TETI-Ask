import { useEffect, useState } from "react";

export const API_URL = "http://localhost:5000/api";

export const useGetDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        fetch(API_URL + "/documents")
            .then((res) => res.json())
            .then((data) => setDocs(data))
            .catch(console.log);
    }, []);
    return docs;
};
