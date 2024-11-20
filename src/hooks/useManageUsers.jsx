// Hooks
import { useState, useCallback } from "react";

// Services
import apiClient from "../services/apiClient";

// Util
import { API_URL } from "../Util/Util";

export const useManageUsers = () => {

    const [users, setUsers] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const loadUsers = useCallback(async (query) => {

        setLoading(true);
        
        try {
            
            const res = await apiClient.get(`${API_URL}/api/users/invite/${query}`);

            if(!res.data.status) {
                setError("Erro ao buscar usuários");
            } else {
                setUsers(res.data.users);
            }

        } catch (error) {
            setError("Erro ao buscar usuários");
        }

        setLoading(false);   
    },[]);

    
    const addUser = useCallback(async (familyId, data) => {

        setLoading(true);

        try {
            
            const res = await apiClient.post(`${API_URL}/api/families/${familyId}/addMember`, data);

            if(!res.data.status) 
                setError("Erro ao adicionar o usuário.");

        } catch (error) {
            setError("Erro ao adicionar o usuário.");
        }

        setLoading(false);

    },[]);


    const removeUser = useCallback(async (familyId, data) => {

        setLoading(true);

        try {
            
            const res = await apiClient.post(`${API_URL}/api/families/${familyId}/removeMember`, data);

            if(!res.data.status) 
                setError("Erro ao remover o usuário.");

        } catch (error) {
            setError("Erro ao remover o usuário.");
        }

        setLoading(false);

    },[]);

    return { loadUsers, addUser, removeUser, users, error, loading }

}