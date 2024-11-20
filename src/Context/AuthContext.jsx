import { useContext, createContext, useState, useEffect, useCallback } from "react";
import apiClient from "../services/apiClient";

const AuthContext = createContext();

export function AuthProvider({children}) {

    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);

    const signIn = () => {
        setAuthenticated(true);
    };

    const signOut = () => {
        setAuthenticated(false);
        setUserData("");
    };

    const refreshUser = useCallback(async () => {

        setLoading(true);

        try {              
            const res = await apiClient.get('/api/user');
            if(!res.data.status) {
                setLoading(false);
                return;
            }
            setUserData(res.data);
            setLoading(false);
            signIn();

        } catch (error) {
            setLoading(false);
        }
    },[authenticated]);
    
    useEffect(() => {        
        refreshUser();
    },[authenticated]);

    return <AuthContext.Provider value={{authenticated, signIn, signOut, userData, loading, refreshUser}}>{children}</AuthContext.Provider>
};

export function useAuthValue() {
    return useContext(AuthContext);
};