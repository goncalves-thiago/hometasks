// Hooks
import { useState, useCallback } from "react";

//Components
import apiClient from "../services/apiClient";


export const useGetTasks = (familyId) => {

    const [tasks, setTasks] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    
    
        const loadData = useCallback(async () => {
            
            if(!familyId) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/families/${familyId}/tasks`);

                if(!res.data.status) {
                    setError("Error loading tasks.");
                }

                setTasks(res.data.tasks);

            } catch (error) {
                setTasks("");
                setError(error.message);
            }

            setLoading(false);

         },[familyId]);

    return {tasks, error, loading, loadData};

};