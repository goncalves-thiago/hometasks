import { useState } from "react";
import apiClient from "../services/apiClient";

export const useUpdateFamily = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState(false);

         
    const updateFamily = async (id, data) => {

        // Deal with memory leak
        if(cancelled) return;
        
        setLoading(true);
        
        try {

            const res = await apiClient.put(`/api/families/${id}`, data);

            if(!res.data.status) {
                setError("Ocorreu um erro atualizando a família.");
            } else {
                setError("");
            }

        } catch (error) {
            setError("Ocorreu um erro atualizando a família.");
        }

        setLoading(false);
        };


    // useEffect(() => {
    //     return () => setCancelled(true);
    // }, []);

    return {updateFamily, error, loading};

};