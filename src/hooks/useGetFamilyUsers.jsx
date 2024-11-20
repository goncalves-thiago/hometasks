import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export const useGetFamilyUsers = (id) => {

    const [users, setUsers] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
        
        const loadData = useCallback(async () => {
           
            if(!id) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/families/${id}/users`);

                if(!res.data.status) {
                    setError("Error loading family users.");
                }

                setUsers(res.data.users);

            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
         },[id]);

    return {loadData, users, error, loading};

};