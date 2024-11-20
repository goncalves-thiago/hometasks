import { useState } from "react";
import apiClient from "../services/apiClient";

export const useDeleteFamily = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const deleteFamily = async (id) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.delete(`/api/families/${id}`);

            if(!res.data.status) {
                setError("Ocorreu um erro ao deletar a família.");
            } else {
                setError("");
            }

        } catch (error) {
            setError("Ocorreu um erro ao deletar a família.");
        }

        setLoading(false);
        };

    return {deleteFamily, error, loading};

};