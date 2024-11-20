import { useState } from "react";
import apiClient from "../services/apiClient";

export const useRemoveAvatar = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const removeAvatar = async (id, avatar) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.post(`/api/users/${id}/removeAvatar`, avatar);

            if(!res.data.status) {
                setError("Erro ao deletar o avatar.");
            }

        } catch (error) {
            setError("Erro ao deletar o avatar.");
        }

        setLoading(false);
        };

    return {removeAvatar, error, loading};

};