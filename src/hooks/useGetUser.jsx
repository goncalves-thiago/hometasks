import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useGetUser = (id) => {

    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        
        const loadData = async () => {

            if(!id) return;

            // Deal with memory leak
            if(cancelled) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/users/${id}`);

                if(!res.data.status) {
                    setError("Erro ao carregar usuário.");
                }

                setUser(res.data.user);

            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
         };
         
         loadData();

    },[id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {user, error, loading};

};