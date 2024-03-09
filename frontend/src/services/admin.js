import React, { createContext, useState, useContext } from 'react';
import api from './api';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async (credentials) => {
        const res = await api.post("/login", credentials);
        setLoggedIn(true);
        return res
    };
    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <AdminContext.Provider value={{ loggedIn, login, logout }}>
        {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
