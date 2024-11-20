import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useGetFamily = (id) => {

    const [family, setFamily] = useState("");
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
                                  
                const res = await apiClient.get(`/api/families/${id}`);

                if(!res.data.status) {
                    setError("Erro ao buscar família.");
                }

                setFamily(res.data.family);

            } catch (error) {
                setError("Erro ao buscar família.");
            }

            setLoading(false);
         };
         
         loadData();

    },[]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {family, error, loading};

};