import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useGetTask = (id) => {

    const [task, setTask] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        
        const loadData = async () => {

            // Deal with memory leak
            if(cancelled) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/tasks/${id}`);

                if(!res.data.status) {
                    setError("Error loading tasks.");
                }

                setTask(res.data.task);

            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
         };
         
         loadData();

    },[]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {task, error, loading};

};