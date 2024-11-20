import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useUploadAttachment = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const uploadAttachment = async (id, attachment) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.post(`/api/tasks/${id}/addAttachment`, attachment);

            if(!res.data.status) {
                setError("Error uploading attachment.");
            }

        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
        };

    return {uploadAttachment, error, loading};

};