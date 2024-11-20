import { useState, useEffect} from "react";
import { useAuthValue } from "../Context/AuthContext";
import apiClient from "../services/apiClient";


export const useAuthentication = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const {userData, signIn, signOut} = useAuthValue();
    
    function checkIfIsCancelled() {
        if (cancelled) return;
    };

    const login = async (data) => {

        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            await apiClient.get('/sanctum/csrf-cookie', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
            }).then(async () => {
                await apiClient.post('/api/login', data, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      }
                }).then((response) => {
                    console.log('Logged successfully!');
                    setError(null);
                    setLoading(false);
                    signIn();
                }).catch((error) => {
                    setError(error.response?.data?.message);
                    setLoading(false);
                })
            }).catch((error) => {
                setError(error.response?.data?.message);
                setLoading(false);
            });
            
        } catch (error) {
            setError(error.response?.data?.message);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await apiClient.post(`api/logout/${userData.id}`);
            console.log('Logged out successfully!');
            signOut();
            
        } catch (error) {
            console.log('Logout failed!');
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { login, logout, error, loading };

}

