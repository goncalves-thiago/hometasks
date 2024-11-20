import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useCreateTask = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

         
    const createTask = async (newTask) => {

        // Deal with memory leak
        if(cancelled) return;
        
        setLoading(true);
        
        try {

            const res = await apiClient.post("/api/tasks", newTask);

            if(!res.data.status) {
                setError("Ocorreu um erro ao tentar criar a tarefa.");
                setLoading(false);
            } else {
                setError(false);
            }

        } catch (error) {
            setError("Ocorreu um erro ao tentar criar a tarefa.");
            setLoading(false);
        }

        setLoading(false);
        };

    return {createTask, error, loading};

};