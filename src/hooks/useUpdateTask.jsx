import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useUpdateTask = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState(false);

         
    const updateTask = async (id, newTask) => {

        // Deal with memory leak
        if(cancelled) return;
        
        setLoading(true);
        
        try {

            const res = await apiClient.put(`/api/tasks/${id}`, newTask);

            if(!res.data.status) {
                setError("Error updating task.");
                setLoading(false);
            }

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

        setLoading(false);
        };


    // useEffect(() => {
    //     return () => setCancelled(true);
    // }, []);

    return {updateTask, error, loading};

};