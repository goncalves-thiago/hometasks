import { useState } from "react";
import apiClient from "../services/apiClient";

export const useUploadAvatar = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const uploadAvatar = async (id, avatar) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.post(`/api/users/${id}/addAvatar`, avatar);

            if(!res.data.status) {
                setError("Erro no upload do avatar.");
            }

        } catch (error) {
            setError("Erro no upload do avatar.");
        }

        setLoading(false);
        };

    return {uploadAvatar, error, loading};

};