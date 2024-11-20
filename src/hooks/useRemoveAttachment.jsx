import { useState } from "react";
import apiClient from "../services/apiClient";

export const useRemoveAttachment = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const removeAttachment = async (id) => {
       
        setError("");
        setLoading(true);
        
        try {

            const res = await apiClient.post(`/api/tasks/${id}/removeAttachment`);

            if(!res.data.status) {
                setError("Erro ao deletar a foto.");
            }

        } catch (error) {
            setError("Erro ao deletar a foto.");
        }

        setLoading(false);
        };

    return {removeAttachment, error, loading};

};