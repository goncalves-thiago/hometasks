import { useState } from "react";
import apiClient from "../services/apiClient";

export const useCreateUser = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
         
    const createUser = async (newUser) => {
      
        setLoading(true);
        
        try {

            const res = await apiClient.post("/api/users", newUser);

            if(!res.data.status) {
                setError("Ocorreu um erro ao tentar criar o usuário.");
                
            } else {
                setError(false);
            }

        } catch (error) {
            if(error.response.data.message.email) setError("Este email já  está cadastrado no sistema!");
            else setError("Ocorreu um erro ao tentar criar o usuário.");
        }

        setLoading(false);
        };

    return {createUser, error, loading};

};