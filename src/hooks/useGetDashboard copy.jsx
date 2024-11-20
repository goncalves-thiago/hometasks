// Hooks
import { useState, useEffect } from "react";

// Services
import apiClient from "../services/apiClient";

//Context
import { useAuthValue } from "../Context/AuthContext";

export const useGetDashboard = (month) => {
    
    const [statusDashboard, setStatusDashboard] = useState("");
    const [familyTasksDashboard, setFamilyTasksDashboard] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState("");
    const {userData} = useAuthValue();

    useEffect(() => {

        const loadData = async () => {

            if(!userData.familyId) return;
            
            // Deal with memory leak
            if(cancelled) return;
            
            setLoading(true);
            
            try {
                
                // Get Status Dashboard
                const resDashboard = await apiClient.get(`/api/families/${userData.familyId}/dashboard/${month}`);

                if(!resDashboard.data.status) {
                    setError("Error loading dashboard data.");
                }

                setStatusDashboard(resDashboard.data.tasks);

                // Get Family Tasks Dashboard
                const resFamilyTasks = await apiClient.get(`/api/tasks/dashboard/${userData.familyId}`);

                if(!resFamilyTasks.data.status) {
                    setError("Error loading family tasks data.")
                }

                setFamilyTasksDashboard(resFamilyTasks.data.tasks);

            } catch (error) {
                setError(error.message);
            }

            setLoading(false);
         };
         
         loadData();

    },[month, cancelled, error]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {statusDashboard, familyTasksDashboard, error, loading};

};