import { useState } from "react";
import apiClient from "../services/apiClient";

export const useCreateFamily = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
         
    const createFamily = async (newFamily) => {
      
        setLoading(true);
        
        try {

            const res = await apiClient.post("/api/families", newFamily);

            if(!res.data.status) {
                setError("Ocorreu um erro ao tentar criar a família.");
                
            } else {
                setError(false);
            }

        } catch (error) {
            setError("Ocorreu um erro ao tentar criar a família.");
        }

        setLoading(false);
        };

    return {createFamily, error, loading};

};