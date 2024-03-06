import { useEffect, useState } from "react"

export const API_URL = "http://localhost:5000"

export const useGetDocument = () => {
    const [docs, setDocs] = useState([]);
    useEffect(()=>{
        console.log("fetching data");
        fetch(API_URL + "/documents")
        .then(res => {console.log("ok"); console.log(res); return res})
        .then(res => res.json())
        .then(data => {console.log(data); return data})
        .then(data => setDocs(data))
        .then(()=>console.log("OK sip"))
        .catch(err=>console.log("error :", err));
    }, [])
    return docs
}