import React, { createContext, useState, useContext, useEffect } from "react";
import api from "./api";
import { useRouter } from "next/router";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async (credentials) => {
        const res = await api.post("/login", credentials);
        setLoggedIn(true);
        return res;
    };
    const logout = () => {
        setLoggedIn(false);
    };

    return <AdminContext.Provider value={{ loggedIn, login, logout }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);

export const useProtectedRoute = () => {
    const admin = useAdmin();
    const router = useRouter();
    useEffect(() => {
        if (!admin.loggedIn) router.push("/");
    }, [admin.loggedIn]);
};

export const register = async ({ name, email, password }) => {
    return api.post("/register", { name, email, password });
};
