import { useState } from "react";
import apiClient from "../services/apiClient";

export const useUpdateUser = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const updateUser = async (id, newUser) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.put(`/api/users/${id}`, newUser);

            if(!res.data.status) {
                setError("Erro ao atualizar o usuário.");
            }

        } catch (error) {
            setError("Erro ao atualizar o usuário.");
        }

        setLoading(false);
        };

    return {updateUser, error, loading};

};