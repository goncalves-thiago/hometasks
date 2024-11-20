// Hooks
import { useState, useCallback } from "react";

//Components
import apiClient from "../services/apiClient";


export const useGetReport = (familyId, month) => {

    const [reports, setReports] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    
    
        const loadData = useCallback(async () => {
            
            if(!familyId || !month) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/families/${familyId}/report/${month}`);

                if(!res.data.status) {
                    setError("Erro ao carregar o relatório.");
                }

                setReports(res.data.dashboard);

            } catch (error) {
                setError("Erro ao carregar o relatório.");
            }

            setLoading(false);

         },[familyId, month]);

    return {reports, error, loading, loadData};

};