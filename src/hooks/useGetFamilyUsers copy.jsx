import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useGetFamilyUsers = (id) => {

    const [users, setUsers] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        
        const loadData = async () => {

            // Deal with memory leak
            if(cancelled) return;
            
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
         };
         
         loadData();

    },[id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {users, error, loading};

};