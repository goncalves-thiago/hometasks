import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

export const useGetAllowance = ({userId, month}) => {

    const [allowance, setAllowance] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState("");

    useEffect(() => {
        
        const loadData = async () => {

            if(!userId || !month) return;
            
            // Deal with memory leak
            if(cancelled) return;
            
            setLoading(true);
            
            try {
                                  
                const res = await apiClient.get(`/api/users/${userId}/allowanceToReceive/${month}`);

                if(!res.data.status) {
                    setError("Erro ao buscar valor de mesada a receber.");
                }

                setAllowance(res.data.allowance);

            } catch (error) {
                setError("Erro ao buscar valor de mesada a receber.");
            }

            setLoading(false);
         };
         
         loadData();

    },[]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {allowance, error, loading};

};