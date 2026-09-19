import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function register({username, email, password}) {

    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`,{
            username, email, password
        }, {
            withCredentials:true
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function login({email, password}) {
    try {
        
        const response = await axios.post(`${BASE_URL}/api/auth/login`,{
            email, password
        },{
            withCredentials:true
        })

        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function logout() {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/logout`, {
            withCredentials:true
        })

        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function getMe() {

    try {
        
        const response = await axios.get(`${BASE_URL}/api/auth/get-me`, {
            withCredentials:true
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}