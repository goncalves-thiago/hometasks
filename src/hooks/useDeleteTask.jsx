import { useState } from "react";
import apiClient from "../services/apiClient";

export const useDeleteTask = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
         
    const deleteTask = async (id) => {
       
        setLoading(true);
        
        try {

            const res = await apiClient.delete(`/api/tasks/${id}`);

            if(!res.data.status) {
                setError("Ocorreu um erro ao deletar a tarefa.");
            } else {
                setError("");
            }

        } catch (error) {
            setError("Ocorreu um erro ao deletar a tarefa.");
        }

        setLoading(false);
        };

    return {deleteTask, error, loading};

};